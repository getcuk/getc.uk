"use client";

import { useEffect, useState } from "react";
import type { LessonDocsNavItem } from "@/lib/types/lesson";

type LessonDocsNavProps = {
  items: LessonDocsNavItem[];
  title?: string;
  /** mobile = chips above content; rail = vertical list in the left margin */
  variant?: "mobile" | "rail";
};

/** Align with heading `scroll-mt-24` + sticky header so the section under the bar is active. */
const TOP_OFFSET_PX = 128;

function readActiveId(items: LessonDocsNavItem[]): string {
  let current = items[0]?.id ?? "";
  for (const item of items) {
    const el = document.getElementById(item.id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= TOP_OFFSET_PX) {
      current = item.id;
    }
  }
  return current;
}

export function LessonDocsNav({
  items,
  title = "On this page",
  variant = "rail",
}: LessonDocsNavProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    let frame = 0;

    const sync = () => {
      frame = 0;
      const next = readActiveId(items);
      setActiveId((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(sync);
    };

    // Scroll position is the source of truth. Preferring location.hash froze the
    // highlight after every nav click while the user kept scrolling.
    sync();

    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("hashchange", sync);
    window.addEventListener("resize", sync);
    window.addEventListener("scrollend", sync);

    const t0 = window.setTimeout(sync, 0);
    const t1 = window.setTimeout(sync, 150);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.removeEventListener("scroll", onScroll, true);
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("resize", sync);
      window.removeEventListener("scrollend", sync);
    };
  }, [items]);

  if (variant === "mobile") {
    return (
      <nav aria-label="Lesson sections" className="lesson-docs-nav">
        <p className="mb-3 font-mono text-[0.65rem] tracking-[0.16em] text-md-primary uppercase">
          {title}
        </p>
        <ul className="flex gap-2 overflow-x-auto pb-2">
          {items.map((item) => (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                onClick={() => setActiveId(item.id)}
                className={`md-interactive inline-flex rounded-full px-3 py-1.5 font-mono text-xs ${
                  activeId === item.id
                    ? "bg-md-primary-container text-md-on-primary-container"
                    : "bg-md-surface-container-high text-md-on-surface-variant"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label="Lesson sections" className="lesson-docs-nav">
      <p className="mb-3 font-mono text-[0.65rem] tracking-[0.16em] text-md-primary uppercase">
        {title}
      </p>
      <ul className="space-y-0.5">
        {items.map((item) => {
          const active = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setActiveId(item.id)}
                aria-current={active ? "location" : undefined}
                className={`md-interactive block rounded-xl px-2.5 py-1.5 ${
                  item.command
                    ? "font-mono text-[0.8rem]"
                    : "font-sans text-[0.85rem]"
                } ${
                  active
                    ? "bg-md-primary-container text-md-on-primary-container"
                    : "text-md-on-surface-variant hover:bg-md-surface-container-high hover:text-md-on-surface"
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
