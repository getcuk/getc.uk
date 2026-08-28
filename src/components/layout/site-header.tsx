import Link from "next/link";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-zinc-200/80 bg-background/70 backdrop-blur-md dark:border-zinc-800/80">
      <div className="site-shell flex h-16 items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-5 text-[0.95rem] text-zinc-600 dark:text-zinc-400">
            <Link
              href="/lessons"
              className="hover:text-zinc-950 dark:hover:text-zinc-50"
            >
              Lessons
            </Link>
            <Link
              href="/challenge/1"
              className="hover:text-zinc-950 dark:hover:text-zinc-50"
            >
              Challenges
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
