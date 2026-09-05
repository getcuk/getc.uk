import type { Lesson, LessonDifficulty } from "@/lib/types/lesson";

export function filterLessons(
  lessons: Lesson[],
  query: string,
  difficulties: readonly LessonDifficulty[] = [],
): Lesson[] {
  const needle = query.trim().toLowerCase();
  const levels = difficulties.length > 0 ? new Set(difficulties) : null;

  if (!needle && !levels) return lessons;

  return lessons.filter((lesson) => {
    if (levels && !levels.has(lesson.difficulty)) return false;
    if (!needle) return true;
    const title = lesson.title.toLowerCase();
    const description = lesson.summary.toLowerCase();
    return title.includes(needle) || description.includes(needle);
  });
}
