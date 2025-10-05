"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Link2, 
  Search, 
  Plus, 
  Sparkles,
  TrendingUp,
  Calendar,
  Database,
  Layers,
  Clock,
  Tag,
  ArrowUpRight,
  Filter
} from "lucide-react";

// Dummy data based on spec.md
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

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [userItems, setUserItems] = useState<typeof dummyVaultItems>([]);

  // Load items from localStorage on mount
  useEffect(() => {
    const loadUserItems = () => {
      try {
        const stored = localStorage.getItem("vaultItems");
        if (stored) {
          const items = JSON.parse(stored);
          setUserItems(items);
        }
      } catch (error) {
        console.error("Error loading vault items:", error);
      }
    };
    loadUserItems();
  }, []);

  // Get current date and time
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const getTimeOfDay = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };

  // Combine user items with dummy data
  const allVaultItems = [...userItems, ...dummyVaultItems];

  // Filter vault items
  const filteredItems = allVaultItems.filter((item) => {
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = activeFilter === "All" || item.category === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Count items by category
  const notesCount = allVaultItems.filter(item => item.category === "Notes").length;
  const mediaCount = allVaultItems.filter(item => item.category === "Media").length;
  const tasksCount = allVaultItems.filter(item => item.category === "Tasks").length;
  const linksCount = allVaultItems.filter(item => item.category === "Links").length;

  return (
    <section className="flex flex-col w-full min-h-screen bg-slate-50 dark:bg-neutral-950">
      <div className="w-full max-w-[1400px] mx-auto px-6 py-8 md:px-8 md:py-10">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                {currentDate}
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                Good {getTimeOfDay()}
              </h1>
              <p className="text-base text-slate-600 dark:text-slate-400">
                Your intelligent vault
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Link href="/dashboard/chat">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-lg hover:bg-slate-50 dark:hover:bg-neutral-700 transition-all font-medium text-sm text-slate-700 dark:text-slate-200">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Twin</span>
                </button>
              </Link>
              <Link href="/dashboard/upload">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-all font-semibold text-sm">
                  <Plus className="w-4 h-4" />
                  <span>Add Content</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search your vault..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all text-sm placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="Total Items" 
            value={dummyVaultItems.length.toString()} 
            icon={<Database className="w-4 h-4" />}
          />
          <StatCard 
            title="This Week" 
            value="5" 
            icon={<Calendar className="w-4 h-4" />}
          />
          <StatCard 
            title="Categories" 
            value="4" 
            icon={<Layers className="w-4 h-4" />}
          />
          <StatCard 
            title="Storage" 
            value="2.3 GB" 
            icon={<TrendingUp className="w-4 h-4" />}
          />
        </div>

        {/* Content Type Filters */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mr-2">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter:</span>
          </div>
          <FilterTab 
            label="All" 
            count={dummyVaultItems.length} 
            isActive={activeFilter === "All"}
            onClick={() => setActiveFilter("All")}
          />
          <FilterTab 
            label="Notes" 
            count={notesCount} 
            isActive={activeFilter === "Notes"}
            onClick={() => setActiveFilter("Notes")}
            icon={<FileText className="w-3.5 h-3.5" />}
          />
          <FilterTab 
            label="Media" 
            count={mediaCount} 
            isActive={activeFilter === "Media"}
            onClick={() => setActiveFilter("Media")}
            icon={<ImageIcon className="w-3.5 h-3.5" />}
          />
          <FilterTab 
            label="Tasks" 
            count={tasksCount} 
            isActive={activeFilter === "Tasks"}
            onClick={() => setActiveFilter("Tasks")}
            icon={<Clock className="w-3.5 h-3.5" />}
          />
          <FilterTab 
            label="Links" 
            count={linksCount} 
            isActive={activeFilter === "Links"}
            onClick={() => setActiveFilter("Links")}
            icon={<Link2 className="w-3.5 h-3.5" />}
          />
        </div>

        {/* Vault Items Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Recent Items
              <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                ({filteredItems.length})
              </span>
            </h2>
            <button className="text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 flex items-center gap-1 transition-colors">
              View all
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          
          {/* Vault Items Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredItems.map((item, index) => (
                <VaultItemCard key={item.id} item={item} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-2xl border border-dashed border-slate-300 dark:border-neutral-700">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center">
                <Search className="w-8 h-8 text-slate-400 dark:text-neutral-500" />
              </div>
              <p className="text-slate-600 dark:text-slate-300 font-semibold mb-1">No items found</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FilterTab({
  label,
  count,
  isActive = false,
  onClick,
  icon,
}: {
  label: string;
  count: number;
  isActive?: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap text-sm font-medium ${
        isActive
          ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
          : "bg-white dark:bg-neutral-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-neutral-700 border border-slate-200 dark:border-neutral-700"
      }`}
    >
      {icon && (
        <span className={isActive ? "text-white dark:text-slate-900" : "text-slate-400"}>
          {icon}
        </span>
      )}
      <span>{label}</span>
      <span className="text-xs text-slate-500 dark:text-slate-400">
        {count}
      </span>
    </button>
  );
}

function StatCard({ 
  title, 
  value, 
  icon,
}: { 
  title: string; 
  value: string; 
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-lg p-4 hover:border-slate-300 dark:hover:border-neutral-700 transition-all">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{title}</p>
        {icon && (
          <div className="text-slate-400 dark:text-slate-500">
            {icon}
          </div>
        )}
      </div>
      <span className="text-2xl font-bold text-slate-900 dark:text-white">
        {value}
      </span>
    </div>
  );
}

function VaultItemCard({ item, index }: { item: typeof dummyVaultItems[0]; index: number }) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "note": return <FileText className="w-5 h-5" />;
      case "image": return <ImageIcon className="w-5 h-5" />;
      case "video": return <Video className="w-5 h-5" />;
      case "link": return <Link2 className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Notes": return "bg-blue-500";
      case "Media": return "bg-purple-500";
      case "Tasks": return "bg-emerald-500";
      case "Links": return "bg-orange-500";
      default: return "bg-slate-500";
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "Notes": return "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "Media": return "bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      case "Tasks": return "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      case "Links": return "bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800";
      default: return "bg-slate-50 dark:bg-slate-950/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-lg p-5 hover:border-slate-300 dark:hover:border-neutral-700 hover:shadow-md transition-all cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg ${getCategoryColor(item.category)} flex items-center justify-center text-white`}>
          {getTypeIcon(item.type)}
        </div>
        <span className={`text-xs px-2 py-1 rounded-md font-medium ${getCategoryBadgeColor(item.category)}`}>
          {item.category}
        </span>
      </div>
      
      <h3 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-1">
        {item.title}
      </h3>
      
      {item.text && (
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
          {item.text}
        </p>
      )}
      
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-neutral-800">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span>{formatDate(item.createdAt)}</span>
        </div>
        <div className="flex gap-1.5">
          {item.tags.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
