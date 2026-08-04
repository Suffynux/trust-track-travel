import type { MetadataRoute } from "next";
import { routes } from "@/lib/routes";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://trust-track-xi.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = [
    { path: "", priority: 1 },
    { path: "/fares", priority: 0.9 },
    { path: "/fleet", priority: 0.8 },
    { path: "/ziyarat", priority: 0.8 },
  ];

  return [
    ...pages.map((p) => ({
      url: `${siteUrl}${p.path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p.priority,
    })),
    ...routes.map((r) => ({
      url: `${siteUrl}/routes/${r.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
