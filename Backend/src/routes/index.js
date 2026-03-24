import { Router } from "express";
import { attendanceRouter } from "../modules/attendance/attendance.routes.js";
import { leaveRouter } from "../modules/leave/leave.routes.js";
import { notificationRouter } from "../modules/notifications/notifications.routes.js";
import { payrollRouter } from "../modules/payroll/payroll.routes.js";
import { performanceRouter } from "../modules/performance/performance.routes.js";

const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    moduleCoverage: {
      attendance: true,
      leave: true,
      notifications: true,
      payroll: true,
      performance: true,
    },
  });
});

apiRouter.use("/attendance", attendanceRouter);
apiRouter.use("/leave", leaveRouter);
apiRouter.use("/notifications", notificationRouter);
apiRouter.use("/payroll", payrollRouter);
apiRouter.use("/performance", performanceRouter);

export { apiRouter };
