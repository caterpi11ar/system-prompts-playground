import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { PromptViewer } from "@/components/prompt-viewer"
import { getAllSlugs, getToolBySlug } from "@/lib/tools"
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
  return {
    title: `${tool.name} System Prompt`,
    description: `View the system prompt and tools for ${tool.name}. ${tool.files.length} file(s) available.`,
  }
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) notFound()

  return (
    <div className="container mx-auto px-4 py-8">
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
    </div>
  )
}
