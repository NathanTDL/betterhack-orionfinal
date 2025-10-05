import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SectionCards } from "./_components/section-cards";

export default async function Dashboard() {
  const result = await auth.api.getSession({
    headers: await headers(),
  });

  if (!result?.session?.userId) {
    redirect("/sign-in");
  }

  // Get user's first name or default to "there"
  const userName = result?.user?.name?.split(" ")[0] || "there";
  
  // Get current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="flex flex-col items-start justify-start p-4 md:p-6 w-full min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header with personalized greeting */}
        <div className="flex flex-col items-start justify-center gap-1 mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
            <span>Daily Brief</span>
            <span>•</span>
            <span>{currentDate}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Good {getTimeOfDay()}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light">
            {userName}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search your vault..."
              className="w-full pl-12 pr-4 py-4 bg-muted/50 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
            />
          </div>
        </div>

        {/* Content Type Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <ContentTab icon="📄" label="Notes" count={8} />
          <ContentTab icon="🎥" label="Videos" count={5} />
          <ContentTab icon="🎤" label="Voice" count={3} />
          <ContentTab label="All" count={12} isActive />
        </div>

        {/* Your Vault Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Your Vault</h2>
          <SectionCards />
        </div>
      </div>
    </section>
  );
}

function getTimeOfDay(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 18) return "Afternoon";
  return "Evening";
}

function ContentTab({
  icon,
  label,
  count,
  isActive = false,
}: {
  icon?: string;
  label: string;
  count: number;
  isActive?: boolean;
}) {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "bg-muted/50 hover:bg-muted text-muted-foreground"
      }`}
    >
      {icon && <span>{icon}</span>}
      <span className="font-medium">{label}</span>
      <span className="text-sm opacity-70">({count})</span>
    </button>
  );
}
