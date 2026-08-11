import {
  SITE_AUTHOR_FULL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/constants";
import type { Lesson } from "@/lib/types/lesson";

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function lessonCoverUrl(lesson: Lesson): string | undefined {
  if (!lesson.coverImage) return undefined;
  return absoluteUrl(`/lessons/${lesson.slug}/images/${lesson.coverImage}`);
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en-GB",
    publisher: {
      "@type": "Person",
      name: SITE_AUTHOR_FULL,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/brand/logo-mark.svg"),
    founder: {
      "@type": "Person",
      name: SITE_AUTHOR_FULL,
    },
  };
}

export function lessonJsonLd(lesson: Lesson) {
  const url = absoluteUrl(`/lessons/${lesson.slug}`);
  const image = lessonCoverUrl(lesson) ?? absoluteUrl("/brand/og-image.png");

  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    headline: lesson.title,
    name: lesson.title,
    description: lesson.summary,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image,
    datePublished: lesson.publishedAt,
    dateModified: lesson.updatedAt ?? lesson.publishedAt,
    author: {
      "@type": "Person",
      name: SITE_AUTHOR_FULL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: "en-GB",
    learningResourceType: lesson.exercise ? "Exercise" : "Tutorial",
    isAccessibleForFree: true,
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
