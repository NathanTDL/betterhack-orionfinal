"use client";

import { Card } from "@/components/ui/card";
import { 
  Brain, 
  Sparkles, 
  Lock, 
  Zap, 
  MessageCircle, 
  Share2,
  Upload,
  Search,
  Tag
} from "lucide-react";
import * as React from "react";

export default function Features() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background pointer-events-none" />
      
      <div className="relative pt-20 pb-32">
        <div className="mx-auto max-w-6xl px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-cyan-600" />
              <span className="text-sm font-medium text-cyan-600">Powerful Features</span>
            </div>
            <h2 className="text-balance text-4xl font-bold md:text-5xl mb-4">
              Everything you need in one place
            </h2>
            <p className="text-muted-foreground mt-4 text-lg md:text-xl max-w-2xl mx-auto">
              Capture your thoughts, organize your life, and chat with your AI twin—all in a beautiful, intuitive interface.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Brain className="w-6 h-6" />}
              title="AI-Powered Organization"
              description="Your vault automatically categorizes notes, media, and links using advanced AI. No manual sorting needed."
              gradient="from-purple-500 to-pink-500"
            />

            <FeatureCard
              icon={<MessageCircle className="w-6 h-6" />}
              title="Chat with Your AI Twin"
              description="Ask questions about anything you've saved. Your AI Twin knows your vault inside and out."
              gradient="from-cyan-500 to-blue-500"
            />

            <FeatureCard
              icon={<Upload className="w-6 h-6" />}
              title="Capture Anything"
              description="Save notes, screenshots, images, videos, and links. Everything in one secure place."
              gradient="from-green-500 to-emerald-500"
            />

            <FeatureCard
              icon={<Search className="w-6 h-6" />}
              title="Instant Search"
              description="Find anything in seconds with powerful search across all your content, powered by AI."
              gradient="from-orange-500 to-red-500"
            />

            <FeatureCard
              icon={<Tag className="w-6 h-6" />}
              title="Smart Tags"
              description="AI automatically tags and summarizes your content, making it easy to find and organize."
              gradient="from-blue-500 to-indigo-500"
            />

            <FeatureCard
              icon={<Share2 className="w-6 h-6" />}
              title="Share Your Twin"
              description="Create a shareable link to your AI Twin. Let others interact with your knowledge base."
              gradient="from-pink-500 to-rose-500"
            />

            <FeatureCard
              icon={<Lock className="w-6 h-6" />}
              title="Secure & Private"
              description="Your data is encrypted and secure. You own your vault, and only you control access."
              gradient="from-slate-600 to-slate-800"
            />

            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Lightning Fast"
              description="Built for speed. Access your vault instantly from any device, anywhere in the world."
              gradient="from-yellow-500 to-orange-500"
            />

            <FeatureCard
              icon={<Sparkles className="w-6 h-6" />}
              title="Beautiful Design"
              description="A stunning, modern interface designed for mobile and desktop. Your vault, beautifully organized."
              gradient="from-cyan-500 to-teal-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02] border-2 hover:border-cyan-500/50">
      <div className="p-6 space-y-4">
        {/* Icon with gradient background */}
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
          {icon}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Hover effect gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`} />
      </div>
    </Card>
  );
}
