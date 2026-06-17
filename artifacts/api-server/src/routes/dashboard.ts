import { Router } from "express";
import { db } from "@workspace/db";
import { coursesTable } from "@workspace/db";
import { sql } from "drizzle-orm";

export const dashboardRouter = Router();

dashboardRouter.get("/summary", async (req, res) => {
  const courses = await db.select().from(coursesTable);
  const total = courses.length;
  const completed = courses.filter((c) => c.progress >= 100).length;
  const avgProgress = total > 0 ? Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / total) : 0;

  res.json({
    total_courses: total,
    completed_courses: completed,
    avg_progress: avgProgress,
    streak_days: 14,
    student_name: "Alex Chen",
  });
});

dashboardRouter.get("/activity", async (_req, res) => {
  const weeks = 52;
  const days = weeks * 7;
  const today = new Date();
  const activity = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];

    const rand = Math.random();
    let count = 0;
    let level = 0;

    if (rand > 0.45) {
      count = Math.floor(Math.random() * 8) + 1;
      if (count >= 6) level = 4;
      else if (count >= 4) level = 3;
      else if (count >= 2) level = 2;
      else level = 1;
    }

    activity.push({ date: dateStr, count, level });
  }

  res.json(activity);
});
