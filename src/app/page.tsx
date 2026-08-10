import Link from "next/link";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-16">
      <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
        {SITE_NAME}
      </p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
        {SITE_TAGLINE}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-zinc-600">{SITE_DESCRIPTION}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/lessons"
          className="inline-flex h-10 items-center rounded-md bg-zinc-950 px-4 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Browse lessons
        </Link>
        <Link
          href="/api/lessons"
          className="inline-flex h-10 items-center rounded-md border border-zinc-200 px-4 text-sm font-medium hover:bg-zinc-50"
        >
          Lessons API
        </Link>
      </div>
    </main>
  );
}
