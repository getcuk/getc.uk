export type LessonDifficulty = "beginner" | "intermediate" | "advanced";

export type Lesson = {
  slug: string;
  title: string;
  summary: string;
  difficulty: LessonDifficulty;
  seriesSlug?: string;
  publishedAt?: string;
};
