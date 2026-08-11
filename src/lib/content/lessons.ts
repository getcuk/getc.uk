import type { Lesson } from "@/lib/types/lesson";

/**
 * Setup / foundations content from the legacy site export
 * (Desktop/ktc-site/output-final posts + why-learn page).
 */
const setupLessons: Lesson[] = [
  {
    slug: "why-learn-basics",
    title: "Why learn the basics?",
    summary:
      "AI can write code. Fundamentals teach you why it works — so you can review, debug, and invent solutions yourself.",
    difficulty: "beginner",
    badge: "01",
    seriesSlug: "setup",
    publishedAt: "2019-02-12",
    updatedAt: "2026-08-11",
    coverImage: "why-learn-basics-camel-rider.webp",
    coverImageOg: "why-learn-basics-camel-rider-og.jpg",
    coverImageAlt:
      "Sepia ink wash of a rider on a galloping camel across a desert — featured painting for Why learn the basics?",
  },
  {
    slug: "command-line",
    title: "Solid foundation in the command line",
    summary:
      "I thought Terminal was only for sysadmins — then C forced me to learn it. Open it, see the file tree, and walk around with pwd, ls, and cd.",
    difficulty: "beginner",
    badge: "02",
    seriesSlug: "setup",
    publishedAt: "2019-06-11",
    updatedAt: "2026-08-11",
    coverImage: "command-line-foundation-painting.webp",
    coverImageOg: "command-line-foundation-painting-og.jpg",
    coverImageAlt:
      "Abstract foundation painting — featured image for the command line navigation lesson on getc.uk",
    layout: "docs",
    docsNav: [
      { id: "why-this-matters", label: "Why this matters" },
      { id: "a-few-words-you-will-hear", label: "Terminology" },
      { id: "opening-terminal", label: "Open Terminal" },
      { id: "how-the-disk-is-organised", label: "File system" },
      { id: "pwd", label: "pwd", command: true },
      { id: "ls", label: "ls", command: true },
      { id: "cd", label: "cd", command: true },
      { id: "clear", label: "clear", command: true },
      { id: "addresses-absolute-and-relative", label: "Pathnames" },
      { id: "next", label: "Next" },
    ],
  },
  {
    slug: "command-line-files",
    title: "Command line: files and folders",
    summary:
      "The acidic commands: create a sandbox, then mkdir, cp, mv, and rm without burning the house down. Part 2 of the command line.",
    difficulty: "beginner",
    badge: "03",
    seriesSlug: "setup",
    publishedAt: "2019-06-11",
    updatedAt: "2026-08-11",
    coverImage: "command-line-files-painting.webp",
    coverImageOg: "command-line-files-painting-og.jpg",
    coverImageAlt:
      "Abstract foundation painting — featured image for the command line files lesson on getc.uk",
    layout: "docs",
    docsNav: [
      { id: "man", label: "man", command: true },
      { id: "less", label: "less", command: true },
      { id: "ls", label: "ls -la", command: true },
      { id: "mkdir", label: "mkdir", command: true },
      { id: "touch", label: "touch", command: true },
      { id: "open", label: "open", command: true },
      { id: "cp", label: "cp", command: true },
      { id: "mv", label: "mv", command: true },
      { id: "rm", label: "rm", command: true },
      { id: "next", label: "Next" },
    ],
  },
  {
    slug: "getting-your-macos-ready-for-c",
    title: "Getting your macOS ready for C",
    summary:
      "Install Clang and the macOS command-line tools so you can write and compile C locally.",
    difficulty: "beginner",
    badge: "04",
    seriesSlug: "setup",
    publishedAt: "2019-07-16",
    updatedAt: "2025-02-23",
    coverImage: "Kiss-1600x240-v1.png",
  },
  {
    slug: "installing-cs50-library-locally-on-macos",
    title: "Installing the CS50 library",
    summary:
      "Set up cs50.h on macOS so helpers like get_string() work in your local programs.",
    difficulty: "beginner",
    badge: "05",
    seriesSlug: "setup",
    publishedAt: "2019-07-17",
    updatedAt: "2025-02-16",
    coverImage: "cs50-lib-handdrawn-v2.png",
  },
];

/**
 * K&R Chapter 1 exercise solutions imported from the legacy site export
 * (Desktop/ktc-site/output-final/posts, category: kr-exercise-solutions).
 * Ordered by exercise number.
 */
const krLessons: Lesson[] = [
  {
    slug: "how-to-compile-hello-world-program-in-c",
    title: "Hello, world",
    summary:
      'Run the classic "hello, world" program, then break pieces off to see what the compiler complains about.',
    difficulty: "beginner",
    exercise: "1-1",
    seriesSlug: "kr",
    publishedAt: "2022-05-13",
    updatedAt: "2025-02-07",
    coverImage: "hello-world-v2.png",
  },
  {
    slug: "unknown-escape-sequence-in-c",
    title: "Unknown escape sequences",
    summary:
      "Experiment with \\c inside printf and learn what the compiler does with escapes that do not exist.",
    difficulty: "beginner",
    exercise: "1-2",
    seriesSlug: "kr",
    publishedAt: "2022-05-13",
    updatedAt: "2025-02-05",
    coverImage: "unicorn-960-738.png",
  },
  {
    slug: "fahrenheit-to-celsius-in-c",
    title: "Fahrenheit to Celsius table",
    summary:
      "Print a temperature conversion table with a proper heading above the columns.",
    difficulty: "beginner",
    exercise: "1-3",
    seriesSlug: "kr",
    publishedAt: "2022-05-13",
    updatedAt: "2025-02-05",
    coverImage: "fahrenheit-to-celsius-960x508-1.jpg",
  },
  {
    slug: "celsius-to-fahrenheit-in-c",
    title: "Celsius to Fahrenheit table",
    summary:
      "Write the inverse conversion program: Celsius in, Fahrenheit out.",
    difficulty: "beginner",
    exercise: "1-4",
    seriesSlug: "kr",
    publishedAt: "2022-05-13",
    updatedAt: "2025-02-05",
    coverImage: "Celsius-to-Fahrenheit-960x590-1.jpg",
  },
  {
    slug: "fahrenheit-to-celsius-using-for-loop-in-c",
    title: "Reverse temperature table",
    summary:
      "Reprint the Fahrenheit–Celsius table from 300 down to 0 using a for loop.",
    difficulty: "beginner",
    exercise: "1-5",
    seriesSlug: "kr",
    publishedAt: "2022-05-13",
    updatedAt: "2025-02-06",
    coverImage: "woman-bus-960x900-1.png",
  },
  {
    slug: "getchar-and-eof-in-c",
    title: "getchar() and EOF",
    summary:
      "Verify that the expression getchar() != EOF evaluates to either 0 or 1.",
    difficulty: "beginner",
    exercise: "1-6",
    seriesSlug: "kr",
    publishedAt: "2022-05-14",
    updatedAt: "2025-02-07",
    coverImage: "verify-your-love-960x1269-1.png",
  },
  {
    slug: "value-of-eof-in-c",
    title: "The value of EOF",
    summary: "Write a tiny program that prints the numeric value of EOF.",
    difficulty: "beginner",
    exercise: "1-7",
    seriesSlug: "kr",
    publishedAt: "2022-05-14",
    updatedAt: "2025-02-14",
    coverImage: "beauty-no-bg-960-1211-v2.png",
  },
  {
    slug: "how-to-count-blanks-tabs-and-newlines-in-c",
    title: "Count blanks, tabs, newlines",
    summary:
      "Read input character by character and count blanks, tabs, and newlines.",
    difficulty: "beginner",
    exercise: "1-8",
    seriesSlug: "kr",
    publishedAt: "2025-02-07",
    updatedAt: "2025-02-14",
    coverImage: "count-960x679-no-bg.png",
  },
  {
    slug: "replace-string-of-one-or-more-blanks-by-one-blank-while-copying-input-to-output",
    title: "Collapse runs of blanks",
    summary:
      "Copy input to output, replacing each run of one or more blanks with a single blank.",
    difficulty: "beginner",
    exercise: "1-9",
    seriesSlug: "kr",
    publishedAt: "2025-02-14",
    updatedAt: "2025-02-14",
    coverImage: "method-to-madness-960x669-v1.5.png",
  },
  {
    slug: "c-program-that-replaces-escape-sequence-in-input",
    title: "Make escapes visible",
    summary:
      "Replace tabs, backspaces, and backslashes with visible escape sequences while copying input.",
    difficulty: "beginner",
    exercise: "1-10",
    seriesSlug: "kr",
    publishedAt: "2025-02-15",
    updatedAt: "2025-02-15",
    coverImage: "girl-960x1068-1.png",
  },
  {
    slug: "how-would-you-test-the-word-count-program-what-kinds-of-input-are-most-likely-to-uncover-the-bugs-if-there-are-any",
    title: "Testing word count",
    summary:
      "Probe the word-count program with adversarial inputs and hunt for edge-case bugs.",
    difficulty: "intermediate",
    exercise: "1-11",
    seriesSlug: "kr",
    publishedAt: "2025-05-26",
    updatedAt: "2025-05-26",
    coverImage: "wc-960px-improved-v3.png",
  },
];

const lessons: Lesson[] = [...setupLessons, ...krLessons];

export function getAllLessons(): Lesson[] {
  return lessons;
}

export function getSetupLessons(): Lesson[] {
  return setupLessons;
}

export function getKrLessons(): Lesson[] {
  return krLessons;
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

/** Next lesson in the same series (setup, kr, …), or undefined if last / no series. */
export function getNextLessonInSeries(slug: string): Lesson | undefined {
  const current = getLessonBySlug(slug);
  if (!current?.seriesSlug) return undefined;

  const series = lessons.filter(
    (lesson) => lesson.seriesSlug === current.seriesSlug,
  );
  const index = series.findIndex((lesson) => lesson.slug === slug);
  if (index < 0 || index >= series.length - 1) return undefined;
  return series[index + 1];
}
