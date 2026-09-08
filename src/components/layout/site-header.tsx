"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { getFirstChallengePath } from "@/lib/content/challenges";
import { cn } from "@/lib/utils/cn";

function isSectionActive(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

function navLinkClass(active: boolean) {
  return cn(
    "md-interactive rounded-full px-3 py-2",
    active
      ? "bg-md-primary-container text-md-on-primary-container"
      : "text-md-on-surface-variant",
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const lessonsActive = isSectionActive(pathname, "/lessons");
  const challengesActive = isSectionActive(pathname, "/challenge");

  return (
    <header className="relative z-20 bg-md-surface-container/80 backdrop-blur-md">
      <div className="site-shell flex h-16 items-center justify-between">
        <Logo />
        <div className="flex items-center gap-1">
          <nav className="flex items-center text-sm font-medium">
            <Link
              href="/lessons"
              className={navLinkClass(lessonsActive)}
              aria-current={lessonsActive ? "page" : undefined}
            >
              Lessons
            </Link>
            <Link
              href={getFirstChallengePath()}
              className={navLinkClass(challengesActive)}
              aria-current={challengesActive ? "page" : undefined}
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
