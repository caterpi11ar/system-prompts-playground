"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun, BookOpen, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors">
          <BookOpen className="h-5 w-5" />
          <span>System Prompts Playground</span>
        </Link>
        <div className="flex items-center gap-1">
          <a
            href="https://github.com/caterpi11ar/system-prompts-playground"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Button>
          </a>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>
    </header>
  )
}
