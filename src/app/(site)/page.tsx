import Image from "next/image";
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
          <div className="hero-copy relative flex max-w-xl flex-col justify-center lg:pb-4">
            <div
              className="hero-bulb pointer-events-none absolute -top-6 -left-8 select-none sm:-top-10 sm:-left-12 lg:-top-16 lg:-left-20"
              aria-hidden="true"
            >
              <Image
                src="/brand/bulb-with-human-brain.svg"
                alt=""
                width={420}
                height={420}
                className="h-auto w-[min(18rem,55vw)] opacity-[0.14] sm:w-[min(22rem,48vw)] dark:opacity-[0.22]"
                priority
              />
            </div>

            <div className="relative">
              <p className="font-mono text-xs tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-400">
                {SITE_TAGLINE}
              </p>
              <h1 className="mt-4 font-display text-[clamp(1.75rem,4.2vw,2.85rem)] leading-[1.1] font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                Learn C — so you shape systems, not just prompt them.
              </h1>
              <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
                AI can write code. C teaches you memory, pointers, and how
                software really runs — so you can audit, debug, and build from
                the metal up. Free K&amp;R exercises and challenges by Krishan.
              </p>
              <p className="mt-3 max-w-md font-mono text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                Named after the{" "}
                <code className="text-[#ff8a1f]">getc()</code> function — one
                character at a time. We teach C the same way.
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
          </div>

          <div className="hero-visual relative -mx-4 flex min-h-[32rem] flex-col sm:min-h-[34rem] lg:mx-0 lg:min-h-0 lg:self-stretch">
            <div className="min-h-0 flex-1">
              <HeroTerminal />
            </div>
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
