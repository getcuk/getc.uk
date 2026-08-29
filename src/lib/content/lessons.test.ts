import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  getAllLessons,
  getKrLessons,
  getLessonBySlug,
  getNextLessonInSeries,
  getSetupLessons,
} from "@/lib/content/lessons";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

describe("lesson catalogue", () => {
  it("has unique slugs", () => {
    const slugs = getAllLessons().map((lesson) => lesson.slug);
    expect(slugs).toEqual([...new Set(slugs)]);
  });

  it("looks up lessons by slug", () => {
    expect(getLessonBySlug("hello-world")?.title).toMatch(/hello/i);
    expect(getLessonBySlug("does-not-exist")).toBeUndefined();
  });

  it("walks to the next lesson in the same series", () => {
    expect(getNextLessonInSeries("why-learn-basics")?.slug).toBe("command-line");
    const setup = getSetupLessons();
    const lastSetup = setup[setup.length - 1];
    expect(lastSetup).toBeDefined();
    expect(getNextLessonInSeries(lastSetup!.slug)).toBeUndefined();
  });

  it("keeps setup and K&R lists as subsets of the catalogue", () => {
    const slugs = new Set(getAllLessons().map((lesson) => lesson.slug));
    for (const lesson of [...getSetupLessons(), ...getKrLessons()]) {
      expect(slugs.has(lesson.slug)).toBe(true);
    }
  });

  it("ships markdown and cover files for every published lesson", () => {
    for (const lesson of getAllLessons()) {
      const markdown = path.join(
        process.cwd(),
        "content",
        "lessons",
        lesson.slug,
        "index.md",
      );
      expect(existsSync(markdown), markdown).toBe(true);

      if (lesson.publishedAt) {
        expect(lesson.publishedAt).toMatch(ISO_DATE);
      }
      if (lesson.updatedAt) {
        expect(lesson.updatedAt).toMatch(ISO_DATE);
        if (lesson.publishedAt) {
          expect(lesson.updatedAt >= lesson.publishedAt).toBe(true);
        }
      }

      const imageDir = path.join(
        process.cwd(),
        "public",
        "lessons",
        lesson.slug,
        "images",
      );
      if (lesson.coverImage) {
        expect(existsSync(path.join(imageDir, lesson.coverImage))).toBe(true);
      }
      if (lesson.coverImageOg) {
        expect(existsSync(path.join(imageDir, lesson.coverImageOg))).toBe(true);
      }
    }
  });
});
