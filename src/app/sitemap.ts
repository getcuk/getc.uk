import type { MetadataRoute } from "next";
import { getAllLessons } from "@/lib/content/lessons";
import { SITE_URL } from "@/lib/constants";

function toDate(iso?: string): Date | undefined {
  if (!iso) return undefined;
  const date = new Date(`${iso}T12:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lessons = getAllLessons();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/lessons`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/challenge/1`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const lessonEntries: MetadataRoute.Sitemap = lessons.map((lesson) => ({
    url: `${SITE_URL}/lessons/${lesson.slug}`,
    lastModified:
      toDate(lesson.updatedAt) ?? toDate(lesson.publishedAt) ?? new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...lessonEntries];
}
