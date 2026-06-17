import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface HeroTileProps {
  name: string;
  streakDays: number;
}

export function HeroTile({ name, streakDays }: HeroTileProps) {
  return (
    <motion.article 
      className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 flex flex-col justify-between h-full min-h-[240px] group"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-primary/20 transition-colors duration-500 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/3 group-hover:bg-accent/20 transition-colors duration-500 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-2">
          Welcome back, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            {name}
          </span>
        </h1>
        <p className="text-muted-foreground text-lg">Your mission control for learning.</p>
      </div>

      <div className="relative z-10 flex items-center gap-4 mt-8">
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 shadow-lg backdrop-blur-sm">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-accent fill-accent/40" />
          </div>
          <div>
            <div className="text-2xl font-bold leading-none">{streakDays}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Day Streak</div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
