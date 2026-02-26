import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { PromptViewer } from "@/components/prompt-viewer"
import { getAllSlugs, getToolBySlug, getToolSummaries } from "@/lib/tools"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) return {}

  const title = `${tool.name} System Prompt`
  const description = `Explore the full system prompt for ${tool.name}. See the exact instructions, tools, and rules this ${tool.category.toLowerCase().replace(/s$/, "")} follows. ${tool.files.length} file${tool.files.length !== 1 ? "s" : ""} available.`

  return {
    title,
    description,
    alternates: {
      canonical: `/tools/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/tools/${slug}`,
      siteName: "System Prompts Playground",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) notFound()

  const allTools = getToolSummaries()
  const relatedTools = allTools
    .filter((t) => t.category === tool.category && t.slug !== slug)
    .slice(0, 6)

  const baseUrl = "https://ai.caterpi11ar.com"

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${tool.name} System Prompt`,
    url: `${baseUrl}/tools/${slug}`,
    description: `Explore the full system prompt for ${tool.name}.`,
    isPartOf: {
      "@type": "WebSite",
      name: "System Prompts Playground",
      url: baseUrl,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: `${tool.name} System Prompt`,
          item: `${baseUrl}/tools/${slug}`,
        },
      ],
    },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to all tools
      </Link>

      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">{tool.name}</h1>
        <div className="flex items-center gap-3">
          <Badge variant="secondary">{tool.category}</Badge>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            {tool.files.length} file{tool.files.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <PromptViewer files={tool.files} />

      {relatedTools.length > 0 && (
        <nav className="mt-12 border-t pt-8" aria-label="Related tools">
          <h2 className="mb-4 text-lg font-semibold">
            More {tool.category}
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedTools.map((t) => (
              <Link key={t.slug} href={`/tools/${t.slug}`}>
                <Badge
                  variant="secondary"
                  className="px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:scale-105 cursor-pointer"
                  style={{
                    backgroundColor: t.color,
                    color: t.color === "#FACC15" ? "#000000" : "#ffffff",
                  }}
                >
                  {t.icon && (
                    <Image
                      src={t.icon}
                      alt={t.name}
                      width={16}
                      height={16}
                      className="mr-1.5"
                    />
                  )}
                  {t.name}
                </Badge>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </div>
  )
}
