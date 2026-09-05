import { describe, expect, it } from "vitest";
import { filterLessons } from "@/lib/content/filter-lessons";
import type { Lesson } from "@/lib/types/lesson";

const lessons: Lesson[] = [
  {
    slug: "hello-world",
    title: "Hello, world",
    summary: "Write hello, world, compile it, then break pieces off.",
    difficulty: "beginner",
  },
  {
    slug: "command-line",
    title: "Solid foundation in the command line",
    summary: "Open Terminal and walk around with pwd, ls, and cd.",
    difficulty: "beginner",
  },
  {
    slug: "testing-word-count",
    title: "Testing word count",
    summary: "Probe the word-count program with adversarial inputs.",
    difficulty: "intermediate",
  },
];

describe("filterLessons", () => {
  it("returns the original list when the query is empty or whitespace", () => {
    expect(filterLessons(lessons, "")).toEqual(lessons);
    expect(filterLessons(lessons, "   ")).toEqual(lessons);
  });

  it("matches title text case-insensitively", () => {
    expect(filterLessons(lessons, "HELLO").map((lesson) => lesson.slug)).toEqual(
      ["hello-world"],
    );
  });

  it("matches description text", () => {
    expect(filterLessons(lessons, "terminal").map((lesson) => lesson.slug)).toEqual(
      ["command-line"],
    );
  });

  it("keeps catalogue order for multiple matches", () => {
    expect(filterLessons(lessons, "with").map((lesson) => lesson.slug)).toEqual([
      "command-line",
      "testing-word-count",
    ]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterLessons(lessons, "pointers")).toEqual([]);
  });

  it("returns the original list when no difficulties are selected", () => {
    expect(filterLessons(lessons, "", [])).toEqual(lessons);
  });

  it("keeps only the selected difficulties", () => {
    expect(
      filterLessons(lessons, "", ["intermediate"]).map((lesson) => lesson.slug),
    ).toEqual(["testing-word-count"]);
  });

  it("combines search with difficulty", () => {
    expect(
      filterLessons(lessons, "with", ["beginner"]).map((lesson) => lesson.slug),
    ).toEqual(["command-line"]);
  });

  it("returns an empty list when the difficulty has no matches", () => {
    expect(filterLessons(lessons, "", ["advanced"])).toEqual([]);
  });
});
