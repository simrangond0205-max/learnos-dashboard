import { motion } from "framer-motion";
import { Flame, Trophy, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import avatarImg from "@/assets/avatar.png";

interface HeroTileProps {
  name: string;
  streakDays: number;
  totalCourses?: number;
  avgProgress?: number;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function HeroTile({ name, streakDays, totalCourses = 4, avgProgress = 0 }: HeroTileProps) {
  const firstName = name.split(" ")[0];

  return (
    <motion.article
      className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#0d0d18] p-7 flex flex-col justify-between h-full min-h-[240px] group"
      whileHover={{ scale: 1.008 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {/* Background glow blobs */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-indigo-600/12 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-600/18 transition-colors duration-700" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top row: greeting + avatar */}
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-white/40 font-medium mb-1">{getGreeting()} 👋</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
            Welcome back,<br />
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              {firstName}
            </span>
          </h1>
          <p className="text-white/40 text-sm mt-2">You're doing great — keep the momentum going.</p>
        </div>

        {/* Avatar */}
        <div className="shrink-0">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/10 shadow-xl">
            <img src={avatarImg} alt={name} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="relative z-10 flex items-center gap-3 mt-6 flex-wrap">
        {/* Streak */}
        <div className="flex items-center gap-2.5 bg-white/4 border border-white/8 rounded-xl px-4 py-2.5">
          <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center">
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-white leading-none">{streakDays}</p>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium">day streak</p>
          </div>
        </div>

        {/* Courses */}
        <div className="flex items-center gap-2.5 bg-white/4 border border-white/8 rounded-xl px-4 py-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
            <Trophy className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-white leading-none">{totalCourses}</p>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium">courses</p>
          </div>
        </div>

        {/* CTA */}
        <Link href="/courses" className="ml-auto">
          <motion.span
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary/80 hover:text-primary cursor-pointer transition-colors"
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            View all courses
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.span>
        </Link>
      </div>
    </motion.article>
  );
}
