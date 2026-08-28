import type { ReactNode } from "react";
import Link from "next/link";
import type { Lesson } from "@/lib/types/lesson";

type SetupPathProps = {
  lessons: Lesson[];
  eyebrow?: string;
  title?: string;
  description?: ReactNode;
};

export function SetupPath({
  lessons,
  eyebrow = "Start here",
  title = "Before you write C",
  description = "Why fundamentals matter, then Terminal, then a Mac that can compile.",
}: SetupPathProps) {
  return (
    <div className="max-w-3xl">
      <div>
        <p className="font-mono text-xs tracking-[0.18em] text-[#ff8a1f] uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl dark:text-zinc-50">
          {title}
        </h2>
        <p className="mt-2 text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
          {description}
        </p>
      </div>

      <ol className="setup-path mt-10">
        {lessons.map((lesson, index) => {
          const isLast = index === lessons.length - 1;
          const num = lesson.badge ?? String(index + 1).padStart(2, "0");
          return (
            <li
              key={lesson.slug}
              className={
                index === 0
                  ? "setup-path-item setup-path-item-start"
                  : "setup-path-item"
              }
            >
              <div className="setup-path-rail" aria-hidden="true">
                <span className="setup-path-station font-mono">{num}</span>
                {!isLast ? <span className="setup-path-line" /> : null}
              </div>
              <Link
                href={`/lessons/${lesson.slug}`}
                className="setup-path-link group"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-zinc-950 transition-colors group-hover:text-[#ff8a1f] sm:text-xl dark:text-zinc-50 dark:group-hover:text-[#ff8a1f]">
                    {lesson.title}
                  </h3>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {lesson.summary}
                  </p>
                </div>
                <span className="setup-path-cta font-mono text-xs text-zinc-400 transition-colors group-hover:text-[#ff8a1f] dark:text-zinc-500">
                  Open →
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
