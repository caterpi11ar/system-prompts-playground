"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { ToolFile } from "@/lib/tools"

function CopyButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="outline" size="sm" onClick={handleCopy}>
      {copied ? (
        <>
          <Check className="mr-1 h-3 w-3" />
          Copied
        </>
      ) : (
        <>
          <Copy className="mr-1 h-3 w-3" />
          Copy
        </>
      )}
    </Button>
  )
}

function FileContent({ file }: { file: ToolFile }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{file.name}</span>
        <CopyButton content={file.content} />
      </div>
      <ScrollArea className="h-[70vh] rounded-md border">
        <pre className="p-4 text-sm font-mono leading-relaxed whitespace-pre-wrap break-words">
          {file.content}
        </pre>
      </ScrollArea>
    </div>
  )
}

interface PromptViewerProps {
  files: ToolFile[]
}

export function PromptViewer({ files }: PromptViewerProps) {
  if (files.length === 1) {
    return <FileContent file={files[0]} />
  }

  return (
    <Tabs defaultValue={files[0].name}>
      <TabsList className="flex-wrap h-auto">
        {files.map((f) => (
          <TabsTrigger key={f.name} value={f.name} className="text-xs">
            {f.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {files.map((f) => (
        <TabsContent key={f.name} value={f.name}>
          <FileContent file={f} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
