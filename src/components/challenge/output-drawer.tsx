"use client";

import { useEffect, useRef } from "react";

type OutputDrawerProps = {
  output: string;
  open: boolean;
  onToggle: () => void;
  isRunning: boolean;
  tone?: "default" | "success" | "error";
};

export function OutputDrawer({
  output,
  open,
  onToggle,
  isRunning,
  tone = "default",
}: OutputDrawerProps) {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (!open || !preRef.current) return;
    preRef.current.scrollTop = preRef.current.scrollHeight;
  }, [output, open, isRunning]);

  const bodyClass =
    tone === "error"
      ? "text-red-600 dark:text-red-300"
      : tone === "success"
        ? "text-emerald-700 dark:text-emerald-300"
        : "text-zinc-700 dark:text-zinc-300";

  return (
    <div
      className={`flex shrink-0 flex-col border-t border-zinc-200 bg-white transition-[height] duration-200 dark:border-zinc-800 dark:bg-zinc-950 ${
        open ? "h-52" : "h-10"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex h-10 w-full items-center justify-between px-4 font-mono text-xs text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <span className="text-zinc-400 dark:text-zinc-600">
            {open ? "▾" : "▴"}
          </span>
          Terminal output
          {isRunning ? (
            <span className="animate-pulse text-amber-600 dark:text-amber-400">
              running…
            </span>
          ) : null}
        </span>
        <span className="text-zinc-400 dark:text-zinc-600">
          {open ? "Collapse" : "Expand"}
        </span>
      </button>
      {open ? (
        <pre
          ref={preRef}
          aria-live="polite"
          className={`min-h-0 flex-1 overflow-auto px-4 pb-3 font-mono text-xs leading-relaxed whitespace-pre-wrap ${bodyClass}`}
        >
          {output || (
            <span className="text-zinc-400 dark:text-zinc-600">
              Output will appear here after you run your code.
            </span>
          )}
        </pre>
      ) : null}
    </div>
  );
}
