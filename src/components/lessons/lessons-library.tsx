"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { LessonCard } from "@/components/lessons/lesson-card";
import { filterLessons } from "@/lib/content/filter-lessons";
import type { Lesson, LessonDifficulty } from "@/lib/types/lesson";
import { cn } from "@/lib/utils/cn";

const DIFFICULTY_OPTIONS: { value: LessonDifficulty; label: string }[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

type LessonsLibraryProps = {
  lessons: Lesson[];
};

export function LessonsLibrary({ lessons }: LessonsLibraryProps) {
  const inputId = useId();
  const listId = useId();
  const filterPanelId = useId();
  const filterRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [difficulties, setDifficulties] = useState<LessonDifficulty[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const filtered = useMemo(
    () => filterLessons(lessons, query, difficulties),
    [lessons, query, difficulties],
  );
  const searching = query.trim().length > 0;
  const filtering = difficulties.length > 0;
  const narrowed = searching || filtering;

  useEffect(() => {
    if (!filterOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!filterRef.current?.contains(event.target as Node)) {
        setFilterOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFilterOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [filterOpen]);

  function toggleDifficulty(level: LessonDifficulty) {
    setDifficulties((current) =>
      current.includes(level)
        ? current.filter((item) => item !== level)
        : [...current, level],
    );
  }

  function clearFilters() {
    setQuery("");
    setDifficulties([]);
    setFilterOpen(false);
  }

  return (
    <div>
      <search className="mb-6 block">
        <div className="flex items-stretch gap-3">
          <label htmlFor={inputId} className="sr-only">
            Search lessons
          </label>
          <div className="relative min-w-0 flex-1">
            <span
              className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-md-on-surface-variant"
              aria-hidden="true"
            >
              <SearchIcon />
            </span>
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search lessons"
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="search"
              aria-controls={listId}
              className={cn(
                "h-14 w-full appearance-none rounded-xl bg-md-surface-container-highest py-2.5 pl-12 text-base text-md-on-surface outline-none ring-1 ring-md-outline-variant ring-inset placeholder:text-md-on-surface-variant focus:ring-2 focus:ring-md-primary [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
                query ? "pr-16" : "pr-4",
              )}
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="md-interactive absolute inset-y-0 right-2 my-auto h-8 rounded-full px-3 text-xs font-medium text-md-primary"
                aria-label="Clear search"
              >
                Clear
              </button>
            ) : null}
          </div>

          <div ref={filterRef} className="relative shrink-0">
            <button
              type="button"
              aria-label={
                filtering
                  ? `Filter by difficulty, ${difficulties.length} selected`
                  : "Filter by difficulty"
              }
              aria-expanded={filterOpen}
              aria-haspopup="true"
              aria-controls={filterPanelId}
              onClick={() => setFilterOpen((open) => !open)}
              className={cn(
                "md-interactive inline-flex size-14 items-center justify-center rounded-full outline-none",
                filterOpen || filtering
                  ? "bg-md-primary-container text-md-on-primary-container"
                  : "bg-md-surface-container-high text-md-on-surface-variant",
              )}
            >
              <FilterIcon />
            </button>

            {filterOpen ? (
              <div
                id={filterPanelId}
                role="group"
                aria-label="Difficulty"
                className="absolute right-0 z-30 mt-2 w-56 rounded-xl bg-md-surface-container-lowest p-3 shadow-lg outline outline-1 outline-md-outline-variant"
              >
                <p className="px-2 pt-1 pb-3 font-mono text-[0.65rem] tracking-[0.16em] text-md-primary uppercase">
                  Difficulty
                </p>
                <ul className="space-y-2">
                  {DIFFICULTY_OPTIONS.map((option) => {
                    const optionId = `${filterPanelId}-${option.value}`;
                    const checked = difficulties.includes(option.value);
                    return (
                      <li key={option.value}>
                        <button
                          id={optionId}
                          type="button"
                          aria-pressed={checked}
                          onClick={() => toggleDifficulty(option.value)}
                          className={cn(
                            "md-interactive w-full rounded-full px-4 py-2.5 text-left text-sm font-medium",
                            checked
                              ? "bg-md-primary-container text-md-on-primary-container"
                              : "bg-md-surface-container-low text-md-on-surface-variant",
                          )}
                        >
                          {option.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
        {narrowed && filtered.length > 0 ? (
          <p
            className="mt-3 text-sm text-md-on-surface-variant"
            aria-live="polite"
          >
            {filtered.length === 1 ? "1 lesson" : `${filtered.length} lessons`}
          </p>
        ) : null}
      </search>

      {lessons.length === 0 ? (
        <p
          id={listId}
          className="rounded-xl bg-md-surface-container p-8 text-sm text-md-on-surface-variant"
        >
          No lessons yet.
        </p>
      ) : filtered.length === 0 ? (
        <p
          id={listId}
          className="rounded-xl bg-md-surface-container p-8 text-sm text-md-on-surface-variant"
        >
          {emptyMessage(query, filtering)}{" "}
          <button
            type="button"
            onClick={clearFilters}
            className="font-medium text-md-primary underline decoration-md-primary/35 underline-offset-2 hover:decoration-md-primary"
          >
            {searching && filtering
              ? "Clear search and filters"
              : filtering
                ? "Clear filters"
                : "Clear search"}
          </button>
        </p>
      ) : (
        <ul id={listId} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((lesson, index) => (
            <li key={lesson.slug}>
              <LessonCard lesson={lesson} priority={index < 3} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function emptyMessage(query: string, filtering: boolean): string {
  const needle = query.trim();
  if (needle && filtering) {
    return `No lessons match “${needle}” with the selected filters.`;
  }
  if (needle) return `No lessons match “${needle}”.`;
  return "No lessons match the selected filters.";
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="6.75" cy="6.75" r="4.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 10.5 13.25 13.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2.5 4h11M4.5 8h7M6.5 12h3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
