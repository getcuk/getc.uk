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
    <div className="flex h-dvh flex-col overflow-hidden bg-md-surface text-md-on-surface">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-md-outline-variant bg-md-surface-container-lowest px-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <Logo size={1.55} />
          <span className="hidden text-md-outline sm:inline">/</span>
          <p className="truncate font-mono text-sm text-md-on-surface-variant">
            challenge/{challengeId}
            <span className="text-md-outline"> — </span>
            <span className="text-md-on-surface">{title}</span>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <ThemeToggle />
          <Link
            href="/lessons"
            className="md-interactive shrink-0 rounded-full px-3 py-2 font-mono text-xs text-md-on-surface-variant"
          >
            Exit
          </Link>
        </div>
      </header>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
