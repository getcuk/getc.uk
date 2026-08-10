"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type InstructionsPanelProps = {
  markdown: string;
};

export function InstructionsPanel({ markdown }: InstructionsPanelProps) {
  return (
    <section className="relative flex h-full min-h-0 flex-col border-b border-zinc-200 bg-zinc-50 md:border-b-0 md:border-r dark:border-emerald-900/40 dark:bg-[#050805]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 dark:opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.35) 3px)",
        }}
      />
      <div className="relative z-10 flex items-center gap-2 border-b border-zinc-200 px-4 py-2 font-mono text-xs text-zinc-500 dark:border-emerald-900/50 dark:text-emerald-500/80">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400 dark:shadow-[0_0_8px_#34d399]" />
        instructions.md
      </div>
      <div className="relative z-10 min-h-0 flex-1 overflow-y-auto px-4 py-5 font-mono text-sm leading-relaxed text-zinc-700 dark:text-emerald-300/90">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="mb-4 text-lg font-semibold tracking-wide text-zinc-950 dark:text-emerald-200">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="mt-6 mb-2 text-base font-semibold text-amber-700 dark:text-amber-300">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="mt-4 mb-2 text-sm font-semibold text-amber-800 dark:text-amber-200/90">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="mb-3 text-zinc-700 dark:text-emerald-300/85">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="mb-3 list-disc space-y-1 pl-5 text-zinc-700 dark:text-emerald-300/85">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="mb-3 list-decimal space-y-1 pl-5 text-zinc-700 dark:text-emerald-300/85">
                {children}
              </ol>
            ),
            li: ({ children }) => <li>{children}</li>,
            strong: ({ children }) => (
              <strong className="font-semibold text-zinc-950 dark:text-emerald-100">
                {children}
              </strong>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-teal-700 underline underline-offset-2 hover:text-teal-800 dark:text-cyan-300 dark:hover:text-cyan-200"
              >
                {children}
              </a>
            ),
            code: ({ className, children }) => {
              const isBlock = Boolean(className);
              if (isBlock) {
                return (
                  <code className="block whitespace-pre font-mono text-[0.8rem] text-emerald-800 dark:text-lime-300">
                    {children}
                  </code>
                );
              }
              return (
                <code className="rounded bg-zinc-200/80 px-1.5 py-0.5 text-[0.8rem] text-emerald-800 dark:bg-emerald-950/80 dark:text-lime-300">
                  {children}
                </code>
              );
            },
            pre: ({ children }) => (
              <pre className="mb-4 overflow-x-auto rounded border border-zinc-200 bg-white p-3 dark:border-emerald-900/60 dark:bg-black/50">
                {children}
              </pre>
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </section>
  );
}
