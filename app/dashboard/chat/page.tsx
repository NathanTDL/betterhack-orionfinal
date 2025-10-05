"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { Bot, Send } from "lucide-react";
import Markdown from "react-markdown";
import { useEffect, useState } from "react";

// Dummy data (same as dashboard)
const dummyVaultItems = [
  {
    id: "1",
    type: "note",
    title: "Project Ideas for Q4",
    text: "Brainstorming session notes: 1) Launch AI Twin feature, 2) Improve vault search, 3) Add voice notes support",
    category: "Notes",
    tags: ["work", "planning", "ideas"],
    createdAt: "2025-10-01T10:30:00Z",
    summary: "Quarterly project planning and feature ideas"
  },
  {
    id: "2",
    type: "image",
    title: "Team Meeting Whiteboard",
    contentUrl: "/placeholder-image.jpg",
    category: "Media",
    tags: ["meeting", "team", "whiteboard"],
    createdAt: "2025-10-02T14:20:00Z",
    summary: "Whiteboard snapshot from team brainstorming"
  },
  {
    id: "3",
    type: "note",
    title: "Grocery List",
    text: "Milk, eggs, bread, coffee, fruits, vegetables",
    category: "Tasks",
    tags: ["personal", "shopping"],
    createdAt: "2025-10-03T08:15:00Z",
    summary: "Weekly grocery shopping list"
  },
  {
    id: "4",
    type: "video",
    title: "Product Demo Recording",
    contentUrl: "/placeholder-video.mp4",
    category: "Media",
    tags: ["demo", "product", "presentation"],
    createdAt: "2025-10-03T16:45:00Z",
    summary: "Demo video for investor presentation"
  },
  {
    id: "5",
    type: "link",
    title: "AI Research Paper",
    contentUrl: "https://arxiv.org/example",
    text: "Interesting paper on RAG improvements",
    category: "Links",
    tags: ["research", "ai", "learning"],
    createdAt: "2025-10-04T11:00:00Z",
    summary: "Research paper on retrieval-augmented generation"
  },
  {
    id: "6",
    type: "note",
    title: "Meeting Notes - Client Call",
    text: "Discussed project timeline, budget constraints, and deliverables. Client wants MVP by end of month.",
    category: "Notes",
    tags: ["meeting", "client", "work"],
    createdAt: "2025-10-04T15:30:00Z",
    summary: "Client meeting discussion points"
  },
  {
    id: "7",
    type: "image",
    title: "Design Mockup v2",
    contentUrl: "/placeholder-design.jpg",
    category: "Media",
    tags: ["design", "ui", "mockup"],
    createdAt: "2025-10-05T09:20:00Z",
    summary: "Updated design mockup for dashboard"
  },
  {
    id: "8",
    type: "note",
    title: "Book Recommendations",
    text: "1. Atomic Habits, 2. Deep Work, 3. The Lean Startup",
    category: "Notes",
    tags: ["books", "learning", "personal"],
    createdAt: "2025-10-05T10:45:00Z",
    summary: "Reading list for personal development"
  }
];

export default function Chat() {
  const [vaultData, setVaultData] = useState<typeof dummyVaultItems>([]);

  // Load vault data on mount
  useEffect(() => {
    const loadVaultData = () => {
      try {
        const stored = localStorage.getItem("vaultItems");
        const userItems = stored ? JSON.parse(stored) : [];
        // Combine user items with dummy data
        setVaultData([...userItems, ...dummyVaultItems]);
      } catch (error) {
        console.error("Error loading vault data:", error);
        setVaultData(dummyVaultItems);
      }
    };
    loadVaultData();
  }, []);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 10,
    body: {
      vaultData, // Send vault data with each request
    },
  });

  return (
    <div className="flex flex-col w-full h-[calc(100vh-3.5rem)] bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Your AI Twin</h1>
              <p className="text-xs text-muted-foreground">Powered by your vault</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Chat with Your AI Twin</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Ask questions about your vault, get insights, or just chat. Your AI Twin knows everything you've saved.
              </p>
            </div>
          )}
          
          {messages.map((message, i) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[75%] px-4 py-3 rounded-2xl shadow-sm",
                  message.role === "user"
                    ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-br-md"
                    : "bg-muted/80 text-foreground rounded-bl-md border",
                )}
              >
                {message.parts.map((part) => {
                  switch (part.type) {
                    case "text":
                      return (
                        <div
                          key={`${message.id}-${i}`}
                          className={cn(
                            "prose prose-sm max-w-none",
                            message.role === "user" 
                              ? "prose-invert prose-p:text-white prose-headings:text-white prose-strong:text-white" 
                              : "prose-p:text-foreground prose-headings:text-foreground",
                            "prose-p:my-1 prose-li:my-0.5 prose-ul:my-1 prose-ol:my-1"
                          )}
                        >
                          <Markdown>{part.text}</Markdown>
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-medium">You</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-4">
        <form
          className="max-w-3xl mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <Input
                className="w-full pr-12 py-6 rounded-2xl border-2 focus-visible:ring-cyan-500/50"
                value={input}
                placeholder="Ask your AI Twin anything..."
                onChange={handleInputChange}
              />
            </div>
            <Button 
              type="submit" 
              size="icon"
              className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 flex-shrink-0"
              disabled={!input.trim()}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
