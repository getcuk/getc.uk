import Link from "next/link";
import type { Lesson } from "@/lib/types/lesson";

type LessonCardProps = {
  lesson: Lesson;
};

export function LessonCard({ lesson }: LessonCardProps) {
  return (
    <Link
      href={`/lessons/${lesson.slug}`}
      className="block rounded-lg border border-zinc-200 p-4 transition-colors hover:border-zinc-400"
    >
      <h2 className="font-medium text-zinc-950">{lesson.title}</h2>
      <p className="mt-1 text-sm text-zinc-600">{lesson.summary}</p>
      <p className="mt-3 text-xs uppercase tracking-wide text-zinc-400">
        {lesson.difficulty}
      </p>
    </Link>
  );
}
