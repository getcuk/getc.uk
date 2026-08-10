import type { Lesson } from "@/lib/types/lesson";

/** Placeholder catalogue — replace with filesystem / CMS loaders later. */
const lessons: Lesson[] = [];

export function getAllLessons(): Lesson[] {
  return lessons;
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}
