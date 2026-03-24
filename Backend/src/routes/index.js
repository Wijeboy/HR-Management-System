import { Router } from "express";
import { payrollRouter } from "../modules/payroll/payroll.routes.js";
import { performanceRouter } from "../modules/performance/performance.routes.js";

const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    moduleCoverage: {
      payroll: true,
      performance: true,
    },
  });
});

apiRouter.use("/payroll", payrollRouter);
apiRouter.use("/performance", performanceRouter);

export { apiRouter };
