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
      className="md-interactive group flex h-full flex-col overflow-hidden rounded-xl bg-md-surface-container-lowest text-md-on-surface outline outline-1 outline-md-outline-variant hover:outline-md-primary/45"
    >
      <div className="relative aspect-[1200/630] overflow-hidden border-b border-md-outline-variant bg-md-surface-container-lowest dark:bg-md-cover-plate">
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
          <div className="flex h-full items-center justify-center bg-md-surface-container-low">
            <span className="font-mono text-sm tracking-wide text-md-primary">
              {lessonLabel(lesson)}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col bg-md-surface-container-low/50 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[0.7rem] tracking-wide text-md-primary">
            {lessonLabel(lesson)}
          </p>
          <p className="rounded-full bg-md-surface-container-high px-2 py-0.5 text-[0.65rem] tracking-wide text-md-on-surface-variant uppercase">
            {lesson.difficulty}
          </p>
        </div>
        <h2 className="mt-3 font-medium text-md-on-surface">{lesson.title}</h2>
        <p className="mt-1 line-clamp-3 text-sm text-md-on-surface-variant">
          {lesson.summary}
        </p>
      </div>
    </Link>
  );
}
