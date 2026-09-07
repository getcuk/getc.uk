import Image from "next/image";
import Link from "next/link";
import { getFirstChallengePath } from "@/lib/content/challenges";

export function NotFoundView() {
  return (
    <main className="hero-stage relative isolate flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="not-found-copy page-gutter relative z-10 flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto">
        <div className="not-found-copy-inner mx-auto my-auto w-full max-w-3xl">
          <Link
            href="/"
            className="md-interactive -ml-3 inline-flex rounded-full px-3 py-2 text-sm font-medium text-md-primary"
          >
            ← Home
          </Link>
          <p className="not-found-kicker mt-4 font-mono text-xs tracking-[0.16em] text-md-primary uppercase">
            EOF · 404
          </p>
          <div
            className="not-found-bulb pointer-events-none max-w-full select-none"
            aria-hidden="true"
          >
            <Image
              src="/brand/bulb-with-human-brain.svg"
              alt=""
              width={420}
              height={420}
              className="h-auto max-w-full opacity-[0.14] dark:opacity-[0.22]"
              sizes="(max-width: 640px) 42vw, (max-width: 1024px) 28vw, 18rem"
              priority
            />
          </div>
          <h1 className="font-display text-3xl font-medium tracking-tight text-md-on-surface sm:text-4xl">
            This page could not be found
          </h1>
          <p className="not-found-lede mt-4 max-w-xl text-lg leading-relaxed text-md-on-surface-variant">
            <code className="font-mono text-md-primary">getc()</code> returns{" "}
            <code className="font-mono text-md-on-surface">EOF</code> when there
            is nothing left to read. This address is not a lesson or a
            challenge on getc.uk.
          </p>
          <div className="not-found-actions mt-8 flex flex-wrap gap-3">
            <Link href="/lessons" className="hero-cta-primary md-interactive">
              Browse lessons
            </Link>
            <Link
              href={getFirstChallengePath()}
              className="setup-read-btn md-interactive"
            >
              Try a challenge
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
