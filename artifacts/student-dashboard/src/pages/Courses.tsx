import { useState, useMemo } from "react";
import { useListCourses } from "@workspace/api-client-react";
import { Sidebar } from "@/components/Sidebar";
import { CourseCard } from "@/components/CourseCard";
import { SkeletonTile } from "@/components/SkeletonTile";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

type FilterTab = "all" | "in-progress" | "completed" | "not-started";

const TABS: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "in-progress", label: "In Progress" },
  { id: "completed", label: "Completed" },
  { id: "not-started", label: "Not Started" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 22 } },
};

export default function Courses() {
  const { data: courses, isLoading, isError } = useListCourses();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filtered = useMemo(() => {
    if (!courses) return [];
    return courses.filter((c) => {
      const matchesSearch = c.title.toLowerCase().includes(query.toLowerCase());
      const matchesTab =
        activeTab === "all" ? true :
        activeTab === "in-progress" ? c.progress > 0 && c.progress < 100 :
        activeTab === "completed" ? c.progress >= 100 :
        activeTab === "not-started" ? c.progress === 0 :
        true;
      return matchesSearch && matchesTab;
    });
  }, [courses, query, activeTab]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />

      <main className="flex-1 md:ml-20 lg:ml-64 p-4 md:p-8 lg:p-10 pb-24 md:pb-10">

        {/* Header */}
        <header className="mb-7">
          <h2 className="text-2xl font-bold tracking-tight">Courses</h2>
          <p className="text-white/40 mt-1 text-sm">
            {courses ? `${courses.length} courses in your library` : "Your active learning tracks"}
          </p>
        </header>

        {/* Search + Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-7">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
            <input
              type="text"
              placeholder="Search courses..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white/4 border border-white/8 rounded-xl pl-9 pr-9 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-primary/50 focus:bg-white/6 transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-white/4 border border-white/8 rounded-xl p-1 w-fit">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${activeTab === tab.id ? "text-primary" : "text-white/40 hover:text-white/70"}`}>
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {isError && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400 mb-6">
            Failed to load courses. Please try again.
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonTile key={i} className="h-72" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-white/20" />
            </div>
            <p className="text-white/50 font-medium">No courses found</p>
            <p className="text-white/25 text-sm mt-1">Try adjusting your search or filter</p>
          </motion.div>
        ) : (
          <motion.div
            key={`${query}-${activeTab}`}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <AnimatePresence>
              {filtered.map((course) => (
                <motion.div key={course.id} variants={item} layout>
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </div>
  );
}
