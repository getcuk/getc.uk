import type { Lesson, LessonPart } from "@/lib/types/lesson";

/**
 * Setup / foundations content from the legacy site export
 * (Desktop/ktc-site/output-final posts + why-learn page).
 */
const commandLineParts: LessonPart[] = [
  { slug: "command-line", label: "Moving around" },
  { slug: "command-line-files", label: "Files and folders" },
];

const setupLessons: Lesson[] = [
  {
    slug: "why-learn-basics",
    title: "Why learn the basics of coding?",
    summary:
      "AI and copy-paste can ship a demo. Fundamentals are what let you debug it, change it, and invent the program you actually meant.",
    difficulty: "beginner",
    badge: "01",
    seriesSlug: "setup",
    publishedAt: "2019-02-12",
    updatedAt: "2026-08-23",
    coverImage: "why-learn-basics-camel-rider.webp",
    coverImageOg: "why-learn-basics-camel-rider-og.jpg",
    coverImageAlt:
      "Sepia ink-wash of a rider on a galloping camel — featured image for Why learn the basics of coding? on getc.uk",
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
    updatedAt: "2026-08-23",
    coverImage: "command-line-landscape.webp",
    coverImageOg: "command-line-landscape-og.jpg",
    coverImageAlt:
      "Watercolour study of a rocky path through green hills — featured image for the command line lesson on getc.uk",
    layout: "docs",
    parts: commandLineParts,
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
      "Make a sandbox first, then practise mkdir, cp, mv, and rm so a mistake cannot touch the files you care about.",
    difficulty: "beginner",
    badge: "03",
    seriesSlug: "setup",
    publishedAt: "2019-06-11",
    updatedAt: "2026-08-23",
    coverImage: "command-line-files-ducks.webp",
    coverImageOg: "command-line-files-ducks-og.jpg",
    coverImageAlt:
      "Vintage naturalist print of two ducks on rocks in shallow water — featured image for the command line files lesson on getc.uk",
    layout: "docs",
    parts: commandLineParts,
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
    slug: "macos-ready-for-c",
    title: "Getting your macOS ready for C",
    summary:
      "Skip full Xcode. Install Apple’s Command Line Tools so Clang is ready in Terminal — then you can compile C on your Mac.",
    difficulty: "beginner",
    badge: "04",
    seriesSlug: "setup",
    publishedAt: "2019-07-16",
    updatedAt: "2026-08-14",
    coverImage: "macos-ready-for-c-seagull.webp",
    coverImageOg: "macos-ready-for-c-seagull-og.jpg",
    coverImageAlt:
      "Overhead photo of a seagull in flight — featured image for Getting your macOS ready for C on getc.uk",
    coverTight: true,
  },
  {
    slug: "cs50-library",
    title: "Installing the CS50 library",
    summary:
      "Put cs50.h on your Mac so helpers like get_string() work with Clang — install from source, fix the paths, optionally wire a Makefile.",
    difficulty: "beginner",
    badge: "05",
    seriesSlug: "setup",
    publishedAt: "2019-07-17",
    updatedAt: "2026-08-16",
    coverImage: "cs50-library-handdrawn.webp",
    coverImageOg: "cs50-library-handdrawn-og.jpg",
    coverImageAlt:
      "Hand-lettered CS50 Library title sketch — featured image for Installing the CS50 library on getc.uk",
    coverTight: true,
  },
];

const kAndRGuide: Lesson = {
  slug: "k-and-r",
  title: "Why we teach from K&R",
  summary:
    "The exercises on getc.uk come from Kernighan and Ritchie’s The C Programming Language, Second Edition — the short ANSI C textbook that teaches how the machine actually works.",
  difficulty: "beginner",
  badge: "K&R · The textbook",
  seriesSlug: "kr",
  publishedAt: "2026-08-15",
  updatedAt: "2026-08-28",
  notice:
    "You do not need to buy the textbook to follow along. Each lesson states the task in our own words. A copy helps if you have one but it is not required.",
  coverImage: "k-and-r-goat-wellington-boots.webp",
  coverImageOg: "k-and-r-goat-wellington-boots-og.jpg",
  coverImageAlt:
    "White mountain goat in green wellington boots — a GOAT nod for Why we teach from K&R on getc.uk",
};

/**
 * Chapter 1 hub — later chapters join this list when their lessons are written.
 */
const krChapter1: Lesson = {
  slug: "kr-chapter-1",
  title: "Chapter 1: A Tutorial Introduction",
  summary:
    "Hello, world, tables, characters, and the first programs that talk to the machine.",
  difficulty: "beginner",
  badge: "01",
  krChapter: 1,
  seriesSlug: "kr",
  publishedAt: "2026-08-15",
  updatedAt: "2026-09-08",
  notice:
    "You do not need to buy the textbook to follow along. Each lesson states the task in our own words. A copy helps if you have one but it is not required.",
  layout: "docs",
  docsNav: [
    { id: "what-this-chapter-covers", label: "What it covers" },
    { id: "exercises-on-this-site", label: "Exercises" },
    { id: "later-in-chapter-1", label: "Later in Chapter 1" },
    { id: "next", label: "Next" },
  ],
};

/**
 * K&R Chapter 1 exercise solutions imported from the legacy site export
 * (Desktop/ktc-site/output-final/posts, category: kr-exercise-solutions).
 * Ordered by exercise number.
 */
const krLessons: Lesson[] = [
  {
    slug: "hello-world",
    title: "Hello, world",
    summary:
      "K&R Exercise 1-1: write hello, world, compile it, then break pieces off and read what the compiler says.",
    difficulty: "beginner",
    exercise: "1-1",
    seriesSlug: "kr",
    publishedAt: "2022-05-13",
    updatedAt: "2026-09-08",
    coverImage: "hello-world-question-mark.webp",
    coverImageOg: "hello-world-question-mark-og.jpg",
    coverImageAlt:
      "Watercolour of two figures under a glowing question-mark plume — featured image for Hello, world on getc.uk",
  },
  {
    slug: "unknown-escape-sequences",
    title: "Unknown escape sequences",
    summary:
      "K&R Exercise 1-2: put a fake escape like \\c inside printf, compile it, and read the warning — then run the program and see what printed.",
    difficulty: "beginner",
    exercise: "1-2",
    seriesSlug: "kr",
    publishedAt: "2022-05-13",
    updatedAt: "2026-09-08",
    coverImage: "unknown-escape-sequences-unicorn.webp",
    coverImageOg: "unknown-escape-sequences-unicorn-og.jpg",
    coverImageAlt:
      "Red stencil of a unicorn in profile — featured image for Unknown escape sequences on getc.uk",
  },
  {
    slug: "fahrenheit-to-celsius",
    title: "Fahrenheit to Celsius table",
    summary:
      "K&R Exercise 1-3: print a Fahrenheit–Celsius table from 0 to 300, then add a heading so the columns have names.",
    difficulty: "beginner",
    exercise: "1-3",
    seriesSlug: "kr",
    publishedAt: "2022-05-13",
    updatedAt: "2026-09-08",
    coverImage: "fahrenheit-to-celsius-street.webp",
    coverImageOg: "fahrenheit-to-celsius-street-og.jpg",
    coverImageAlt:
      "Hand-coloured street scene with a public water pump — featured image for Fahrenheit to Celsius table on getc.uk",
  },
  {
    slug: "celsius-to-fahrenheit",
    title: "Celsius to Fahrenheit table",
    summary:
      "K&R Exercise 1-4: invert the temperature table — Celsius on the left, Fahrenheit on the right — using the same loop with the formula flipped.",
    difficulty: "beginner",
    exercise: "1-4",
    seriesSlug: "kr",
    publishedAt: "2022-05-13",
    updatedAt: "2026-09-08",
    coverImage: "celsius-to-fahrenheit-steam-engine.webp",
    coverImageOg: "celsius-to-fahrenheit-steam-engine-og.jpg",
    coverImageAlt:
      "Victorian engraving of a steam engine with two figures — featured image for Celsius to Fahrenheit table on getc.uk",
  },
  {
    slug: "reverse-temperature-table",
    title: "Reverse temperature table",
    summary:
      "K&R Exercise 1-5: reprint the Fahrenheit–Celsius table from 300 down to 0, using a for loop that counts backwards.",
    difficulty: "beginner",
    exercise: "1-5",
    seriesSlug: "kr",
    publishedAt: "2022-05-13",
    updatedAt: "2026-09-08",
    coverImage: "reverse-temperature-table-omnibus.webp",
    coverImageOg: "reverse-temperature-table-omnibus-og.jpg",
    coverImageAlt:
      "Vintage lithograph of a Madeleine–Bastille horse-drawn omnibus and a woman with a yellow cape — featured image for Reverse temperature table on getc.uk",
  },
  {
    slug: "getchar-and-eof",
    title: "getchar() and EOF",
    summary:
      "K&R Exercise 1-6: prove that getchar() != EOF is only 0 or 1 — type a character for 1, send end-of-file for 0.",
    difficulty: "beginner",
    exercise: "1-6",
    seriesSlug: "kr",
    publishedAt: "2022-05-14",
    updatedAt: "2026-09-08",
    coverImage: "getchar-and-eof-couple.webp",
    coverImageOg: "getchar-and-eof-couple-og.jpg",
    coverImageAlt:
      "Hand-coloured print of a couple walking past a stone doorway — featured image for getchar() and EOF on getc.uk",
  },
  {
    slug: "value-of-eof",
    title: "The value of EOF",
    summary:
      "K&R Exercise 1-7: print the numeric value of EOF — a one-line program that asks stdio.h what that macro actually is.",
    difficulty: "beginner",
    exercise: "1-7",
    seriesSlug: "kr",
    publishedAt: "2022-05-14",
    updatedAt: "2026-09-08",
    coverImage: "value-of-eof-umbrella.webp",
    coverImageOg: "value-of-eof-umbrella-og.jpg",
    coverImageAlt:
      "Black-and-white painting of a figure with an umbrella in the rain — featured image for The value of EOF on getc.uk",
  },
  {
    slug: "count-blanks",
    title: "Count blanks, tabs, and newlines",
    summary:
      "K&R Exercise 1-8: read input with getchar until EOF and count spaces, tabs, and newlines as three separate totals.",
    difficulty: "beginner",
    exercise: "1-8",
    seriesSlug: "kr",
    publishedAt: "2025-02-07",
    updatedAt: "2026-09-08",
    coverImage: "count-blanks-cafe.webp",
    coverImageOg: "count-blanks-cafe-og.jpg",
    coverImageAlt:
      "Vintage cafe illustration of a man in a green jacket and a woman in a yellow hat looking at a card — featured image for Count blanks, tabs, and newlines on getc.uk",
  },
  {
    slug: "collapse-blanks",
    title: "Collapse runs of blanks",
    summary:
      "K&R Exercise 1-9: copy input to output, replacing each run of one or more blanks with a single blank.",
    difficulty: "beginner",
    exercise: "1-9",
    seriesSlug: "kr",
    publishedAt: "2025-02-14",
    updatedAt: "2026-09-08",
    coverImage: "collapse-blanks-sage.webp",
    coverImageOg: "collapse-blanks-sage-og.jpg",
    coverImageAlt:
      "Japanese-style collage of a seated sage and a student in an orange robe under a pine, with a seascape panel — featured image for Collapse runs of blanks on getc.uk",
  },
  {
    slug: "make-escapes-visible",
    title: "Make escapes visible",
    summary:
      "K&R Exercise 1-10: copy input to output, replacing each tab, backspace, and backslash with a visible escape sequence.",
    difficulty: "beginner",
    exercise: "1-10",
    seriesSlug: "kr",
    publishedAt: "2025-02-15",
    updatedAt: "2026-09-08",
    coverImage: "make-escapes-visible-girl.webp",
    coverImageOg: "make-escapes-visible-girl-og.jpg",
    coverImageAlt:
      "Teal vintage ink sketch of a woman holding her head in her hands — featured image for Make escapes visible on getc.uk",
  },
  {
    slug: "test-word-count",
    title: "Test the word count program",
    summary:
      "K&R Exercise 1-11: compile the word-count program, then try empty input, whitespace-only files, missing newlines, and punctuation to see which cases uncover bugs.",
    difficulty: "intermediate",
    exercise: "1-11",
    seriesSlug: "kr",
    publishedAt: "2025-05-26",
    updatedAt: "2026-09-08",
    coverImage: "test-word-count-venice-canal.webp",
    coverImageOg: "test-word-count-venice-canal-og.jpg",
    coverImageAlt:
      "Watercolour of a Venetian canal with a bridge, gondolas, and a domed church — featured image for Test the word count program on getc.uk",
  },
];

const lessons: Lesson[] = [...setupLessons, kAndRGuide, krChapter1, ...krLessons];

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
