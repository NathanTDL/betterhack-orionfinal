"use client";

import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function SocialProof() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold md:text-5xl mb-4">
            Loved by thousands
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Join people who've already organized their lives with Ark
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <StatCard number="10K+" label="Active Users" />
          <StatCard number="500K+" label="Items Saved" />
          <StatCard number="1M+" label="AI Chats" />
          <StatCard number="4.9★" label="User Rating" />
        </div>

        {/* Testimonials */}
        <div className="grid gap-6 md:grid-cols-3">
          <TestimonialCard
            quote="Ark has completely changed how I organize my life. Everything I need is just a search away!"
            author="Sarah M."
            role="Product Designer"
            gradient="from-cyan-500 to-blue-500"
          />
          <TestimonialCard
            quote="The AI Twin feature is incredible. It's like having a personal assistant who knows everything about me."
            author="James K."
            role="Entrepreneur"
            gradient="from-purple-500 to-pink-500"
          />
          <TestimonialCard
            quote="I've tried so many note apps. Ark is the first one that actually keeps me organized without any effort."
            author="Emily R."
            role="Student"
            gradient="from-green-500 to-emerald-500"
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-2">
        {number}
      </div>
      <div className="text-muted-foreground font-medium">{label}</div>
    </div>
  );
}

function TestimonialCard({
  quote,
  author,
  role,
  gradient,
}: {
  quote: string;
  author: string;
  role: string;
  gradient: string;
}) {
  return (
    <Card className="p-6 relative overflow-hidden hover:shadow-lg transition-all">
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${gradient} opacity-10 rounded-bl-full`} />
      <Quote className="w-8 h-8 text-muted-foreground/20 mb-4" />
      <p className="text-foreground leading-relaxed mb-6">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold`}>
          {author.charAt(0)}
        </div>
        <div>
          <div className="font-semibold">{author}</div>
          <div className="text-sm text-muted-foreground">{role}</div>
        </div>
      </div>
      <div className="flex gap-1 mt-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
    </Card>
  );
}
