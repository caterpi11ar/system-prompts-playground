import { ImageResponse } from "next/og"

export const alt = "System Prompts Playground — Browse AI tool system prompts"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
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
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            System Prompts Playground
          </div>
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#8b949e",
            maxWidth: "800px",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Browse system prompts from 40+ AI coding assistants, agents, and app
          builders
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "48px",
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: "900px",
          }}
        >
          {[
            { name: "Claude Code", color: "#D97757" },
            { name: "Cursor", color: "#6b7280" },
            { name: "Windsurf", color: "#0EA5E9" },
            { name: "Devin", color: "#6b7280" },
            { name: "v0", color: "#6b7280" },
            { name: "Lovable", color: "#E11D48" },
            { name: "Bolt", color: "#F97316" },
            { name: "Codex CLI", color: "#10A37F" },
          ].map((tool) => (
            <div
              key={tool.name}
              style={{
                padding: "8px 20px",
                borderRadius: "9999px",
                backgroundColor: tool.color,
                color: "#ffffff",
                fontSize: "18px",
                fontWeight: 500,
              }}
            >
              {tool.name}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
