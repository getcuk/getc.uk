export type LessonDifficulty = "beginner" | "intermediate" | "advanced";

export type Lesson = {
  slug: string;
  title: string;
  summary: string;
  difficulty: LessonDifficulty;
  /** K&R exercise id, e.g. "1-3" */
  exercise?: string;
  /** Short label when not an exercise, e.g. "01" or "Guide" */
  badge?: string;
  seriesSlug?: string;
  publishedAt?: string;
};
