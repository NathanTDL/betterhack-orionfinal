"use client";

import { FileText, Image as ImageIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Project Ideas Card */}
      <VaultCard
        icon={<FileText className="w-12 h-12 text-cyan-400" />}
        title="Project Ideas"
        timestamp="2 hours ago"
        type="note"
        gradient="from-slate-800 to-slate-900"
      />

      {/* Meeting Screenshot Card */}
      <VaultCard
        icon={null}
        title="Meeting Screenshot"
        timestamp="5 hours ago"
        type="image"
        gradient="from-blue-600 to-purple-600"
      />

      {/* Add New Card */}
      <div className="relative group cursor-pointer">
        <div className="h-48 rounded-2xl border-2 border-dashed border-muted-foreground/30 hover:border-cyan-500/50 transition-all flex items-center justify-center bg-muted/20 hover:bg-muted/40">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-3">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Add to Vault</p>
          </div>
        </div>
        {/* Floating action button */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            className="rounded-full w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function VaultCard({
  icon,
  title,
  timestamp,
  type,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  timestamp: string;
  type: "note" | "image" | "video";
  gradient: string;
}) {
  return (
    <div className="relative group cursor-pointer">
      <div
        className={`h-48 rounded-2xl bg-gradient-to-br ${gradient} p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform shadow-lg`}
      >
        <div className="flex items-start justify-between">
          {icon}
          <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-sm text-white/70">{timestamp}</p>
        </div>
      </div>
      {/* Floating action button */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="icon"
          className="rounded-full w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0"
        >
          <Plus className="w-4 h-4 text-white" />
        </Button>
      </div>
    </div>
  );
}
