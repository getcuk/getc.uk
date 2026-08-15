import type { Metadata } from "next";
import Link from "next/link";
import { LessonCard } from "@/components/lessons/lesson-card";
import { getAllLessons } from "@/lib/content/lessons";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Lessons",
  description:
    "Setup guides and K&R Chapter 1 exercises for learning C from first principles — free on getc.uk.",
  alternates: {
    canonical: "/lessons",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: `${SITE_URL}/lessons`,
    siteName: SITE_NAME,
    title: `Lessons · ${SITE_NAME}`,
    description:
      "Setup guides and K&R Chapter 1 exercises for learning C from first principles.",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "get c",
      },
    ],
  },
};

export default function LessonsPage() {
  const lessons = getAllLessons();

  return (
    <main className="page-gutter mx-auto w-full max-w-5xl flex-1 py-12">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          ← Home
        </Link>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Lessons
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Setup guides and K&amp;R Chapter 1 exercises — more series coming soon.
        </p>
      </div>

      {lessons.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-300 p-8 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
          No lessons yet.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {lessons.map((lesson) => (
            <li key={lesson.slug}>
              <LessonCard lesson={lesson} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
