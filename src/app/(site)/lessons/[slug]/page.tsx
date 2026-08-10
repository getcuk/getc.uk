import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllLessons, getLessonBySlug } from "@/lib/content/lessons";

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
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) notFound();

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
      <p className="mt-8 rounded-lg border border-dashed border-zinc-300 p-5 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
        Full walkthrough coming next — the source lesson is already imported
        under <code className="font-mono text-xs">content/lessons/{lesson.slug}</code>.
      </p>
      <div className="mt-8">
        <Link href="/challenge/1" className="hero-cta-primary">
          Try a related challenge
        </Link>
      </div>
    </main>
  );
}
