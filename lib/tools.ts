import fs from "fs"
import path from "path"

export interface ToolFile {
  name: string
  content: string
  extension: string
}

export interface Tool {
  name: string
  slug: string
  category: string
  files: ToolFile[]
  dirPath: string
}

export interface ToolSummary {
  name: string
  slug: string
  category: string
  fileCount: number
  fileNames: string[]
  color: string
  icon: string
}

const DOCS_DIR = path.join(process.cwd(), "docs")

// Directories to skip when scanning
const SKIP_DIRS = new Set([".git", ".github", "assets"])

// Supported file extensions for prompts
const SUPPORTED_EXTENSIONS = new Set([".txt", ".json", ".yaml", ".yml"])

// Category mapping
const CATEGORY_MAP: Record<string, string> = {
  "claude-code": "Code Assistants",
  "claude-code-2-0": "Code Assistants",
  "claude-for-chrome": "AI Assistants",
  "sonnet-4-5-prompt": "AI Assistants",
  "cursor-prompts": "Code Assistants",
  "windsurf": "Code Assistants",
  "augment-code": "Code Assistants",
  "vscode-agent": "Code Assistants",
  "cline": "Code Assistants",
  "codex-cli": "Code Assistants",
  "gemini-cli": "Code Assistants",
  "roocode": "Code Assistants",
  "junie": "Code Assistants",
  "kiro": "Code Assistants",
  "trae": "Code Assistants",
  "amp": "Code Assistants",
  "codebuddy-prompts": "Code Assistants",
  "z-ai-code": "Code Assistants",
  "traycer-ai": "Code Assistants",
  "qoder": "Code Assistants",
  "devin-ai": "AI Agents",
  "manus-agent-tools-and-prompt": "AI Agents",
  "comet-assistant": "AI Agents",
  "emergent": "AI Agents",
  "poke": "AI Agents",
  "v0-prompts-and-tools": "App Builders",
  "lovable": "App Builders",
  "bolt": "App Builders",
  "same-dev": "App Builders",
  "leap-new": "App Builders",
  "replit": "App Builders",
  "orchids-app": "App Builders",
  "lumo": "App Builders",
  "gemini": "AI Assistants",
  "antigravity": "AI Assistants",
  "perplexity": "AI Assistants",
  "notionai": "AI Assistants",
  "dia": "AI Assistants",
  "cluely": "AI Assistants",
  "warp-dev": "AI Assistants",
  "xcode": "Code Assistants",
}

// Brand colors for each tool (slug → hex)
const COLOR_MAP: Record<string, string> = {
  "claude-code": "#D97757",
  "claude-code-2-0": "#D97757",
  "claude-for-chrome": "#D97757",
  "sonnet-4-5-prompt": "#D97757",
  "anthropic": "#D97757",
  "cursor-prompts": "#000000",
  "windsurf": "#0EA5E9",
  "augment-code": "#7C3AED",
  "vscode-agent": "#007ACC",
  "cline": "#22D3EE",
  "codex-cli": "#10A37F",
  "gemini-cli": "#4285F4",
  "gemini": "#4285F4",
  "antigravity": "#4285F4",
  "roocode": "#F97316",
  "junie": "#FF5722",
  "kiro": "#FF9800",
  "trae": "#6366F1",
  "amp": "#EC4899",
  "codebuddy-prompts": "#8B5CF6",
  "z-ai-code": "#1E40AF",
  "traycer-ai": "#06B6D4",
  "qoder": "#14B8A6",
  "devin-ai": "#000000",
  "manus-agent-tools-and-prompt": "#2563EB",
  "comet-assistant": "#F59E0B",
  "emergent": "#10B981",
  "poke": "#EF4444",
  "v0-prompts-and-tools": "#000000",
  "lovable": "#E11D48",
  "bolt": "#F97316",
  "same-dev": "#6D28D9",
  "leap-new": "#0EA5E9",
  "replit": "#F26207",
  "orchids-app": "#D946EF",
  "lumo": "#FACC15",
  "perplexity": "#20B2AA",
  "notionai": "#000000",
  "dia": "#3B82F6",
  "cluely": "#8B5CF6",
  "warp-dev": "#01A4FF",
  "xcode": "#147EFB",
}

// Local logo paths (slug → /logos/filename)
const ICON_MAP: Record<string, string> = {
  "claude-code": "/logos/anthropic.svg",
  "claude-code-2-0": "/logos/anthropic.svg",
  "claude-for-chrome": "/logos/anthropic.svg",
  "sonnet-4-5-prompt": "/logos/anthropic.svg",
  "anthropic": "/logos/anthropic.svg",
  "cursor-prompts": "/logos/cursor.svg",
  "windsurf": "/logos/windsurf.svg",
  "augment-code": "/logos/augment-code.svg",
  "vscode-agent": "/logos/vscode.svg",
  "cline": "/logos/cline.png",
  "codex-cli": "/logos/codex-cli.svg",
  "gemini-cli": "/logos/gemini.svg",
  "gemini": "/logos/gemini.svg",
  "antigravity": "/logos/gemini.svg",
  "roocode": "/logos/roocode.svg",
  "junie": "/logos/junie.svg",
  "kiro": "/logos/kiro.svg",
  "trae": "/logos/trae.png",
  "amp": "/logos/amp.svg",
  "codebuddy-prompts": "/logos/codebuddy.svg",
  "z-ai-code": "/logos/zed.svg",
  "traycer-ai": "/logos/traycer.webp",
  "qoder": "/logos/qoder.svg",
  "devin-ai": "/logos/devin.png",
  "manus-agent-tools-and-prompt": "/logos/manus.svg",
  "comet-assistant": "/logos/comet.png",
  "emergent": "/logos/emergent.ico",
  "poke": "/logos/poke.ico",
  "v0-prompts-and-tools": "/logos/v0.svg",
  "lovable": "/logos/lovable.svg",
  "bolt": "/logos/bolt.svg",
  "same-dev": "",
  "leap-new": "/logos/leap.ico",
  "replit": "/logos/replit.svg",
  "orchids-app": "/logos/orchids.svg",
  "lumo": "/logos/lumo.svg",
  "perplexity": "/logos/perplexity.svg",
  "notionai": "/logos/notion.svg",
  "dia": "/logos/dia.svg",
  "cluely": "/logos/cluely.png",
  "warp-dev": "/logos/warp.svg",
  "xcode": "/logos/xcode.svg",
}

function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? "#000000" : "#ffffff"
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function getPromptFiles(dirPath: string): ToolFile[] {
  const files: ToolFile[] = []
  const entries = fs.readdirSync(dirPath)
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry)
    const stat = fs.statSync(fullPath)
    if (!stat.isFile()) continue
    const ext = path.extname(entry).toLowerCase()
    if (!SUPPORTED_EXTENSIONS.has(ext)) continue
    let content = fs.readFileSync(fullPath, "utf-8")
    if (ext === ".json") {
      try {
        content = JSON.stringify(JSON.parse(content), null, 2)
      } catch {
        // keep raw content if not valid JSON
      }
    }
    files.push({ name: entry, content, extension: ext })
  }
  return files.sort((a, b) => a.name.localeCompare(b.name))
}

function scanDirectory(
  basePath: string,
  tools: Tool[],
  parentName?: string
): void {
  const entries = fs.readdirSync(basePath)
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry)) continue
    const fullPath = path.join(basePath, entry)
    const stat = fs.statSync(fullPath)
    if (!stat.isDirectory()) continue

    // Check if this directory has prompt files directly
    const files = getPromptFiles(fullPath)

    // Also check for subdirectories that have prompt files
    const subEntries = fs.readdirSync(fullPath)
    const hasSubDirs = subEntries.some((sub) => {
      const subPath = path.join(fullPath, sub)
      return (
        fs.statSync(subPath).isDirectory() &&
        !SKIP_DIRS.has(sub) &&
        getPromptFiles(subPath).length > 0
      )
    })

    if (files.length > 0 && !hasSubDirs) {
      // Leaf directory with files — it's a tool
      const displayName = parentName ? `${parentName} ${entry}` : entry
      const slug = slugify(entry)
      tools.push({
        name: displayName,
        slug,
        category: CATEGORY_MAP[slug] || "Other",
        files,
        dirPath: fullPath,
      })
    } else if (files.length > 0 && hasSubDirs) {
      // Has both files and subdirectories — treat files as a standalone tool
      const slug = slugify(entry)
      tools.push({
        name: parentName ? `${parentName} ${entry}` : entry,
        slug,
        category: CATEGORY_MAP[slug] || "Other",
        files,
        dirPath: fullPath,
      })
      // Also recurse into subdirectories
      scanDirectory(fullPath, tools, parentName ? `${parentName} ${entry}` : entry)
    } else {
      // No files here — recurse into subdirectories
      scanDirectory(
        fullPath,
        tools,
        parentName ? `${parentName} ${entry}` : entry
      )
    }
  }
}

let cachedTools: Tool[] | null = null

export function getAllTools(): Tool[] {
  if (cachedTools) return cachedTools
  const tools: Tool[] = []
  scanDirectory(DOCS_DIR, tools)

  // Deduplicate slugs: if two tools share a slug, make them unique
  const slugCount = new Map<string, number>()
  for (const tool of tools) {
    const count = slugCount.get(tool.slug) || 0
    slugCount.set(tool.slug, count + 1)
  }
  const slugIndex = new Map<string, number>()
  for (const tool of tools) {
    if ((slugCount.get(tool.slug) || 0) > 1) {
      const idx = (slugIndex.get(tool.slug) || 0) + 1
      slugIndex.set(tool.slug, idx)
      if (idx > 1) {
        tool.slug = `${tool.slug}-${idx}`
      }
    }
  }

  cachedTools = tools.sort((a, b) => a.name.localeCompare(b.name))
  return cachedTools
}

export function getToolBySlug(slug: string): Tool | undefined {
  return getAllTools().find((t) => t.slug === slug)
}

export function getAllSlugs(): string[] {
  return getAllTools().map((t) => t.slug)
}

export function getToolSummaries(): ToolSummary[] {
  return getAllTools().map(({ name, slug, category, files }) => ({
    name,
    slug,
    category,
    fileCount: files.length,
    fileNames: files.map((f) => f.name),
    color: COLOR_MAP[slug] || "#6B7280",
    icon: ICON_MAP[slug] || "",
  }))
}

export function getAllCategories(): string[] {
  const categories = new Set(getAllTools().map((t) => t.category))
  return Array.from(categories).sort()
}
