import type { MetadataRoute } from "next"
import { getAllSlugs } from "@/lib/tools"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ai.caterpi11ar.com"

  const toolPages = getAllSlugs().map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...toolPages,
  ]
}
