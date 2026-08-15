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
  /**
   * Clip spare vertical padding on small spot covers (still stored at 1200×630).
   * Page shows a shorter frame; OG JPG stays full canvas.
   */
  coverTight?: boolean;
  /** "docs" = sticky sidebar TOC (command-line style pages) */
  layout?: "article" | "docs";
  /** Sidebar / chip nav for docs layout */
  docsNav?: LessonDocsNavItem[];
  /**
   * Multi-part lesson switcher (e.g. command-line 1/2).
   * Same array on each sibling; current page is highlighted by slug.
   */
  parts?: LessonPart[];
  /** K&R Second Edition chapter number (1–8) for chapter hub pages. */
  krChapter?: number;
  /** Highlighted note under the title (e.g. you do not need to buy the book). */
  notice?: string;
};

export type LessonPart = {
  slug: string;
  /** Short label in the switcher, e.g. "Navigate" or "Files" */
  label: string;
};

export type LessonDocsNavItem = {
  id: string;
  label: string;
  /** Monospace styling for command names */
  command?: boolean;
};
