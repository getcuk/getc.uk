import Link from "next/link";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="relative z-20 bg-md-surface-container/80 backdrop-blur-md">
      <div className="site-shell flex h-16 items-center justify-between">
        <Logo />
        <div className="flex items-center gap-1">
          <nav className="flex items-center text-sm font-medium text-md-on-surface-variant">
            <Link
              href="/lessons"
              className="md-interactive rounded-full px-3 py-2"
            >
              Lessons
            </Link>
            <Link
              href="/challenge/1"
              className="md-interactive rounded-full px-3 py-2"
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
