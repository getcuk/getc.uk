import Link from "next/link";
import type { Lesson } from "@/lib/types/lesson";

type SetupPathProps = {
  lessons: Lesson[];
};

export function SetupPath({ lessons }: SetupPathProps) {
  return (
    <div className="px-4 sm:px-0">
      <div className="max-w-2xl">
        <p className="font-mono text-xs tracking-[0.18em] text-[#ff8a1f] uppercase">
          Start here · Setup
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl dark:text-zinc-50">
          Get your machine ready
        </h2>
        <p className="mt-2 text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
          Four steps before the exercises — mindset, Terminal, macOS toolchain,
          then CS50.
        </p>
      </div>

      <ol className="setup-path mt-10">
        {lessons.map((lesson, index) => {
          const isLast = index === lessons.length - 1;
          return (
            <li key={lesson.slug} className="setup-path-item">
              <div className="setup-path-rail" aria-hidden="true">
                <span className="setup-path-dot" />
                {!isLast ? <span className="setup-path-line" /> : null}
              </div>
              <Link href={`/lessons/${lesson.slug}`} className="setup-path-link group">
                <span className="setup-path-num font-mono">
                  {lesson.badge ?? String(index + 1).padStart(2, "0")}
                </span>
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
