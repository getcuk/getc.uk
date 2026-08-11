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
  /** ISO date YYYY-MM-DD */
  publishedAt?: string;
  /** ISO date YYYY-MM-DD */
  updatedAt?: string;
  /** Filename under public/lessons/{slug}/images/ */
  coverImage?: string;
  /** Optional solid-background image for Open Graph / social cards */
  coverImageOg?: string;
  /** Accessible / SEO description for the cover (falls back to title) */
  coverImageAlt?: string;
  /** "docs" = sticky sidebar TOC (command-line style pages) */
  layout?: "article" | "docs";
  /** Sidebar / chip nav for docs layout */
  docsNav?: LessonDocsNavItem[];
};

export type LessonDocsNavItem = {
  id: string;
  label: string;
  /** Monospace styling for command names */
  command?: boolean;
};
