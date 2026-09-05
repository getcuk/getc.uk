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
      ? "challenge-terminal-body--error"
      : tone === "success"
        ? "challenge-terminal-body--success"
        : "challenge-terminal-body";

  return (
    <div
      className={`challenge-terminal flex shrink-0 flex-col transition-[height] duration-200 ${
        open ? "h-40 max-h-[30vh] md:h-52 md:max-h-none" : "h-10"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="challenge-terminal-chrome md-interactive flex h-10 w-full items-center justify-between px-4 font-mono text-[0.7rem] tracking-wide"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <span className="text-white/35" aria-hidden>
            {open ? "▾" : "▴"}
          </span>
          <span className="tracking-[0.14em] text-white/50 uppercase">
            Terminal
          </span>
          {isRunning ? (
            <span className="animate-pulse text-md-primary">running…</span>
          ) : null}
        </span>
        <span className="text-white/35">{open ? "Collapse" : "Expand"}</span>
      </button>
      {open ? (
        <pre
          ref={preRef}
          aria-live="polite"
          className={`min-h-0 flex-1 overflow-auto px-5 pb-4 font-mono text-xs leading-relaxed whitespace-pre-wrap ${bodyClass}`}
        >
          {output || (
            <span className="text-white/35">
              Output will appear here after you run your code.
            </span>
          )}
        </pre>
      ) : null}
    </div>
  );
}
