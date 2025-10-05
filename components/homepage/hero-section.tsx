import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="relative z-10 mx-auto w-full max-w-2xl px-6 lg:px-0">
        <div className="relative text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 mb-6">
            <span className="text-3xl font-bold text-white">A</span>
          </div>
          <h1 className="mx-auto mt-6 max-w-xl text-balance text-5xl font-bold tracking-tight">
            Your Life, Organized by AI
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 mt-6 text-balance text-xl max-w-lg">
            Capture everything. Let AI organize it. Chat with your personal vault and never lose track of what matters.
          </p>
          <div className="flex flex-col items-center gap-3 *:w-full sm:flex-row sm:justify-center sm:*:w-auto">
            <Button asChild variant="default" size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
              <Link href="/dashboard" prefetch={true}>
                <span className="text-nowrap">Start Building Your Vault</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing" prefetch={true}>
                <span className="text-nowrap">View Pricing</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 p-1">
          <div className="bg-background rounded-3xl relative overflow-hidden border shadow-2xl">
            <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 mb-4">
                  <span className="text-4xl font-bold text-white">A</span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">Ark Dashboard</h3>
                <p className="text-slate-300">Your intelligent vault awaits</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
