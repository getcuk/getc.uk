import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChallengeShell } from "@/components/challenge/challenge-shell";
import { ChallengeWorkspace } from "@/components/challenge/challenge-workspace";
import { getChallengeById } from "@/lib/content/challenges";
import { SITE_NAME } from "@/lib/constants";
import { absoluteUrl } from "@/lib/seo/json-ld";

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

  const url = absoluteUrl(`/challenge/${challenge.id}`);
  const title = `${challenge.title} challenge`;
  const description = `${challenge.summary} Practice C in the browser on getc.uk.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/challenge/${challenge.id}`,
    },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url,
      siteName: SITE_NAME,
      title: `${title} · ${SITE_NAME}`,
      description,
      images: [
        {
          url: "/brand/og-image.png",
          width: 1200,
          height: 630,
          alt: "get c",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${SITE_NAME}`,
      description,
      images: ["/brand/og-image.png"],
    },
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
