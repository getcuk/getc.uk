"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Link from "next/link";
import type { Lesson } from "@/lib/types/lesson";
import { cn } from "@/lib/utils/cn";

type SetupPathProps = {
  lessons: Lesson[];
  eyebrow?: string;
  title?: string;
  description?: ReactNode;
};

const STEP_SHORT_LABELS: Record<string, string> = {
  "why-learn-basics": "Basics",
  "command-line": "Command Line",
  "command-line-files": "File System",
  "macos-ready-for-c": "macOS Tools",
  "cs50-library": "CS50 Library",
};

function shortLabel(lesson: Lesson): string {
  return STEP_SHORT_LABELS[lesson.slug] ?? lesson.title;
}

export function SetupPath({
  lessons,
  eyebrow = "Start here",
  title = "Before you write C",
  description = "Why fundamentals matter, then Terminal, then a Mac that can compile.",
}: SetupPathProps) {
  const reactId = useId();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const count = lessons.length;
  const safeIndex = count === 0 ? 0 : Math.min(active, count - 1);
  const lesson = lessons[safeIndex];
  const isLast = safeIndex === count - 1;
  const progress =
    count > 1 ? (Math.min(safeIndex + 1, count - 1) / (count - 1)) * 100 : 0;
  const trackInset = count > 0 ? `${100 / (2 * count)}%` : "0%";

  function selectStep(index: number, focus = false) {
    if (count === 0) return;
    const next = Math.max(0, Math.min(index, count - 1));
    if (next !== safeIndex) {
      setDirection(next > safeIndex ? 1 : -1);
      setActive(next);
    }
    const tab = tabRefs.current[next];
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    tab?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: reduceMotion ? "auto" : "smooth",
    });
    if (focus) tab?.focus();
  }

  function onStepperKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (count === 0) return;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        selectStep(safeIndex + 1, true);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        selectStep(safeIndex - 1, true);
        break;
      case "Home":
        event.preventDefault();
        selectStep(0, true);
        break;
      case "End":
        event.preventDefault();
        selectStep(count - 1, true);
        break;
      default:
        break;
    }
  }

  return (
    <div className="setup-wizard rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 lg:p-12 dark:border-amber-900/40 dark:bg-zinc-900/90 dark:shadow-[0_24px_64px_rgba(0,0,0,0.55)]">
      <div className="max-w-2xl">
        <p className="text-xs font-medium tracking-[0.08em] text-[#ff8a1f] uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl dark:text-zinc-100">
          {title}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-zinc-400">
          {description}
        </p>
      </div>

      {count > 0 && lesson ? (
        <div className="mt-10">
          <div className="relative isolate">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 -z-10 hidden h-10 md:block"
              style={{ left: trackInset, right: trackInset }}
            >
              <div className="absolute top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-slate-200 dark:bg-zinc-600" />
              <div
                className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#ff8a1f] transition-[width] duration-300 ease-out motion-reduce:transition-none"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div
              role="tablist"
              aria-label={`${title} steps`}
              onKeyDown={onStepperKeyDown}
              className="relative z-10 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:thin] md:snap-none md:gap-0 md:overflow-visible md:pb-0"
            >
              {lessons.map((step, index) => {
                const isActive = index === safeIndex;
                const isComplete = index <= safeIndex;
                const isNext = index === safeIndex + 1;
                const label = shortLabel(step);
                const tabId = `${reactId}-tab-${index}`;

                return (
                  <button
                    key={step.slug}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={tabId}
                    aria-selected={isActive}
                    aria-controls={`${reactId}-panel`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => selectStep(index)}
                    className="flex w-[5.75rem] shrink-0 snap-start flex-col items-center md:w-auto md:min-w-0 md:flex-1"
                  >
                    <span
                      className={cn(
                        "md-interactive relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium",
                        isComplete
                          ? "bg-[#ff8a1f] text-white"
                          : isNext
                            ? "border-2 border-orange-300 bg-orange-100 text-[#ff8a1f] dark:border-[#ff8a1f] dark:bg-orange-950 dark:text-[#ff8a1f]"
                            : "border-2 border-slate-300 bg-slate-100 text-slate-600 dark:border-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
                      )}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={cn(
                        "mt-2 max-w-[7.5rem] text-center text-xs font-medium leading-tight",
                        isComplete
                          ? "text-slate-900 dark:text-zinc-100"
                          : isNext
                            ? "text-slate-600 dark:text-zinc-200"
                            : "text-slate-500 dark:text-zinc-500",
                      )}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            role="tabpanel"
            id={`${reactId}-panel`}
            aria-labelledby={`${reactId}-tab-${safeIndex}`}
            className="relative mt-8 rounded-2xl border border-slate-200 bg-slate-100/80 p-6 sm:p-8 dark:border-amber-900/40 dark:bg-stone-900/85"
          >
            <div className="min-w-0 overflow-hidden">
              <div
                key={lesson.slug}
                className="setup-step-panel"
                data-direction={direction}
              >
                <h3 className="font-display text-xl font-medium tracking-tight text-slate-900 sm:text-2xl dark:text-zinc-100">
                  {lesson.title}
                </h3>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-zinc-400">
                  {lesson.summary}
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <Link
                href={`/lessons/${lesson.slug}`}
                className="setup-read-btn border-2 border-orange-300 bg-orange-100 text-[#ff8a1f] dark:border-[#ff8a1f] dark:bg-orange-950 dark:text-[#ff8a1f]"
              >
                Read lesson
              </Link>
              {isLast ? (
                <Link href="/lessons/hello-world" className="setup-next-btn">
                  Start K&R
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => selectStep(safeIndex + 1)}
                  className="setup-next-btn"
                >
                  Next Step
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
