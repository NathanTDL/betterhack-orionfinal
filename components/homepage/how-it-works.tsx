"use client";

import { ArrowRight, Upload, Sparkles, MessageCircle } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold md:text-5xl mb-4">
            How Ark Works
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Three simple steps to organize your entire life with AI
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Step 1 */}
          <div className="relative">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Capture Everything</h3>
              <p className="text-muted-foreground leading-relaxed">
                Drop in notes, screenshots, images, videos, or links. No folders, no organization needed—just save it.
              </p>
            </div>
            {/* Arrow */}
            <div className="hidden md:block absolute top-10 -right-4 text-cyan-500/30">
              <ArrowRight className="w-8 h-8" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">AI Organizes It</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our AI automatically categorizes, tags, and summarizes everything. Your vault stays perfectly organized without any effort.
              </p>
            </div>
            {/* Arrow */}
            <div className="hidden md:block absolute top-10 -right-4 text-purple-500/30">
              <ArrowRight className="w-8 h-8" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-xl">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Chat & Find</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ask your AI Twin anything. Search instantly. Share your knowledge. Your vault becomes your second brain.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
            <span>Start Building Your Vault</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </section>
  );
}
