import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChallengeShell } from "@/components/challenge/challenge-shell";
import { ChallengeWorkspace } from "@/components/challenge/challenge-workspace";
import { getChallengeById } from "@/lib/content/challenges";

type ChallengePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ChallengePageProps): Promise<Metadata> {
  const { id } = await params;
  const challenge = getChallengeById(id);
  if (!challenge) {
    return { title: "Challenge not found" };
  }
  return {
    title: challenge.title,
    description: challenge.summary,
  };
}

export default async function ChallengePage({ params }: ChallengePageProps) {
  const { id } = await params;
  const challenge = getChallengeById(id);

  if (!challenge) {
    notFound();
  }

  return (
    <ChallengeShell title={challenge.title} challengeId={challenge.id}>
      <ChallengeWorkspace challenge={challenge} />
    </ChallengeShell>
  );
}
