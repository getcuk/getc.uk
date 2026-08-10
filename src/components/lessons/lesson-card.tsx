import Link from "next/link";
import type { Lesson } from "@/lib/types/lesson";

type LessonCardProps = {
  lesson: Lesson;
};

export function LessonCard({ lesson }: LessonCardProps) {
  return (
    <Link
      href={`/lessons/${lesson.slug}`}
      className="group block rounded-lg border border-zinc-200 p-4 transition-colors hover:border-[#ff8a1f]/60 dark:border-zinc-800 dark:hover:border-[#ff8a1f]/50"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[0.7rem] tracking-wide text-[#ff8a1f]">
          {lesson.exercise
            ? `Ex ${lesson.exercise}`
            : lesson.badge
              ? lesson.badge
              : "Lesson"}
        </p>
        <p className="text-xs tracking-wide text-zinc-400 uppercase dark:text-zinc-500">
          {lesson.difficulty}
        </p>
      </div>
      <h2 className="mt-3 font-medium text-zinc-950 dark:text-zinc-50">
        {lesson.title}
      </h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        {lesson.summary}
      </p>
    </Link>
  );
}