import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GiscusComments } from "@/components/lessons/giscus-comments";
import { LegacyComments } from "@/components/lessons/legacy-comments";
import { LessonBody } from "@/components/lessons/lesson-body";
import { LessonDocsNav } from "@/components/lessons/lesson-docs-nav";
import { LessonPartsNav } from "@/components/lessons/lesson-parts-nav";
import { getCommentsForSlug } from "@/lib/content/comments";
import { getLessonBody, splitAtHeadingId } from "@/lib/content/lesson-body";
import { getAllLessons, getLessonBySlug, getNextLessonInSeries } from "@/lib/content/lessons";
import { SITE_AUTHOR_FULL, SITE_NAME } from "@/lib/constants";
import { formatLessonDate } from "@/lib/format-lesson-date";
import {
  JsonLd,
  absoluteUrl,
  lessonCoverAlt,
  lessonCoverOgUrl,
  lessonJsonLd,
} from "@/lib/seo/json-ld";

type LessonPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllLessons().map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) return { title: "Lesson" };

  const url = absoluteUrl(`/lessons/${lesson.slug}`);
  const cover = lessonCoverOgUrl(lesson);
  const coverAlt = lessonCoverAlt(lesson);
  const ogImage = cover
    ? {
        url: cover,
        width: 1200,
        height: 630,
        alt: coverAlt,
      }
    : {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "get c",
      };

  return {
    title: lesson.title,
    description: lesson.summary,
    authors: [{ name: SITE_AUTHOR_FULL }],
    alternates: {
      canonical: `/lessons/${lesson.slug}`,
    },
    openGraph: {
      type: "article",
      locale: "en_GB",
      url,
      siteName: SITE_NAME,
      title: lesson.title,
      description: lesson.summary,
      publishedTime: lesson.publishedAt,
      modifiedTime: lesson.updatedAt ?? lesson.publishedAt,
      authors: [SITE_AUTHOR_FULL],
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: lesson.title,
      description: lesson.summary,
      images: [cover ?? "/brand/og-image.png"],
    },
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
  const coverAlt = lessonCoverAlt(lesson);
  const nextLesson = getNextLessonInSeries(slug);
  const isDocs = lesson.layout === "docs" && (lesson.docsNav?.length ?? 0) > 0;
  const firstNavId = lesson.docsNav?.[0]?.id;
  const { before: docsPrelude, after: docsSections } =
    isDocs && firstNavId
      ? splitAtHeadingId(segments, firstNavId)
      : { before: [] as typeof segments, after: segments };

  const meta = (
    <>
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
        {isDocs ? " · Reference" : ""}
      </p>
      {lesson.parts && lesson.parts.length > 1 ? (
        <LessonPartsNav parts={lesson.parts} currentSlug={lesson.slug} />
      ) : null}
      <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
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
    </>
  );

  const cover = coverSrc ? (
    <div
      className={
        lesson.coverTight
          ? "lesson-cover mt-6 -mx-4 overflow-hidden sm:mx-0 dark:rounded-md dark:bg-[#f4f0e6] dark:px-3 dark:py-3 sm:dark:px-5"
          : "lesson-cover mt-8 -mx-4 sm:mx-0 dark:rounded-md dark:bg-[#f4f0e6] dark:px-3 dark:py-5 sm:dark:px-5"
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={coverSrc}
        alt={coverAlt}
        width={1200}
        height={lesson.coverTight ? 400 : 630}
        className={
          lesson.coverTight
            ? "aspect-[3/1] h-auto w-full object-cover object-center"
            : "h-auto w-full object-contain"
        }
        decoding="async"
        fetchPriority="high"
      />
    </div>
  ) : null;

  const footer = (
    <>
      <LegacyComments comments={comments} />
      <GiscusComments />

      <div className="mt-10 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        {nextLesson ? (
          <Link href={`/lessons/${nextLesson.slug}`} className="hero-cta-primary">
            Continue: {nextLesson.title}
          </Link>
        ) : (
          <Link href="/challenge/1" className="hero-cta-primary">
            Try a related challenge
          </Link>
        )}
      </div>
    </>
  );

  if (isDocs) {
    return (
      <main className="w-full flex-1 px-4 py-12">
        <JsonLd data={lessonJsonLd(lesson)} />
        <div className="mx-auto max-w-3xl">
          {meta}
          {cover}
          {docsPrelude.length > 0 ? (
            <LessonBody segments={docsPrelude} className="mt-8" />
          ) : null}
        </div>

        {/*
          Body stays max-w-3xl (aligned with title/cover). On xl+, the docs rail
          hangs in the left margin and starts at the first TOC heading.
        */}
        <div className="relative mx-auto mt-10 max-w-3xl">
          <aside className="absolute inset-y-0 right-full hidden w-44 pr-10 xl:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
              <LessonDocsNav
                items={lesson.docsNav!}
                title="On this page"
                variant="rail"
              />
            </div>
          </aside>

          <div className="mb-8 xl:hidden">
            <LessonDocsNav
              items={lesson.docsNav!}
              title="On this page"
              variant="mobile"
            />
          </div>

          <LessonBody
            segments={docsSections}
            className="mt-0 [&>:first-child]:mt-0"
          />
          {footer}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
      <JsonLd data={lessonJsonLd(lesson)} />
      {meta}
      {cover}
      <LessonBody segments={segments} />
      {footer}
    </main>
  );
}
