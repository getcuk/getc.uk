"use client";

import { useRef } from "react";
import Link from "next/link";
import type { Lesson } from "@/lib/types/lesson";

type LessonsCarouselProps = {
  lessons: Lesson[];
};

export function LessonsCarousel({ lessons }: LessonsCarouselProps) {
  const scrollerRef = useRef<HTMLUListElement>(null);

  function scrollByCard(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-card]");
    const step = card ? card.offsetWidth + 16 : 300;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs tracking-[0.18em] text-[#ff8a1f] uppercase">
            K&amp;R · Second edition
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl dark:text-zinc-50">
            Exercises from The C Programming Language
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
            These are the Chapter 1 exercises from Brian W. Kernighan and
            Dennis M. Ritchie&apos;s{" "}
            <Link
              href="/lessons/k-and-r"
              className="text-[#ff8a1f] underline decoration-[#ff8a1f]/35 underline-offset-2 hover:decoration-[#ff8a1f]"
            >
              textbook
            </Link>{" "}
            — Second Edition, ANSI C. We work through them one at a time.
          </p>
        </div>
        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            className="carousel-nav-btn"
            aria-label="Scroll exercises left"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            className="carousel-nav-btn"
            aria-label="Scroll exercises right"
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
                <span className="font-mono text-[0.65rem] text-[#ff8a1f]">
                  ex_{lesson.exercise?.replace("-", "_") ?? "x"}.c
                </span>
                <span className="font-mono text-[0.6rem] text-white/35">
                  ch.{lesson.exercise?.split("-")[0] ?? "?"}
                </span>
              </div>
              <div className="flex flex-1 flex-col px-3.5 py-3.5">
                <p className="font-mono text-[0.65rem] tracking-wide text-[#ff8a1f]/90">
                  Exercise {lesson.exercise}
                </p>
                <h3 className="mt-2 font-display text-base leading-snug font-semibold text-zinc-50">
                  {lesson.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 font-mono text-[0.7rem] leading-relaxed text-white/45">
                  {lesson.summary}
                </p>
                <span className="mt-4 font-mono text-[0.7rem] text-white/40 transition-colors group-hover:text-[#ff8a1f]">
                  $ open lesson →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
