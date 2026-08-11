import { notFound } from "next/navigation";
import Link from "next/link";
import { GiscusComments } from "@/components/lessons/giscus-comments";
import { LegacyComments } from "@/components/lessons/legacy-comments";
import { LessonBody } from "@/components/lessons/lesson-body";
import { getCommentsForSlug } from "@/lib/content/comments";
import { getLessonBody } from "@/lib/content/lesson-body";
import { getAllLessons, getLessonBySlug } from "@/lib/content/lessons";
import { SITE_AUTHOR_FULL } from "@/lib/constants";
import { formatLessonDate } from "@/lib/format-lesson-date";

type LessonPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllLessons().map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) return { title: "Lesson" };
  return {
    title: lesson.title,
    description: lesson.summary,
    authors: [{ name: SITE_AUTHOR_FULL }],
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) notFound();

  const [segments, comments] = await Promise.all([
    getLessonBody(slug),
    getCommentsForSlug(slug),
  ]);
  const coverSrc = lesson.coverImage
    ? `/lessons/${lesson.slug}/images/${lesson.coverImage}`
    : null;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
      <Link
        href="/lessons"
        className="text-sm text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        ← All lessons
      </Link>
      <p className="mt-6 font-mono text-xs tracking-[0.16em] text-[#ff8a1f] uppercase">
        {lesson.exercise
          ? `K&R Exercise ${lesson.exercise}`
          : lesson.seriesSlug === "setup"
            ? `Setup · ${lesson.badge ?? "Guide"}`
            : "Lesson"}
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
        {lesson.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        {lesson.summary}
      </p>

      <div className="mt-5 space-y-1 text-sm text-zinc-500 dark:text-zinc-400">
        {lesson.publishedAt ? (
          <p>{formatLessonDate(lesson.publishedAt)}</p>
        ) : null}
        {lesson.updatedAt ? (
          <p className="text-[#ff8a1f]">
            Last updated on {formatLessonDate(lesson.updatedAt)}
          </p>
        ) : null}
        <p>
          Author:{" "}
          <span className="text-zinc-700 dark:text-zinc-300">
            {SITE_AUTHOR_FULL}
          </span>
        </p>
      </div>

      {coverSrc ? (
        <div className="mt-8 -mx-4 sm:mx-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverSrc}
            alt=""
            className="h-auto w-full object-cover"
          />
        </div>
      ) : null}

      <LessonBody segments={segments} />

      <LegacyComments comments={comments} />
      <GiscusComments />

      <div className="mt-10 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <Link href="/challenge/1" className="hero-cta-primary">
          Try a related challenge
        </Link>
      </div>
    </main>
  );
}
