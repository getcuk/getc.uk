import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

type ChallengeShellProps = {
  title: string;
  challengeId: string;
  children: ReactNode;
};

export function ChallengeShell({
  title,
  challengeId,
  children,
}: ChallengeShellProps) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex min-w-0 items-center gap-3">
          <Logo size={1.55} />
          <span className="hidden text-zinc-400 sm:inline dark:text-zinc-600">
            /
          </span>
          <p className="truncate font-mono text-sm text-zinc-600 dark:text-zinc-300">
            challenge/{challengeId}
            <span className="text-zinc-400 dark:text-zinc-600"> — </span>
            {title}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/lessons"
            className="font-mono text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300"
          >
            Exit
          </Link>
        </div>
      </header>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
