import Image from "next/image";
import Link from "next/link";
import type { Lesson } from "@/lib/types/lesson";

type LessonCardProps = {
  lesson: Lesson;
  priority?: boolean;
};

function lessonLabel(lesson: Lesson): string {
  if (lesson.exercise) return `Ex ${lesson.exercise}`;
  if (lesson.krChapter) return `Ch ${lesson.krChapter}`;
  if (lesson.badge) return lesson.badge;
  return "Lesson";
}

export function LessonCard({ lesson, priority = false }: LessonCardProps) {
  const coverSrc = lesson.coverImage
    ? `/lessons/${lesson.slug}/images/${lesson.coverImage}`
    : null;

  return (
    <Link
      href={`/lessons/${lesson.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-colors hover:border-[#ff8a1f]/60 dark:border-amber-900/40 dark:bg-zinc-900/90 dark:shadow-[0_24px_64px_rgba(0,0,0,0.55)] dark:hover:border-[#ff8a1f]/50"
    >
      <div className="relative aspect-[1200/630] overflow-hidden bg-md-surface-container-lowest dark:bg-[#f4f0e6]">
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-contain"
            priority={priority}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-md-surface-container-low dark:bg-md-surface-container">
            <span className="font-mono text-sm tracking-wide text-[#ff8a1f]">
              {lessonLabel(lesson)}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[0.7rem] tracking-wide text-[#ff8a1f]">
            {lessonLabel(lesson)}
          </p>
          <p className="text-xs tracking-wide text-zinc-400 uppercase dark:text-zinc-500">
            {lesson.difficulty}
          </p>
        </div>
        <h2 className="mt-3 font-medium text-zinc-950 dark:text-zinc-50">
          {lesson.title}
        </h2>
        <p className="mt-1 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
          {lesson.summary}
        </p>
      </div>
    </Link>
  );
}
