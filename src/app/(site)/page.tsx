import Link from "next/link";
import { HeroTerminal } from "@/components/home/hero-terminal";
import { LessonsCarousel } from "@/components/home/lessons-carousel";
import { SetupPath } from "@/components/home/setup-path";
import { getKrLessons, getSetupLessons } from "@/lib/content/lessons";
import { SITE_TAGLINE } from "@/lib/constants";

export default function Home() {
  const setupLessons = getSetupLessons();
  const krLessons = getKrLessons();

  return (
    <main className="flex flex-1 flex-col">
      <section className="hero-stage relative isolate flex min-h-[calc(100svh-8rem)] flex-1 overflow-hidden">
        <div className="hero-atmosphere" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-10 px-4 pt-10 pb-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:items-stretch lg:gap-6 lg:pt-8 lg:pb-10 xl:px-6">
          <div className="hero-copy flex max-w-xl flex-col justify-center lg:pb-4">
            <p className="font-display text-[clamp(3rem,9vw,5.25rem)] leading-[0.88] font-bold tracking-tight text-[#ff8a1f]">
              get c
            </p>
            <p className="mt-3 font-mono text-xs tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-400">
              {SITE_TAGLINE}
            </p>
            <h1 className="mt-6 font-display text-[clamp(1.75rem,4.2vw,2.85rem)] leading-[1.1] font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Tutorials and games for learning C — built from scratch.
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
              Write real C in the browser, run it, and learn by doing — starting
              with hello, world.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/challenge/1" className="hero-cta-primary">
                Try a challenge
              </Link>
              <Link href="/lessons" className="hero-cta-secondary">
                Browse lessons
              </Link>
            </div>
          </div>

          <div className="hero-visual relative -mx-4 min-h-[24rem] sm:min-h-[26rem] lg:mx-0 lg:min-h-0 lg:self-stretch">
            <HeroTerminal />
          </div>
        </div>
      </section>

      <section className="setup-section border-t border-zinc-200/80 py-14 dark:border-zinc-800/80">
        <div className="mx-auto w-full max-w-6xl xl:px-6">
          <SetupPath lessons={setupLessons} />
        </div>
      </section>

      <section className="exercises-section border-t border-zinc-200/80 py-14 dark:border-zinc-800/80">
        <div className="mx-auto w-full max-w-6xl xl:px-6">
          <LessonsCarousel lessons={krLessons} />
          <div className="mt-6 px-4 sm:px-0">
            <Link
              href="/lessons"
              className="font-mono text-sm text-zinc-500 transition-colors hover:text-[#ff8a1f] dark:text-zinc-400"
            >
              View all lessons →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
