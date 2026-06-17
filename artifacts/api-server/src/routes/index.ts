import { Router, type IRouter } from "express";
import healthRouter from "./health";
import { coursesRouter } from "./courses";
import { dashboardRouter } from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/courses", coursesRouter);
router.use("/dashboard", dashboardRouter);

export default router;
