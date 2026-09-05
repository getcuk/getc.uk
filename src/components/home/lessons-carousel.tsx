"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Lesson } from "@/lib/types/lesson";
import { cn } from "@/lib/utils/cn";

type LessonsCarouselProps = {
  lessons: Lesson[];
};

function cardStep(scroller: HTMLElement) {
  const card = scroller.querySelector<HTMLElement>("[data-carousel-card]");
  if (!card) return 300;
  const styles = getComputedStyle(scroller);
  const gap = Number.parseFloat(styles.columnGap || styles.gap) || 16;
  return card.offsetWidth + gap;
}

export function LessonsCarousel({ lessons }: LessonsCarouselProps) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    function syncIndex() {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const step = cardStep(scroller);
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      setCanScrollPrev(scroller.scrollLeft > 2);
      setCanScrollNext(maxScroll > 2 && scroller.scrollLeft < maxScroll - 2);

      let next = Math.round(scroller.scrollLeft / step);
      if (maxScroll <= 0) {
        next = 0;
      } else if (scroller.scrollLeft >= maxScroll - 2) {
        next = lessons.length - 1;
      }
      next = Math.max(0, Math.min(next, lessons.length - 1));
      setActiveIndex((prev) => (prev === next ? prev : next));
    }

    syncIndex();
    el.addEventListener("scroll", syncIndex, { passive: true });
    window.addEventListener("resize", syncIndex);
    return () => {
      el.removeEventListener("scroll", syncIndex);
      window.removeEventListener("resize", syncIndex);
    };
  }, [lessons.length]);

  function scrollByCard(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * cardStep(el), behavior: "smooth" });
  }

  function scrollToIndex(index: number) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: index * cardStep(el), behavior: "smooth" });
  }

  const atStart = !canScrollPrev;
  const atEnd = !canScrollNext;

  return (
    <div className="relative">
      <div className="mb-6 flex items-end justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-[0.08em] text-md-primary uppercase">
            K&amp;R · Second edition
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-md-on-surface sm:text-4xl">
            Exercises from The C Programming Language
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-md-on-surface-variant">
            These are the Chapter 1 exercises from Brian W. Kernighan and
            Dennis M. Ritchie&apos;s{" "}
            <Link
              href="/lessons/k-and-r"
              className="font-medium text-md-primary underline decoration-md-primary/35 underline-offset-2 hover:decoration-md-primary"
            >
              textbook
            </Link>{" "}
            — Second Edition, ANSI C. We work through them one at a time.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            className="carousel-nav-btn md-interactive"
            aria-label="Scroll exercises left"
            disabled={atStart}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            className="carousel-nav-btn md-interactive"
            aria-label="Scroll exercises right"
            disabled={atEnd}
          >
            →
          </button>
        </div>
      </div>

      <ul
        ref={scrollerRef}
        className="lessons-carousel flex gap-3 overflow-x-auto pb-4 sm:gap-4"
      >
        {lessons.map((lesson) => (
          <li
            key={lesson.slug}
            data-carousel-card
            className="w-[min(16.5rem,72vw)] shrink-0 snap-start"
          >
            <Link
              href={`/lessons/${lesson.slug}`}
              className="exercise-tile group"
            >
              <div className="exercise-tile-bar">
                <span className="font-mono text-[0.65rem] text-[#ffb77a]">
                  ex_{lesson.exercise?.replace("-", "_") ?? "x"}.c
                </span>
                <span className="font-mono text-[0.6rem] text-md-code-on-surface/70">
                  ch.{lesson.exercise?.split("-")[0] ?? "?"}
                </span>
              </div>
              <div className="flex flex-1 flex-col px-4 py-4">
                <p className="font-mono text-[0.65rem] tracking-wide text-[#ffb77a]">
                  Exercise {lesson.exercise}
                </p>
                <h3 className="mt-2 font-display text-base leading-snug font-medium text-md-code-on-surface">
                  {lesson.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 font-mono text-[0.7rem] leading-relaxed text-md-code-on-surface/75">
                  {lesson.summary}
                </p>
                <span className="mt-4 font-mono text-[0.7rem] text-md-code-on-surface/70">
                  $ open lesson →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {lessons.length > 1 ? (
        <div
          className="mt-2 flex justify-center gap-2"
          role="group"
          aria-label="Exercise carousel position"
        >
          {lessons.map((lesson, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={lesson.slug}
                type="button"
                aria-label={`Go to exercise ${lesson.exercise ?? index + 1}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => scrollToIndex(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  isActive
                    ? "w-6 bg-md-primary"
                    : "w-2 bg-md-outline-variant hover:bg-md-outline",
                )}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
