import Link from "next/link";
import type { LessonPart } from "@/lib/types/lesson";

type LessonPartsNavProps = {
  parts: LessonPart[];
  currentSlug: string;
};

export function LessonPartsNav({ parts, currentSlug }: LessonPartsNavProps) {
  if (parts.length < 2) return null;

  const currentIndex = parts.findIndex((part) => part.slug === currentSlug);
  const partNumber = currentIndex >= 0 ? currentIndex + 1 : 1;

  return (
    <div className="mt-4">
      <p className="font-mono text-xs tracking-[0.14em] text-zinc-500 uppercase dark:text-zinc-400">
        Part {partNumber} of {parts.length}
      </p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {parts.map((part, index) => {
          const active = part.slug === currentSlug;
          const label = `${index + 1} · ${part.label}`;
          return (
            <li key={part.slug}>
              {active ? (
                <span
                  aria-current="page"
                  className="inline-flex rounded-md border border-[#ff8a1f]/50 bg-[#ff8a1f]/10 px-2.5 py-1.5 font-mono text-xs text-[#ff8a1f]"
                >
                  {label}
                </span>
              ) : (
                <Link
                  href={`/lessons/${part.slug}`}
                  className="inline-flex rounded-md border border-zinc-200 px-2.5 py-1.5 font-mono text-xs text-zinc-600 transition-colors hover:border-[#ff8a1f]/40 hover:text-[#ff8a1f] dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-[#ff8a1f]/40 dark:hover:text-[#ff8a1f]"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
