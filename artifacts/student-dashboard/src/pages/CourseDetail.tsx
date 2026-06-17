import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { motion, useAnimationControls } from "framer-motion";
import { useGetCourse, useUpdateCourse } from "@workspace/api-client-react";
import { Sidebar } from "@/components/Sidebar";
import { SkeletonTile } from "@/components/SkeletonTile";
import * as LucideIcons from "lucide-react";
import { ArrowLeft, CheckCircle2, Circle, Lock } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { getGetCourseQueryKey, getListCoursesQueryKey } from "@workspace/api-client-react";

const LESSON_TEMPLATES: Record<string, string[]> = {
  code: [
    "Component Architecture Patterns",
    "Advanced Hooks & Custom Hook Design",
    "Performance Optimization with useMemo & useCallback",
    "Context API vs External State",
    "Render Props & Higher-Order Components",
    "Concurrent Features & Suspense",
    "Testing React Components",
    "Server-Side Rendering Patterns",
  ],
  layers: [
    "TypeScript Fundamentals Review",
    "Advanced Types & Generics",
    "Conditional & Mapped Types",
    "Utility Types Deep Dive",
    "Declaration Files & Module Augmentation",
    "TypeScript with React Patterns",
    "Strict Mode & Type Safety",
    "Build Tooling & Configuration",
  ],
  cpu: [
    "Scalability Fundamentals",
    "Load Balancing Strategies",
    "Database Sharding & Replication",
    "Caching Layers & CDNs",
    "Message Queues & Event Streams",
    "API Gateway Design",
    "Microservices vs Monolith",
    "Observability & Monitoring",
  ],
  brain: [
    "Linear Algebra for ML",
    "Probability & Statistics Review",
    "Supervised Learning Algorithms",
    "Model Evaluation & Metrics",
    "Neural Network Basics",
    "Gradient Descent & Backprop",
    "Regularization Techniques",
    "Practical Model Deployment",
  ],
};

const DEFAULT_LESSONS = [
  "Introduction & Setup",
  "Core Concepts",
  "Intermediate Techniques",
  "Advanced Patterns",
  "Real-world Applications",
  "Performance & Optimization",
  "Testing & Quality",
  "Project & Review",
];

function getLessons(iconName: string): string[] {
  return LESSON_TEMPLATES[iconName] ?? DEFAULT_LESSONS;
}

function getCompletedCount(lessons: string[], progress: number): number {
  return Math.round((progress / 100) * lessons.length);
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 22 } },
};

export default function CourseDetail() {
  const [, params] = useRoute("/courses/:id");
  const [, navigate] = useLocation();
  const id = params?.id ?? "";

  const queryClient = useQueryClient();
  const { data: course, isLoading, isError } = useGetCourse(id, { query: { enabled: !!id } });
  const { mutate: updateCourse, isPending } = useUpdateCourse();

  const lessons = course ? getLessons(course.icon_name) : [];
  const completedCount = course ? getCompletedCount(lessons, course.progress) : 0;
  const [localCompleted, setLocalCompleted] = useState<number>(0);

  useEffect(() => {
    if (course) setLocalCompleted(getCompletedCount(getLessons(course.icon_name), course.progress));
  }, [course]);

  const progressControls = useAnimationControls();

  useEffect(() => {
    if (course) {
      progressControls.start({
        width: `${course.progress}%`,
        transition: { duration: 1.2, ease: "easeOut", delay: 0.3 },
      });
    }
  }, [course, progressControls]);

  function toggleLesson(index: number) {
    if (!course) return;
    const total = lessons.length;
    let next: number;

    if (index < localCompleted) {
      next = index;
    } else {
      next = index + 1;
    }

    const newProgress = Math.round((next / total) * 100);
    setLocalCompleted(next);

    progressControls.start({
      width: `${newProgress}%`,
      transition: { duration: 0.6, ease: "easeOut" },
    });

    updateCourse(
      { id: course.id, data: { progress: newProgress } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetCourseQueryKey(course.id) });
          queryClient.invalidateQueries({ queryKey: getListCoursesQueryKey() });
        },
      }
    );
  }

  // @ts-ignore
  const Icon = course ? (LucideIcons[course.icon_name] ?? LucideIcons.Book) : LucideIcons.Book;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />

      <main className="flex-1 md:ml-20 lg:ml-64 p-4 md:p-8 lg:p-10 pb-24 md:pb-10">
        <motion.button
          onClick={() => navigate("/courses")}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 cursor-pointer bg-transparent border-0 p-0"
          whileHover={{ x: -3 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </motion.button>

        {isError && (
          <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-6 py-5 text-sm text-destructive">
            Course not found or failed to load.
          </div>
        )}

        {isLoading && (
          <div className="space-y-4">
            <SkeletonTile className="h-48 w-full" />
            <SkeletonTile className="h-96 w-full" />
          </div>
        )}

        {course && (
          <motion.div
            className="space-y-4 max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* Hero card */}
            <motion.section
              className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8"
              variants={itemVariants}
            >
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle at 0% 0%, hsl(var(--primary)) 0%, transparent 60%)" }}
              />

              <div className="relative z-10 flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-bold tracking-tight mb-1">{course.title}</h1>
                  <p className="text-sm text-muted-foreground">
                    {localCompleted} of {lessons.length} lessons complete
                  </p>

                  <div className="mt-5 h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-accent"
                      initial={{ width: "0%" }}
                      animate={progressControls}
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{isPending ? "Saving…" : "Progress"}</span>
                    <span className="font-semibold text-foreground">
                      {Math.round((localCompleted / lessons.length) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Lessons list */}
            <motion.section
              className="rounded-3xl border border-card-border bg-card overflow-hidden"
              variants={itemVariants}
            >
              <header className="px-8 py-5 border-b border-white/5">
                <h2 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">Lessons</h2>
              </header>

              <ol className="divide-y divide-white/5">
                {lessons.map((lesson, index) => {
                  const isDone = index < localCompleted;
                  const isNext = index === localCompleted;
                  const isLocked = index > localCompleted;

                  return (
                    <motion.li
                      key={index}
                      variants={itemVariants}
                      className={`flex items-center gap-4 px-8 py-5 transition-colors ${
                        isLocked
                          ? "opacity-40 cursor-not-allowed"
                          : "cursor-pointer hover:bg-white/3 group"
                      }`}
                      onClick={() => !isLocked && toggleLesson(index)}
                      whileHover={isLocked ? {} : { x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="shrink-0">
                        {isDone ? (
                          <motion.div
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          >
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                          </motion.div>
                        ) : isLocked ? (
                          <Lock className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${isDone ? "line-through text-muted-foreground" : isNext ? "text-foreground" : "text-muted-foreground"}`}>
                          {lesson}
                        </p>
                      </div>

                      <div className="text-xs text-muted-foreground shrink-0 font-mono">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </motion.li>
                  );
                })}
              </ol>
            </motion.section>

            {localCompleted === lessons.length && (
              <motion.div
                className="rounded-3xl border border-primary/30 bg-primary/10 px-8 py-6 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <p className="font-bold text-primary text-lg">Course Complete</p>
                <p className="text-sm text-muted-foreground mt-1">You have finished all lessons in this course.</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}
