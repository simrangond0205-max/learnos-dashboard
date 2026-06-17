import { motion } from "framer-motion";

export function SkeletonTile({ className }: { className?: string }) {
  return (
    <motion.div 
      className={`rounded-3xl border border-card-border bg-card/50 overflow-hidden relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_1.5s_infinite] -translate-x-full" />
    </motion.div>
  );
}
