import { motion } from "framer-motion";
import { ActivityDay } from "@workspace/api-client-react";

interface ActivityGraphProps {
  activity: ActivityDay[];
}

export function ActivityGraph({ activity }: ActivityGraphProps) {
  // Generate a realistic grid from activity (assuming ~365 days)
  // For demo layout purposes, we'll just render blocks
  
  const getLevelColor = (level: number) => {
    switch(level) {
      case 4: return "bg-primary shadow-[0_0_8px_rgba(99,102,241,0.6)]";
      case 3: return "bg-primary/80";
      case 2: return "bg-primary/50";
      case 1: return "bg-primary/20";
      default: return "bg-white/5 border border-white/5";
    }
  };

  return (
    <motion.article
      className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-6 md:p-8 flex flex-col h-full group"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold tracking-tight">Activity</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map(l => (
              <div key={l} className={`w-3 h-3 rounded-sm ${getLevelColor(l)}`} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      <div className="flex-1 flex items-end">
        <div className="w-full grid grid-flow-col gap-1 auto-cols-max overflow-x-auto pb-2 scrollbar-none mask-edges">
          {/* We'll chunk into columns of 7 for weeks */}
          {Array.from({ length: Math.ceil(activity.length / 7) }).map((_, colIndex) => {
            const days = activity.slice(colIndex * 7, (colIndex + 1) * 7);
            return (
              <div key={colIndex} className="grid grid-rows-7 gap-1">
                {days.map((day, i) => (
                  <motion.div
                    key={day.date}
                    className={`w-3 h-3 md:w-4 md:h-4 rounded-sm transition-colors ${getLevelColor(day.level)}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.01 + colIndex * 0.02 }}
                    title={`${day.date}: ${day.count} contributions`}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
}
