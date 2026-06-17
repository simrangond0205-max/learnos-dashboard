import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Course } from "@workspace/api-client-react";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const controls = useAnimationControls();
  
  // @ts-ignore
  const Icon = LucideIcons[course.icon_name] || LucideIcons.Book;

  useEffect(() => {
    controls.start({
      width: `${course.progress}%`,
      transition: { duration: 1.5, ease: "easeOut", delay: 0.2 }
    });
  }, [course.progress, controls]);

  return (
    <motion.article
      className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-6 flex flex-col justify-between group h-full min-h-[200px]"
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Background Texture/Mesh */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 50% -20%, hsl(var(--primary)) 0%, transparent 60%)'
      }} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
        boxShadow: 'inset 0 0 40px rgba(99,102,241,0.1)'
      }} />

      <div className="relative z-10 flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner group-hover:border-primary/30 transition-colors">
          <Icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
        </div>
        <div className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground group-hover:text-foreground transition-colors">
          {Math.round(course.progress)}%
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        <h3 className="text-lg font-bold tracking-tight mb-4 group-hover:text-primary transition-colors line-clamp-2">
          {course.title}
        </h3>
        
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-accent relative"
            initial={{ width: "0%" }}
            animate={controls}
          >
            <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
