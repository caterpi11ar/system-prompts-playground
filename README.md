# System Prompts Playground

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?logo=vercel)](https://ai.caterpi11ar.com)
[![License](https://img.shields.io/github/license/caterpi11ar/system-prompts-playground)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/caterpi11ar/system-prompts-playground?style=social)](https://github.com/caterpi11ar/system-prompts-playground)

[简体中文](./README.zh-CN.md) | English

> A curated collection of **30+ AI tools' system prompts**, presented as a searchable, SEO-friendly web application built with Next.js 15 and React 19.

**Live Demo:** [ai.caterpi11ar.com](https://ai.caterpi11ar.com)

## Overview

This project aggregates leaked and disclosed system prompts from major AI development tools — including Claude Code, Cursor, Devin, Windsurf, Replit, v0, and more — into a markdown-driven static site optimized for search engines.

## Featured AI Tools

| Category | Tools |
|----------|-------|
| **Code Assistants** | Claude Code, Cursor, Windsurf, Augment Code, CodeBuddy, VSCode Agent, Z.ai Code, Trae |
| **AI Agents** | Devin AI, Manus Agent, Junie, Traycer AI, Kiro, Amp |
| **App Builders** | v0, Lovable, Replit, Same.dev, Leap.new, Bolt |
| **Search & Chat** | Perplexity, NotionAI, Comet Assistant, Cluely |
| **Platform Tools** | Google Gemini, Xcode AI, Warp.dev, Qoder, Poke |
| **Open Source** | Cline, Codex CLI, Gemini CLI, Lumo, RooCode |

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19 + Tailwind CSS 4 + shadcn/ui
- **Content**: Markdown-driven from `docs/` directory
- **Deployment**: Vercel with static generation (SSG)

## Getting Started

```bash
# Clone the repo
git clone https://github.com/caterpi11ar/system-prompts-playground.git
cd system-prompts-playground

# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Content Structure

```
docs/
├── Anthropic/
│   ├── Claude Code/          # Prompt.txt, Tools.json
│   └── Claude for Chrome/    # Prompt.txt
├── Cursor Prompts/           # Chat, Agent, Background Agent prompts
├── Devin AI/                 # System Prompt.txt
├── Google/
│   ├── Antigravity/
│   └── Gemini/
├── Open Source prompts/
│   ├── Bolt/
│   ├── Cline/
│   ├── Codex CLI/
│   └── ...
└── ... (30+ tools)
```

Each tool directory contains:
- **System Prompts** (`.txt`) — the core instructions given to AI models
- **Tool Definitions** (`.json`) — available tools/functions the AI can call
- **Configuration** (`.yaml`/`.md`) — additional settings and documentation

## Key Features

- Full-text search across all system prompts
- Category-based navigation and filtering
- Syntax-highlighted prompt display
- SEO-optimized static pages for each AI tool
- Responsive design with dark mode support
- Fast page loads via static site generation

## Adding a New AI Tool

1. Create a directory under `docs/` with prompt files (`.txt`, `.json`, `.yaml`, `.yml`)
2. Add its slug to `CATEGORY_MAP`, `COLOR_MAP`, and `ICON_MAP` in `lib/tools.ts`
3. Place its logo in `public/logos/`

## Data Source & Acknowledgments

The system prompt data in `docs/` is sourced from [system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools) by [@x1xhlol](https://github.com/x1xhlol). Huge thanks for the incredible work of collecting and maintaining these AI system prompts!

## License

[MIT](LICENSE)
