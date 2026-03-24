import { leaveService } from "./leave.service.js";

export const leaveController = {
  submitLeave(req, res, next) {
    try {
      const { employeeId, leaveType, startDate, endDate, reason } = req.body || {};
      if (!employeeId || !leaveType || !startDate || !reason) {
        res.status(400).json({ message: "Required fields missing" });
        return;
      }

      const request = leaveService.submitLeave(
        employeeId,
        { leaveType, startDate, endDate: endDate || null, reason },
        req.file || null
      );

      res.status(201).json({ success: true, request });
    } catch (error) {
      res.status(error.code === "LEAVE_EXCEEDED" ? 422 : 400).json({
        message: error.message || "Failed to submit leave request",
        ...(error.code ? { code: error.code } : {}),
      });
    }
  },

  updateLeave(req, res, next) {
    try {
      const { employeeId, leaveType, startDate, endDate, reason } = req.body || {};
      const request = leaveService.updateLeave(
        req.params.id,
        employeeId,
        { leaveType, startDate, endDate: endDate || null, reason },
        req.file || null
      );

      res.json({ success: true, request });
    } catch (error) {
      res.status(error.code === "LEAVE_EXCEEDED" ? 422 : 400).json({
        message: error.message || "Failed to update leave request",
        ...(error.code ? { code: error.code } : {}),
      });
    }
  },

  deleteLeave(req, res, next) {
    try {
      leaveService.deleteLeave(req.params.id, req.body?.employeeId);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: error.message || "Failed to delete leave request" });
    }
  },

  getBalance(req, res, next) {
    try {
      res.json({ balance: leaveService.getOrCreateBalance(req.params.employeeId) });
    } catch (error) {
      next(error);
    }
  },

  getHistory(req, res, next) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      res.json(leaveService.getEmployeeLeaveHistory(req.params.employeeId, page, limit));
    } catch (error) {
      next(error);
    }
  },

  getPending(req, res, next) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      res.json(leaveService.getPendingRequests(page, limit));
    } catch (error) {
      next(error);
    }
  },

  getApproved(req, res, next) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      res.json(leaveService.getApprovedRequests(page, limit));
    } catch (error) {
      next(error);
    }
  },

  getRejected(req, res, next) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      res.json(leaveService.getRejectedRequests(page, limit));
    } catch (error) {
      next(error);
    }
  },

  approveLeave(req, res, next) {
    try {
      if (!req.body?.hrId) {
        res.status(400).json({ message: "hrId is required" });
        return;
      }

      res.json({ success: true, request: leaveService.approveLeave(req.params.id, req.body.hrId) });
    } catch (error) {
      res.status(400).json({ message: error.message || "Failed to approve leave request" });
    }
  },

  rejectLeave(req, res, next) {
    try {
      if (!req.body?.hrId) {
        res.status(400).json({ message: "hrId is required" });
        return;
      }

      res.json({
        success: true,
        request: leaveService.rejectLeave(req.params.id, req.body.hrId, req.body.comment || ""),
      });
    } catch (error) {
      res.status(400).json({ message: error.message || "Failed to reject leave request" });
    }
  },

  getSingleRequest(req, res, next) {
    try {
      const request = leaveService.getRequestById(req.params.id);
      if (!request) {
        res.status(404).json({ message: "Not found" });
        return;
      }

      res.json({ request });
    } catch (error) {
      next(error);
    }
  },
};
