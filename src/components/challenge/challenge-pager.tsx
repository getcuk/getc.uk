"use client";

import Link from "next/link";
import {
  challengePath,
  getChallengeNeighbors,
} from "@/lib/content/challenges";

type ChallengePagerProps = {
  challengeId: string;
  nextEnabled: boolean;
};

export function ChallengePager({
  challengeId,
  nextEnabled,
}: ChallengePagerProps) {
  const { previous, next } = getChallengeNeighbors(challengeId);

  if (!previous && !next) return null;

  return (
    <div className="mt-6">
      <nav
        aria-label="Challenge sequence"
        className="flex items-center justify-between gap-3"
      >
        {previous ? (
          <Link
            href={challengePath(previous)}
            aria-label={`Back: ${previous.title}`}
            className="setup-read-btn md-interactive"
          >
            Back
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          nextEnabled ? (
            <Link
              href={challengePath(next)}
              aria-label={`Next: ${next.title}`}
              className="setup-next-btn md-interactive"
            >
              Next
            </Link>
          ) : (
            <button
              type="button"
              disabled
              title="Pass this challenge to continue"
              aria-label={`Next: ${next.title} (pass this challenge to continue)`}
              className="setup-next-btn md-interactive"
            >
              Next
            </button>
          )
        ) : null}
      </nav>
      {next && !nextEnabled ? (
        <p className="mt-3 font-sans text-xs text-md-on-surface-variant">
          Pass this challenge to continue.
        </p>
      ) : null}
    </div>
  );
}
