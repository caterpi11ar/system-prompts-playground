# System Prompts Playground

A curated collection of **30+ AI tools' system prompts**, presented as a searchable, SEO-friendly web application built with Next.js 15 and React 19.

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
- **Deployment**: Vercel-ready with static generation (SSG)

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

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Key Features

- Full-text search across all system prompts
- Category-based navigation and filtering
- Syntax-highlighted prompt display
- SEO-optimized static pages for each AI tool
- Responsive design with dark mode support
- Fast page loads via static site generation

## Data Source & Acknowledgments

The system prompt data in `docs/` is sourced from [system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools) by [@x1xhlol](https://github.com/x1xhlol). Huge thanks for the incredible work of collecting and maintaining these AI system prompts!

## License

Content in `docs/` is sourced from publicly available system prompts. The web application code is proprietary.
