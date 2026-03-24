import { attendanceService } from "./attendance.service.js";

export const attendanceController = {
  checkIn(req, res, next) {
    try {
      if (!req.body?.employeeId) {
        res.status(400).json({ message: "employeeId is required" });
        return;
      }

      res.json({ success: true, record: attendanceService.checkIn(req.body.employeeId) });
    } catch (error) {
      res.status(400).json({ message: error.message || "Failed to check in" });
    }
  },

  checkOut(req, res, next) {
    try {
      if (!req.body?.employeeId) {
        res.status(400).json({ message: "employeeId is required" });
        return;
      }

      res.json({ success: true, record: attendanceService.checkOut(req.body.employeeId) });
    } catch (error) {
      res.status(400).json({ message: error.message || "Failed to check out" });
    }
  },

  getTodayStatus(req, res, next) {
    try {
      res.json({ record: attendanceService.getTodayStatus(req.params.employeeId) });
    } catch (error) {
      next(error);
    }
  },

  getHistory(req, res, next) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      res.json(attendanceService.getEmployeeHistory(req.params.employeeId, page, limit));
    } catch (error) {
      next(error);
    }
  },

  getWeekly(req, res, next) {
    try {
      res.json(attendanceService.getWeeklyAttendance(req.params.employeeId));
    } catch (error) {
      next(error);
    }
  },

  getDailyAttendance(req, res, next) {
    try {
      const dateStr = req.query.date || new Date().toISOString().split("T")[0];
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      res.json(
        attendanceService.getDailyAttendance(
          dateStr,
          String(req.query.department || ""),
          String(req.query.status || ""),
          page,
          limit
        )
      );
    } catch (error) {
      next(error);
    }
  },

  getDailyStats(req, res, next) {
    try {
      const dateStr = req.query.date || new Date().toISOString().split("T")[0];
      res.json({
        stats: attendanceService.getDailyStats(dateStr),
        departments: attendanceService.getDepartments(),
      });
    } catch (error) {
      next(error);
    }
  },
};
