# System Prompts Playground

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?logo=vercel)](https://ai.caterpi11ar.com)
[![License](https://img.shields.io/github/license/caterpi11ar/system-prompts-playground)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/caterpi11ar/system-prompts-playground?style=social)](https://github.com/caterpi11ar/system-prompts-playground)

简体中文 | [English](./README.md)

> 收录 **30+ 款 AI 工具的系统提示词**，以可搜索、SEO 友好的 Web 应用形式呈现，基于 Next.js 15 和 React 19 构建。

**在线体验：** [ai.caterpi11ar.com](https://ai.caterpi11ar.com)

## 概述

本项目汇集了主流 AI 开发工具（包括 Claude Code、Cursor、Devin、Windsurf、Replit、v0 等）已泄露或公开披露的系统提示词，构建为一个 Markdown 驱动、搜索引擎优化的静态网站。

## 收录的 AI 工具

| 分类 | 工具 |
|------|------|
| **编程助手** | Claude Code、Cursor、Windsurf、Augment Code、CodeBuddy、VSCode Agent、Z.ai Code、Trae |
| **AI 智能体** | Devin AI、Manus Agent、Junie、Traycer AI、Kiro、Amp |
| **应用构建** | v0、Lovable、Replit、Same.dev、Leap.new、Bolt |
| **搜索与对话** | Perplexity、NotionAI、Comet Assistant、Cluely |
| **平台工具** | Google Gemini、Xcode AI、Warp.dev、Qoder、Poke |
| **开源项目** | Cline、Codex CLI、Gemini CLI、Lumo、RooCode |

## 技术栈

- **框架：** Next.js 15（App Router）
- **UI：** React 19 + Tailwind CSS 4 + shadcn/ui
- **内容：** 基于 `docs/` 目录的 Markdown 驱动
- **部署：** Vercel 静态生成（SSG）

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/caterpi11ar/system-prompts-playground.git
cd system-prompts-playground

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 生产构建
pnpm build
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000)。

## 内容结构

```
docs/
├── Anthropic/
│   ├── Claude Code/          # Prompt.txt, Tools.json
│   └── Claude for Chrome/    # Prompt.txt
├── Cursor Prompts/           # Chat、Agent、Background Agent 提示词
├── Devin AI/                 # System Prompt.txt
├── Google/
│   ├── Antigravity/
│   └── Gemini/
├── Open Source prompts/
│   ├── Bolt/
│   ├── Cline/
│   ├── Codex CLI/
│   └── ...
└── ...（30+ 款工具）
```

每个工具目录包含：
- **系统提示词**（`.txt`）— AI 模型的核心指令
- **工具定义**（`.json`）— AI 可调用的工具/函数
- **配置文件**（`.yaml`/`.md`）— 附加设置与文档

## 主要功能

- 全文搜索所有系统提示词
- 基于分类的导航和筛选
- 语法高亮的提示词展示
- 每个 AI 工具的 SEO 优化静态页面
- 响应式设计，支持深色模式
- 静态生成，页面加载极快

## 添加新的 AI 工具

1. 在 `docs/` 下创建目录，放入提示词文件（`.txt`、`.json`、`.yaml`、`.yml`）
2. 在 `lib/tools.ts` 中将其 slug 添加到 `CATEGORY_MAP`、`COLOR_MAP` 和 `ICON_MAP`
3. 将 Logo 放入 `public/logos/`

## 数据来源与致谢

`docs/` 中的系统提示词数据来源于 [@x1xhlol](https://github.com/x1xhlol) 的 [system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools)。感谢其收集和维护 AI 系统提示词的出色工作！

## 许可证

[MIT](LICENSE)
