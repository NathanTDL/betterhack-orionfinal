import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { ThemeProvider } from "../components/provider";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
export const metadata: Metadata = {
  title: "Ark - Your AI-Powered Life Vault",
  description:
    "Capture everything. Let AI organize it. Chat with your personal vault and never lose track of what matters. Built with Next.js, AI, and modern web technologies.",
  openGraph: {
    title: "Ark - Your AI-Powered Life Vault",
    description:
      "Capture notes, screenshots, videos, and links into a smart vault. AI automatically organizes your content and lets you chat with your personal AI Twin.",
    url: "ark.app",
    siteName: "Ark",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Ark - Your AI-Powered Life Vault",
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-[-apple-system,BlinkMacSystemFont]antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          forcedTheme="light"
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
