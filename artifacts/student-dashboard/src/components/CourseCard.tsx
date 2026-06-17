import { useEffect } from "react";
import { Link } from "wouter";
import { motion, useAnimationControls } from "framer-motion";
import { Clock, BookOpen } from "lucide-react";
import { Course } from "@workspace/api-client-react";

import courseReact from "@/assets/course-react.png";
import courseTypescript from "@/assets/course-typescript.png";
import courseSystemDesign from "@/assets/course-system-design.png";
import courseMl from "@/assets/course-ml.png";

const COURSE_IMAGES: Record<string, string> = {
  code: courseReact,
  layers: courseTypescript,
  cpu: courseSystemDesign,
  brain: courseMl,
};

const COURSE_META: Record<string, { level: string; hours: string; tag: string; tagColor: string }> = {
  code: { level: "Advanced", hours: "14h left", tag: "React", tagColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30" },
  layers: { level: "Intermediate", hours: "22h left", tag: "TypeScript", tagColor: "bg-teal-500/20 text-teal-300 border-teal-500/30" },
  cpu: { level: "Advanced", hours: "8h left", tag: "Architecture", tagColor: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
  brain: { level: "Beginner", hours: "31h left", tag: "ML / AI", tagColor: "bg-pink-500/20 text-pink-300 border-pink-500/30" },
};

const DEFAULT_META = { level: "Intermediate", hours: "12h left", tag: "Course", tagColor: "bg-primary/20 text-primary border-primary/30" };

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const controls = useAnimationControls();
  const coverImage = COURSE_IMAGES[course.icon_name];
  const meta = COURSE_META[course.icon_name] ?? DEFAULT_META;

  useEffect(() => {
    controls.start({
      width: `${course.progress}%`,
      transition: { duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 },
    });
  }, [course.progress, controls]);

  const statusLabel =
    course.progress === 0 ? "Not started" :
    course.progress >= 100 ? "Completed" :
    "In progress";

  return (
    <Link href={`/courses/${course.id}`} className="block h-full">
      <motion.article
        className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#0d0d18] flex flex-col h-full min-h-[300px] cursor-pointer group"
        whileHover={{ scale: 1.018, y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        {/* Cover Image */}
        <div className="relative h-40 overflow-hidden shrink-0">
          {coverImage ? (
            <img
              src={coverImage}
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-primary/20" />
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d18] via-[#0d0d18]/30 to-transparent" />

          {/* Tag chip */}
          <div className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${meta.tagColor}`}>
            {meta.tag}
          </div>

          {/* Progress % badge */}
          <div className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-black/60 text-white border border-white/10 backdrop-blur-sm">
            {course.progress}%
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          <div>
            <h3 className="font-semibold text-[15px] leading-snug text-white group-hover:text-primary transition-colors line-clamp-2">
              {course.title}
            </h3>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-3 text-xs text-white/40">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              {meta.level}
            </span>
            <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {meta.hours}
            </span>
            <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
            <span className={`${course.progress >= 100 ? "text-green-400" : course.progress > 0 ? "text-primary/80" : "text-white/40"}`}>
              {statusLabel}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-auto pt-2">
            <div className="h-1.5 w-full bg-white/6 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-violet-400"
                initial={{ width: "0%" }}
                animate={controls}
              />
            </div>
          </div>
        </div>

        {/* Subtle glow on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_60px_rgba(99,102,241,0.06)]" />
      </motion.article>
    </Link>
  );
}
