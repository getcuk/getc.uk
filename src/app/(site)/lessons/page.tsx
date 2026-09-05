import type { Metadata } from "next";
import Link from "next/link";
import { LessonsLibrary } from "@/components/lessons/lessons-library";
import { getAllLessons } from "@/lib/content/lessons";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Lessons",
  description:
    "Setup guides and Chapter 1 exercises from Kernighan and Ritchie’s The C Programming Language, Second Edition — free on getc.uk.",
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
      "Setup guides and Chapter 1 exercises from Kernighan and Ritchie’s The C Programming Language, Second Edition.",
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
    <main className="page-gutter w-full flex-1 py-12">
      <div className="mx-auto w-full max-w-5xl">
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
            Setup guides, then Chapter 1 exercises from Kernighan and
            Ritchie&apos;s <em>The C Programming Language</em> (Second Edition).
            Read{" "}
            <Link
              href="/lessons/k-and-r"
              className="text-[#ff8a1f] underline decoration-[#ff8a1f]/35 underline-offset-2 hover:decoration-[#ff8a1f]"
            >
              why we teach from K&amp;R
            </Link>
            .
          </p>
        </div>

        <LessonsLibrary lessons={lessons} />
      </div>
    </main>
  );
}
