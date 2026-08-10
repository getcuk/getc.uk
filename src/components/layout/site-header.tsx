import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          {SITE_NAME}
        </Link>
        <nav className="flex items-center gap-4 text-sm text-zinc-600">
          <Link href="/lessons" className="hover:text-zinc-950">
            Lessons
          </Link>
          <Link href="/api/health" className="hover:text-zinc-950">
            API
          </Link>
        </nav>
      </div>
    </header>
  );
}
