"use client";

import { useEffect, useState } from "react";
import type { LessonDocsNavItem } from "@/lib/types/lesson";

type LessonDocsNavProps = {
  items: LessonDocsNavItem[];
  title?: string;
};

const SCROLL_OFFSET_PX = 120;

function activeFromScroll(items: LessonDocsNavItem[]): string {
  let current = items[0]?.id ?? "";
  for (const item of items) {
    const el = document.getElementById(item.id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= SCROLL_OFFSET_PX) {
      current = item.id;
    }
  }
  return current;
}

function activeFromHash(items: LessonDocsNavItem[]): string | null {
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return null;
  return items.some((item) => item.id === hash) ? hash : null;
}

export function LessonDocsNav({
  items,
  title = "On this page",
}: LessonDocsNavProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const sync = () => {
      setActiveId(activeFromHash(items) ?? activeFromScroll(items));
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, [items]);

  function onNavClick(id: string) {
    setActiveId(id);
  }

  return (
    <nav
      aria-label="Lesson sections"
      className="lesson-docs-nav lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto"
    >
      <p className="mb-3 font-mono text-[0.65rem] tracking-[0.16em] text-[#ff8a1f] uppercase">
        {title}
      </p>

      {/* Mobile: horizontal chips */}
      <ul className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
        {items.map((item) => (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              onClick={() => onNavClick(item.id)}
              className={`inline-flex rounded-md border px-2.5 py-1.5 font-mono text-xs transition-colors ${
                activeId === item.id
                  ? "border-[#ff8a1f]/50 bg-[#ff8a1f]/10 text-[#ff8a1f]"
                  : "border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop: vertical list */}
      <ul className="hidden space-y-0.5 border-l border-zinc-200 lg:block dark:border-zinc-800">
        {items.map((item) => {
          const active = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => onNavClick(item.id)}
                className={`-ml-px block border-l-2 py-1.5 pl-3 text-sm transition-colors ${
                  item.command
                    ? "font-mono text-[0.8rem]"
                    : "font-sans text-[0.85rem]"
                } ${
                  active
                    ? "border-[#ff8a1f] text-[#ff8a1f]"
                    : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
