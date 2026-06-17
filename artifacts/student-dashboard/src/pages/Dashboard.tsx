import { useGetDashboardSummary, useListCourses, useGetActivityFeed } from "@workspace/api-client-react";
import { Sidebar } from "@/components/Sidebar";
import { HeroTile } from "@/components/HeroTile";
import { CourseCard } from "@/components/CourseCard";
import { ActivityGraph } from "@/components/ActivityGraph";
import { BentoGrid, BentoItem } from "@/components/BentoGrid";
import { SkeletonTile } from "@/components/SkeletonTile";

export default function Dashboard() {
  const { data: summary, isLoading: loadingSummary } = useGetDashboardSummary();
  const { data: courses, isLoading: loadingCourses } = useListCourses();
  const { data: activity, isLoading: loadingActivity } = useGetActivityFeed();

  const isLoading = loadingSummary || loadingCourses || loadingActivity;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />
      
      <main className="flex-1 md:ml-20 lg:ml-64 p-4 md:p-8 lg:p-10 pb-24 md:pb-10 overflow-y-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
            <div className="text-sm text-muted-foreground font-medium bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </div>
          </div>
        </header>

        {isLoading ? (
          <BentoGrid className="grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            <BentoItem className="col-span-1 md:col-span-2 xl:col-span-2 aspect-[2/1] md:aspect-auto md:h-64">
              <SkeletonTile className="w-full h-full" />
            </BentoItem>
            <BentoItem className="col-span-1 aspect-square md:aspect-auto md:h-64">
              <SkeletonTile className="w-full h-full" />
            </BentoItem>
            <BentoItem className="col-span-1 aspect-square md:aspect-auto md:h-64">
              <SkeletonTile className="w-full h-full" />
            </BentoItem>
            <BentoItem className="col-span-1 aspect-square md:aspect-auto md:h-64">
              <SkeletonTile className="w-full h-full" />
            </BentoItem>
            <BentoItem className="col-span-1 md:col-span-2 xl:col-span-3 aspect-[2/1] md:aspect-auto md:h-80">
              <SkeletonTile className="w-full h-full" />
            </BentoItem>
          </BentoGrid>
        ) : (
          <BentoGrid className="grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            <BentoItem className="col-span-1 md:col-span-2 xl:col-span-2">
              {summary && (
                <HeroTile 
                  name={summary.student_name} 
                  streakDays={summary.streak_days} 
                />
              )}
            </BentoItem>
            
            {courses?.slice(0, 4).map((course, i) => (
              <BentoItem key={course.id} className="col-span-1">
                <CourseCard course={course} />
              </BentoItem>
            ))}

            {activity && (
              <BentoItem className="col-span-1 md:col-span-2 xl:col-span-3 min-h-[300px]">
                <ActivityGraph activity={activity} />
              </BentoItem>
            )}
          </BentoGrid>
        )}
      </main>
    </div>
  );
}
