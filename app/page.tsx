import Image from "next/image"
import Link from "next/link"
import { getToolSummaries } from "@/lib/tools"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const tools = getToolSummaries()

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 py-16">
      <div className="mb-12 text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          System Prompts Playground
        </h1>
        <p className="text-lg text-muted-foreground">
          Browse system prompts from {tools.length}+ AI coding assistants,
          agents, and app builders.
        </p>
      </div>

      <div className="flex max-w-4xl flex-wrap justify-center gap-3">
        {tools.map((tool) => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`}>
            <Badge
              variant="secondary"
              className="px-4 py-2 text-base font-medium transition-all duration-200 hover:scale-105 cursor-pointer"
              style={{
                backgroundColor: tool.color,
                color: tool.color === "#FACC15" ? "#000000" : "#ffffff",
              }}
            >
              {tool.icon && (
                <Image
                  src={tool.icon}
                  alt={tool.name}
                  width={20}
                  height={20}
                  className="mr-2"
                />
              )}
              {tool.name}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  )
}
