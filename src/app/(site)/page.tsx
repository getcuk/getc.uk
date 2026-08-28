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
      <section className="hero-stage relative isolate overflow-hidden">
        <div className="hero-atmosphere" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />

        <div className="site-shell relative z-10 grid grid-cols-1 gap-14 py-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:items-center lg:gap-6">
          <div className="hero-copy relative mx-auto flex w-full max-w-3xl flex-col items-center text-center lg:mx-0 lg:max-w-xl lg:items-start lg:text-left">
            <div
              className="hero-bulb pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 select-none sm:-top-10 lg:-top-16 lg:left-auto lg:-left-20 lg:translate-x-0"
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

            <div className="relative w-full">
              <p className="font-mono text-xs tracking-[0.18em] text-[#ff8a1f] uppercase">
                {SITE_TAGLINE}
              </p>
              <h1 className="mt-4 font-display text-[clamp(1.75rem,4.2vw,2.85rem)] leading-[1.1] font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                Learn C — so you shape systems, not just prompt them.
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg lg:mx-0 lg:max-w-md dark:text-zinc-400">
                AI can write code. C teaches you memory, pointers, and how
                software really runs — so you can review, debug, and build from
                the metal up.
              </p>
              <p className="mx-auto mt-3 max-w-2xl font-mono text-sm leading-relaxed text-zinc-500 lg:mx-0 lg:max-w-md dark:text-zinc-400">
                Named after the <code className="text-[#ff8a1f]">getc()</code>{" "}
                function — learning C one character at a time.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link href="/challenge/1" className="hero-cta-primary">
                  Try a challenge
                </Link>
                <Link href="/lessons" className="hero-cta-secondary">
                  Browse lessons
                </Link>
              </div>
            </div>
          </div>

          <div className="hero-visual relative lg:self-center">
            <HeroTerminal />
          </div>
        </div>
      </section>

      <section className="setup-section border-t border-zinc-200/80 py-14 dark:border-zinc-800/80">
        <div className="site-shell">
          <SetupPath lessons={setupLessons} />
        </div>
      </section>

      <section className="exercises-section border-t border-zinc-200/80 py-14 dark:border-zinc-800/80">
        <div className="site-shell">
          <LessonsCarousel lessons={krLessons} />
          <div className="mt-6">
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
