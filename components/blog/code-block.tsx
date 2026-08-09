'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineCount = code.split('\n').length;

  return (
    <div className='relative my-10 group'>
      <div className='overflow-hidden bg-[#0d1117] border border-border/50'>
        {/* Header */}
        <div className='flex items-center justify-between px-5 py-3 bg-[#161b22] border-b border-border/50'>
          <div className='flex items-center gap-3'>
            <Terminal className='h-4 w-4 text-cyan/70' />
            <span className='text-xs font-mono text-foreground/60 uppercase tracking-wider'>
              {language}
            </span>
            <span className='text-xs font-mono text-foreground/30'>
              {lineCount} {lineCount === 1 ? 'line' : 'lines'}
            </span>
          </div>
          <button
            onClick={copyToClipboard}
            className='flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-foreground/50 hover:text-cyan border border-transparent hover:border-cyan/30 transition-all cursor-pointer'
            aria-label='Copy code'>
            {copied ? (
              <>
                <Check className='h-3.5 w-3.5 text-cyan' />
                <span className='text-cyan'>Copied</span>
              </>
            ) : (
              <>
                <Copy className='h-3.5 w-3.5' />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Code with custom styling */}
        <div className='relative'>
          <SyntaxHighlighter
            language={language}
            style={oneDark}
            showLineNumbers
            lineNumberStyle={{
              minWidth: '3em',
              paddingRight: '1.5em',
              color: 'rgba(139, 148, 158, 0.4)',
              fontSize: '0.75rem',
              userSelect: 'none',
            }}
            customStyle={{
              margin: 0,
              padding: '1.25rem 0',
              background: 'transparent',
              fontSize: '0.875rem',
              lineHeight: '1.7',
            }}
            codeTagProps={{
              style: {
                fontFamily: "var(--font-mono), 'Geist Mono', monospace",
              },
            }}>
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
