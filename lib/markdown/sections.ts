import GithubSlugger from 'github-slugger';

export interface ArticleSubheading {
  id: string;
  title: string;
}

export interface ArticleSection {
  id: string;
  title: string;
  body: string;
  summary?: string;
  topics: string[];
  subheadings: ArticleSubheading[];
}

export interface ParsedArticle {
  intro: string;
  sections: ArticleSection[];
  allTopics: string[];
}

const FENCE = /^```/;
const H2 = /^##\s+(.+?)\s*$/;
const H3 = /^###\s+(.+?)\s*$/;
const SUMMARY_MARKER = /^>\s*\[!summary\]\s*$/i;
const BLOCKQUOTE_LINE = /^>\s?(.*)$/;
const TOPICS_COMMENT = /^<!--\s*topics:\s*(.+?)\s*-->$/;

interface Block {
  title: string;
  lines: string[];
}

function splitH2(body: string): { intro: string; blocks: Block[] } {
  const lines = body.split('\n');
  const blocks: Block[] = [];
  const introLines: string[] = [];
  let inFence = false;
  let current: Block | null = null;

  for (const line of lines) {
    if (FENCE.test(line)) inFence = !inFence;
    if (!inFence) {
      const match = line.match(H2);
      if (match) {
        if (current) blocks.push(current);
        current = { title: match[1], lines: [] };
        continue;
      }
    }
    if (current) current.lines.push(line);
    else introLines.push(line);
  }
  if (current) blocks.push(current);
  return { intro: introLines.join('\n').trim(), blocks };
}

function extractSummary(sectionBody: string): {
  body: string;
  summary?: string;
} {
  const lines = sectionBody.split('\n');
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (FENCE.test(line)) inFence = !inFence;
    if (inFence) continue;
    if (!SUMMARY_MARKER.test(line)) continue;

    const summaryLines: string[] = [];
    let j = i + 1;
    while (j < lines.length) {
      const m = lines[j].match(BLOCKQUOTE_LINE);
      if (!m) break;
      summaryLines.push(m[1]);
      j++;
    }
    const before = lines.slice(0, i);
    const after = lines.slice(j);
    while (before.length && before[before.length - 1].trim() === '')
      before.pop();
    while (after.length && after[0].trim() === '') after.shift();
    const cleanedBody = [
      ...before,
      ...(before.length && after.length ? [''] : []),
      ...after,
    ].join('\n');
    const summary = summaryLines.join('\n').trim();
    return { body: cleanedBody.trim(), summary: summary || undefined };
  }
  return { body: sectionBody.trim() };
}

function extractTopics(sectionBody: string): {
  body: string;
  topics: string[];
} {
  const lines = sectionBody.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed === '') continue;
    const match = trimmed.match(TOPICS_COMMENT);
    if (!match) break;
    const topics = match[1]
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);
    const remaining = [...lines.slice(0, i), ...lines.slice(i + 1)];
    return { body: remaining.join('\n').trim(), topics };
  }
  return { body: sectionBody, topics: [] };
}

function collectSubheadings(sectionBody: string): ArticleSubheading[] {
  // Fresh slugger per section: matches rehype-slug, which runs on each
  // section body in isolation (one ReactMarkdown call per section).
  const slugger = new GithubSlugger();
  const lines = sectionBody.split('\n');
  let inFence = false;
  const out: ArticleSubheading[] = [];
  for (const line of lines) {
    if (FENCE.test(line)) inFence = !inFence;
    if (inFence) continue;
    const m = line.match(H3);
    if (m) out.push({ id: slugger.slug(m[1]), title: m[1] });
  }
  return out;
}

export function parseArticle(body: string): ParsedArticle {
  const { intro, blocks } = splitH2(body);
  const h2Slugger = new GithubSlugger();
  const topicSet = new Set<string>();
  const sections: ArticleSection[] = blocks.map(block => {
    const id = h2Slugger.slug(block.title);
    const rawBody = block.lines.join('\n').trim();
    const { body: topicCleanBody, topics } = extractTopics(rawBody);
    const { body: cleanBody, summary } = extractSummary(topicCleanBody);
    const subheadings = collectSubheadings(cleanBody);
    for (const t of topics) topicSet.add(t);
    return {
      id,
      title: block.title,
      body: cleanBody,
      summary,
      topics,
      subheadings,
    };
  });
  return { intro, sections, allTopics: [...topicSet] };
}
