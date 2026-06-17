import { useListCourses } from "@workspace/api-client-react";
import { Sidebar } from "@/components/Sidebar";
import { CourseCard } from "@/components/CourseCard";
import { SkeletonTile } from "@/components/SkeletonTile";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
};

export default function Courses() {
  const { data: courses, isLoading, isError } = useListCourses();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />

      <main className="flex-1 md:ml-20 lg:ml-64 p-4 md:p-8 lg:p-10 pb-24 md:pb-10">
        <header className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Courses</h2>
          <p className="text-muted-foreground mt-1 text-sm">Your active learning tracks</p>
        </header>

        {isError && (
          <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-6 py-4 text-sm text-destructive">
            Failed to load courses. Please try again.
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonTile key={i} className="h-56" />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {courses?.map((course) => (
              <motion.div key={course.id} variants={item}>
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}
