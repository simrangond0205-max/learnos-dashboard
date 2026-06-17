import { Router } from "express";
import { db } from "@workspace/db";
import { coursesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  ListCoursesResponse,
  CreateCourseBody,
  GetCourseParams,
  UpdateCourseParams,
  UpdateCourseBody,
} from "@workspace/api-zod";

export const coursesRouter = Router();

coursesRouter.get("/", async (req, res) => {
  const courses = await db.select().from(coursesTable).orderBy(coursesTable.created_at);
  const parsed = ListCoursesResponse.parse(
    courses.map((c) => ({ ...c, created_at: c.created_at.toISOString() }))
  );
  res.json(parsed);
});

coursesRouter.post("/", async (req, res) => {
  const body = CreateCourseBody.parse(req.body);
  const [created] = await db
    .insert(coursesTable)
    .values({ title: body.title, progress: body.progress ?? 0, icon_name: body.icon_name })
    .returning();
  res.status(201).json({ ...created, created_at: created.created_at.toISOString() });
});

coursesRouter.get("/:id", async (req, res) => {
  const { id } = GetCourseParams.parse(req.params);
  const [course] = await db.select().from(coursesTable).where(eq(coursesTable.id, id));
  if (!course) {
    res.status(404).json({ error: "Course not found" });
    return;
  }
  res.json({ ...course, created_at: course.created_at.toISOString() });
});

coursesRouter.patch("/:id", async (req, res) => {
  const { id } = UpdateCourseParams.parse(req.params);
  const body = UpdateCourseBody.parse(req.body);
  const [updated] = await db
    .update(coursesTable)
    .set({ ...(body.title && { title: body.title }), ...(body.progress !== undefined && { progress: body.progress }), ...(body.icon_name && { icon_name: body.icon_name }) })
    .where(eq(coursesTable.id, id))
    .returning();
  if (!updated) {
    res.status(404).json({ error: "Course not found" });
    return;
  }
  res.json({ ...updated, created_at: updated.created_at.toISOString() });
});
