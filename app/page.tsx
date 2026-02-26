import Image from "next/image"
import Link from "next/link"
import { getToolSummaries } from "@/lib/tools"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const tools = getToolSummaries()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          AI System Prompts
        </h1>
        <p className="text-muted-foreground">
          Browse system prompts from {tools.length}+ AI coding assistants,
          agents, and app builders.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {tools.map((tool) => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`}>
            <Badge
              variant="secondary"
              className="px-3 py-1 text-sm font-medium transition-all duration-200 hover:scale-105 cursor-pointer"
              style={{
                backgroundColor: tool.color,
                color: tool.color === "#FACC15" ? "#000000" : "#ffffff",
              }}
            >
              {tool.icon && (
                <Image
                  src={tool.icon}
                  alt={tool.name}
                  width={16}
                  height={16}
                  className="mr-1.5"
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
