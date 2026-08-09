// Build-time content pipeline.
// Copies co-located images to public/content/<type>/<slug>/, mirrors raw .md
// for LLM crawlers at /<type>/<slug>.md, and emits /llms.txt.
// Idempotent: clears its own outputs each run. Touches only public/content/,
// public/projects/*.md, and public/llms.txt.

import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const TYPES = ['projects'];

async function rmrf(p) {
  await fs.rm(p, { recursive: true, force: true });
}
async function ensure(p) {
  await fs.mkdir(p, { recursive: true });
}

async function clearMdFiles(dir) {
  await ensure(dir);
  for (const f of await fs.readdir(dir)) {
    if (f.endsWith('.md')) await fs.unlink(path.join(dir, f));
  }
}

function rewriteImageLinks(md, absBase) {
  return md.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/|\/|data:)(?:\.\/)?([^)]+)\)/g,
    (_, alt, file) => `![${alt}](${absBase}/${file})`,
  );
}

async function processType(type) {
  const srcDir = path.join(ROOT, 'content', type);
  const pubAssets = path.join(ROOT, 'public', 'content', type);
  const pubRaw = path.join(ROOT, 'public', type);

  await rmrf(pubAssets);
  await ensure(pubAssets);
  await clearMdFiles(pubRaw);

  const slugs = (await fs.readdir(srcDir, { withFileTypes: true }))
    .filter(d => d.isDirectory())
    .map(d => d.name);

  const index = [];
  for (const slug of slugs) {
    const slugSrc = path.join(srcDir, slug);
    const slugDst = path.join(pubAssets, slug);
    await ensure(slugDst);

    for (const f of await fs.readdir(slugSrc)) {
      if (f === 'index.md') continue;
      await fs.copyFile(path.join(slugSrc, f), path.join(slugDst, f));
    }

    const raw = await fs.readFile(path.join(slugSrc, 'index.md'), 'utf-8');
    const absBase = `/content/${type}/${slug}`;
    const rewritten = rewriteImageLinks(raw, absBase);
    await fs.writeFile(path.join(slugDst, 'index.md'), rewritten);
    await fs.writeFile(path.join(pubRaw, `${slug}.md`), rewritten);

    const { data } = matter(raw);
    index.push({
      type,
      slug,
      title: data.title ?? slug,
      description: data.excerpt ?? data.description ?? '',
      url: `/${type}/${slug}.md`,
    });
  }
  return index;
}

async function writeLlmsTxt(entries) {
  const lines = [
    '# Fenil Shah',
    '',
    '> Senior Software Engineer based in Houston, TX.',
    '> Builds business-critical, full-stack systems across C#/.NET, TypeScript, and Python.',
    '> Currently working at Resource Data as a Senior Software Engineer.',
    '',
    "This site is Fenil's personal portfolio. It contains case-study project write-ups.",
    'Every project page is also available as plain Markdown at the same path',
    'with a `.md` extension (e.g. `/projects/<slug>.md`).',
    '',
    '## Contact',
    '',
    '- Email: fdshah10@gmail.com',
    '- LinkedIn: https://www.linkedin.com/in/fenilkumar',
    '- GitHub: https://github.com/fshah2',
    '',
    '## Pages',
    '',
    '- [Home](/): Portfolio landing page with hero, featured projects, and about',
    '- [Projects](/projects): Case studies of selected software projects',
    '',
  ];

  const sectionLabels = {
    projects: 'Projects',
  };
  for (const t of TYPES) {
    const section = entries.filter(x => x.type === t);
    if (!section.length) continue;
    lines.push(`## ${sectionLabels[t]}`, '');
    for (const e of section) {
      lines.push(`- [${e.title}](${e.url}): ${e.description}`);
    }
    lines.push('');
  }

  await fs.writeFile(path.join(ROOT, 'public', 'llms.txt'), lines.join('\n'));
}

const all = [];
for (const type of TYPES) all.push(...(await processType(type)));
await writeLlmsTxt(all);
console.log(`Built content: ${all.length} entries`);
