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
      <p className="font-mono text-xs tracking-[0.14em] text-md-on-surface-variant uppercase">
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
                  className="inline-flex rounded-full bg-md-primary-container px-3 py-1.5 font-mono text-xs text-md-on-primary-container"
                >
                  {label}
                </span>
              ) : (
                <Link
                  href={`/lessons/${part.slug}`}
                  className="md-interactive inline-flex rounded-full bg-md-surface-container-high px-3 py-1.5 font-mono text-xs text-md-on-surface-variant"
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
