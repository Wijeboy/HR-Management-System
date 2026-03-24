import { notificationsService } from "./notifications.service.js";

export const notificationsController = {
  getNotifications(req, res, next) {
    try {
      res.json(notificationsService.getNotifications(req.params.userId));
    } catch (error) {
      next(error);
    }
  },

  markRead(req, res, next) {
    try {
      const notification = notificationsService.markRead(req.params.id);
      if (!notification) {
        res.status(404).json({ message: "Notification not found" });
        return;
      }
      res.json({ success: true, notification });
    } catch (error) {
      next(error);
    }
  },

  markAllRead(req, res, next) {
    try {
      if (!req.body?.userId) {
        res.status(400).json({ message: "userId is required" });
        return;
      }
      res.json({ success: true, ...notificationsService.markAllRead(req.body.userId) });
    } catch (error) {
      next(error);
    }
  },
};
