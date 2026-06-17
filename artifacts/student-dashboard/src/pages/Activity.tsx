import { useGetActivityFeed, useGetDashboardSummary } from "@workspace/api-client-react";
import { Sidebar } from "@/components/Sidebar";
import { ActivityGraph } from "@/components/ActivityGraph";
import { SkeletonTile } from "@/components/SkeletonTile";
import { motion } from "framer-motion";
import { Flame, BookOpen, TrendingUp, Calendar } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
};

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
}

function StatCard({ icon: Icon, label, value, sub }: StatCardProps) {
  return (
    <motion.article
      className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-6 flex flex-col gap-4 group"
      variants={item}
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 50% -20%, hsl(var(--primary)) 0%, transparent 60%)" }} />
      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
        <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
        {sub && <p className="text-xs text-primary/70 mt-1">{sub}</p>}
      </div>
    </motion.article>
  );
}

export default function Activity() {
  const { data: activity, isLoading: loadingActivity } = useGetActivityFeed();
  const { data: summary, isLoading: loadingSummary } = useGetDashboardSummary();

  const isLoading = loadingActivity || loadingSummary;

  const totalContributions = activity?.reduce((sum, d) => sum + d.count, 0) ?? 0;
  const activeDays = activity?.filter((d) => d.count > 0).length ?? 0;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />

      <main className="flex-1 md:ml-20 lg:ml-64 p-4 md:p-8 lg:p-10 pb-24 md:pb-10">
        <header className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Activity</h2>
          <p className="text-muted-foreground mt-1 text-sm">Your learning momentum over the past year</p>
        </header>

        {isLoading ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => <SkeletonTile key={i} className="h-36" />)}
            </div>
            <SkeletonTile className="h-64 w-full" />
          </div>
        ) : (
          <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard icon={Flame} label="Day Streak" value={summary?.streak_days ?? 0} sub="Keep it going!" />
              <StatCard icon={Calendar} label="Active Days" value={activeDays} sub="Last 52 weeks" />
              <StatCard icon={TrendingUp} label="Total Sessions" value={totalContributions} sub="All time" />
              <StatCard icon={BookOpen} label="Avg Progress" value={`${summary?.avg_progress ?? 0}%`} sub="Across all courses" />
            </div>

            <motion.div variants={item}>
              {activity && <ActivityGraph activity={activity} />}
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
