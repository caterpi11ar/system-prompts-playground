import type { Metadata } from "next"
import Script from "next/script"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import "./globals.css"

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://ai.caterpi11ar.com"),
  title: {
    default: "System Prompts Playground — AI Tool System Prompts Collection",
    template: "%s | System Prompts Playground",
  },
  description:
    "Browse and explore system prompts from 40+ AI coding assistants, agents, and app builders including Claude Code, Cursor, Windsurf, Devin, v0, Lovable, and more. View the exact instructions these AI tools follow.",
  keywords: [
    "system prompts",
    "AI system prompts",
    "Claude Code prompt",
    "Cursor prompt",
    "Windsurf prompt",
    "AI coding assistant",
    "LLM prompts",
    "AI agent prompts",
    "prompt engineering",
    "AI tool instructions",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "System Prompts Playground — AI Tool System Prompts Collection",
    description:
      "Browse and explore system prompts from 40+ AI coding assistants, agents, and app builders. View the exact instructions these AI tools follow.",
    type: "website",
    url: "/",
    siteName: "System Prompts Playground",
  },
  twitter: {
    card: "summary_large_image",
    title: "System Prompts Playground",
    description:
      "Browse and explore system prompts from 40+ AI coding assistants, agents, and app builders.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KYX7F2VJQM"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KYX7F2VJQM');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          <main>{children}</main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
