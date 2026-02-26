import { ImageResponse } from "next/og"
import { getAllSlugs, getToolBySlug } from "@/lib/tools"

export const alt = "System Prompt"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  const name = tool?.name ?? slug
  const category = tool?.category ?? "AI Tool"
  const fileCount = tool?.files.length ?? 0
  const fileLabel = `${fileCount} file${fileCount !== 1 ? "s" : ""} \u2014 ai.caterpi11ar.com`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "8px 24px",
            borderRadius: "9999px",
            backgroundColor: "#30363d",
            color: "#8b949e",
            fontSize: "20px",
            fontWeight: 500,
            marginBottom: "24px",
          }}
        >
          {category}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "64px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            textAlign: "center",
            maxWidth: "900px",
          }}
        >
          {name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "32px",
            color: "#58a6ff",
            marginTop: "16px",
          }}
        >
          System Prompt
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "22px",
            color: "#8b949e",
            marginTop: "32px",
          }}
        >
          {fileLabel}
        </div>
      </div>
    ),
    { ...size }
  )
}
