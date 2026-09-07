"use client";

import type { ReactNode } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  type InstructionSectionVariant,
  splitInstructionSections,
} from "@/lib/content/split-instruction-sections";

type InstructionsPanelProps = {
  markdown: string;
  children?: ReactNode;
};

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="mb-4 text-lg font-semibold tracking-wide text-md-on-surface">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-0 mb-2 font-mono text-[0.7rem] font-semibold tracking-[0.14em] text-md-primary uppercase">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-4 mb-2 text-sm font-semibold text-md-on-surface">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-3 text-md-on-surface-variant">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-3 list-disc space-y-1 pl-5 text-md-on-surface-variant">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-3 list-decimal space-y-1 pl-5 text-md-on-surface-variant">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-md-on-surface">{children}</strong>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-md-primary underline decoration-md-primary/35 underline-offset-2 hover:decoration-md-primary"
    >
      {children}
    </a>
  ),
  code: ({ className, children }) => {
    const isBlock = Boolean(className);
    if (isBlock) {
      return (
        <code className="block whitespace-pre font-mono text-[0.8rem] text-md-on-surface">
          {children}
        </code>
      );
    }
    return (
      <code className="rounded bg-md-surface-container-high px-1.5 py-0.5 text-[0.8rem] text-md-on-surface">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="mb-3 overflow-x-auto rounded-xl bg-md-surface-container-lowest p-3 outline outline-1 outline-md-outline-variant">
      {children}
    </pre>
  ),
};

function sectionClassName(variant: InstructionSectionVariant) {
  if (variant === "intro") {
    return undefined;
  }
  if (variant === "hint") {
    return "challenge-instruction-card challenge-instruction-card--hint";
  }
  if (variant === "spec") {
    return "challenge-instruction-card challenge-instruction-card--spec";
  }
  return "challenge-instruction-card";
}

export function InstructionsPanel({
  markdown,
  children,
}: InstructionsPanelProps) {
  const sections = splitInstructionSections(markdown);

  return (
    <section className="relative flex h-full min-h-0 flex-col border-b border-md-outline-variant bg-md-surface-container-low md:border-r md:border-b-0">
      <div className="relative z-10 flex items-center gap-2 border-b border-md-outline-variant px-4 py-2.5 font-mono text-[0.7rem] tracking-wide text-md-on-surface-variant">
        <span className="inline-block h-2 w-2 rounded-full bg-md-primary" />
        instructions.md
      </div>
      <div className="relative z-10 min-h-0 flex-1 overflow-y-auto px-4 py-5 font-mono text-sm leading-relaxed text-md-on-surface">
        <div className="flex flex-col gap-4">
          {sections.map((section, index) => (
            <div
              key={`${section.variant}-${index}`}
              className={sectionClassName(section.variant)}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {section.markdown}
              </ReactMarkdown>
            </div>
          ))}
        </div>
        {children}
      </div>
    </section>
  );
}
