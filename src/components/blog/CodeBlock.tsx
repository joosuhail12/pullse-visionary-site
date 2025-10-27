'use client';

import { useState, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';
import { codeToHtml } from 'shiki';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  highlightLines?: number[];
}

export default function CodeBlock({
  code,
  language = 'typescript',
  filename,
  highlightLines = [],
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedHtml, setHighlightedHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Highlight code on mount
  useEffect(() => {
    const highlight = async () => {
      try {
        const html = await codeToHtml(code, {
          lang: language,
          theme: 'github-dark',
          transformers: [
            {
              line(node, line) {
                if (highlightLines.includes(line)) {
                  this.addClassToHast(node, 'highlighted-line');
                }
              },
            },
          ],
        });
        setHighlightedHtml(html);
      } catch (error) {
        console.error('Failed to highlight code:', error);
        // Fallback to plain code
        setHighlightedHtml(`<pre><code>${code}</code></pre>`);
      } finally {
        setIsLoading(false);
      }
    };

    void highlight();
  }, [code, language, highlightLines]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="group relative my-8 overflow-hidden rounded-xl border border-white/5 bg-slate-900/95 shadow-2xl backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 bg-slate-800/50 px-4 py-2">
        <div className="flex items-center gap-2">
          {filename && (
            <span className="text-xs font-medium text-slate-300">{filename}</span>
          )}
          {!filename && (
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {language}
            </span>
          )}
        </div>

        {/* Copy Button */}
        <button
          type="button"
          onClick={copyToClipboard}
          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
            copied
              ? 'bg-green-500/10 text-green-400'
              : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white'
          }`}
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
          </div>
        ) : (
          <div
            className="shiki-wrapper"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        )}
      </div>

      <style jsx>{`
        :global(.shiki-wrapper pre) {
          margin: 0 !important;
          padding: 1.5rem !important;
          background: transparent !important;
          font-size: 0.875rem !important;
          line-height: 1.7 !important;
        }

        :global(.shiki-wrapper code) {
          font-family: 'Monaco', 'Courier New', monospace !important;
        }

        :global(.shiki-wrapper .highlighted-line) {
          background-color: rgba(59, 130, 246, 0.1) !important;
          border-left: 3px solid rgb(59, 130, 246) !important;
          padding-left: 1rem !important;
          margin-left: -1.5rem !important;
          width: calc(100% + 1.5rem) !important;
          display: inline-block !important;
        }

        :global(.shiki-wrapper .line) {
          display: inline-block;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
