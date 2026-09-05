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
    <main className="flex flex-1 flex-col bg-md-surface">
      <section className="hero-stage relative isolate overflow-hidden">
        <div className="hero-atmosphere" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />

        <div className="site-shell relative z-10 grid grid-cols-1 gap-14 py-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:items-stretch lg:gap-6">
          <div className="hero-copy relative mx-auto w-full max-w-3xl lg:mx-0 lg:min-h-0 lg:max-w-xl">
            <div className="hero-copy-inner flex h-full w-full flex-col items-center text-center">
              <div
                className="hero-bulb pointer-events-none absolute z-0 select-none max-lg:-top-6 max-lg:left-1/2 max-lg:-translate-x-1/2 sm:max-lg:-top-10"
                aria-hidden="true"
              >
                <Image
                  src="/brand/bulb-with-human-brain.svg"
                  alt=""
                  width={420}
                  height={420}
                  className="h-auto w-[min(11rem,33vw)] opacity-[0.14] sm:w-[min(13rem,29vw)] dark:opacity-[0.22]"
                  priority
                />
              </div>

              <div className="relative z-10 w-full shrink-0">
                <p className="text-xs font-medium tracking-[0.08em] text-md-primary uppercase">
                  {SITE_TAGLINE}
                </p>
                <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.12] font-medium tracking-tight text-md-on-surface">
                  Learn C — so you shape systems, not just prompt them.
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-md-on-surface-variant sm:text-lg lg:mx-0 lg:max-w-md">
                  AI can write code. C teaches you memory, pointers, and how
                  software really runs — so you can review, debug, and build from
                  the metal up.
                </p>
                <p className="mx-auto mt-3 max-w-2xl font-mono text-sm leading-relaxed text-md-on-surface-variant lg:mx-0 lg:max-w-md">
                  Named after the <code className="text-md-primary">getc()</code>{" "}
                  function — learning C one character at a time.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <Link
                    href="/challenge/1"
                    className="hero-cta-primary md-interactive"
                  >
                    Try a challenge
                  </Link>
                  <Link
                    href="/lessons"
                    className="hero-cta-secondary md-interactive"
                  >
                    Browse lessons
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-visual relative">
            <HeroTerminal />
          </div>
        </div>
      </section>

      <section className="setup-section py-20 sm:py-28">
        <div className="site-shell">
          <SetupPath lessons={setupLessons} />
        </div>
      </section>

      <section className="exercises-section pt-16 pb-16 sm:pt-20 sm:pb-20">
        <div className="site-shell">
          <LessonsCarousel lessons={krLessons} />
          <div className="mt-8">
            <Link
              href="/lessons"
              className="setup-read-btn border-2 border-orange-300 bg-orange-100 text-[#ff8a1f] dark:border-[#ff8a1f] dark:bg-orange-950 dark:text-[#ff8a1f]"
            >
              View all lessons
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
