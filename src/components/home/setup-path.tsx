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
    <div className="setup-wizard rounded-3xl bg-md-surface-container-lowest p-6 outline outline-1 outline-md-outline-variant sm:p-10 lg:p-12">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.08em] text-md-primary uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-md-on-surface sm:text-4xl">
          {title}
        </h2>
        <p className="mt-3 text-base font-medium leading-relaxed text-md-on-surface-variant">
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
              <div className="absolute top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-md-outline-variant" />
              <div
                className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-md-primary transition-[width] duration-300 ease-out motion-reduce:transition-none"
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
                          ? "bg-md-primary text-md-on-primary"
                          : isNext
                            ? "bg-md-primary-container text-md-on-primary-container"
                            : "bg-md-surface-container-high text-md-on-surface-variant",
                      )}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={cn(
                        "mt-2 max-w-[7.5rem] text-center text-xs font-semibold leading-tight",
                        isComplete
                          ? "text-md-on-surface"
                          : isNext
                            ? "text-md-on-surface"
                            : "text-md-on-surface-variant",
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
            className="relative mt-8 rounded-2xl bg-md-surface-container-low p-6 sm:p-8"
          >
            <div className="min-w-0 overflow-hidden">
              <div
                key={lesson.slug}
                className="setup-step-panel"
                data-direction={direction}
              >
                <h3 className="font-display text-xl font-medium tracking-tight text-md-on-surface sm:text-2xl">
                  {lesson.title}
                </h3>
                <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-md-on-surface-variant">
                  {lesson.summary}
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <Link
                href={`/lessons/${lesson.slug}`}
                className="setup-read-btn md-interactive"
              >
                Read lesson
              </Link>
              {isLast ? (
                <Link href="/lessons/hello-world" className="setup-next-btn md-interactive">
                  Start K&R
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => selectStep(safeIndex + 1)}
                  className="setup-next-btn md-interactive"
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
