import { runtimeStore } from "../runtime/runtime.store.js";

export const notificationsService = {
  getNotifications(userId) {
    const notifications = runtimeStore.notifications
      .filter((notification) => notification.recipientId === userId)
      .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt));

    return {
      notifications,
      unreadCount: notifications.filter((notification) => !notification.read).length,
    };
  },

  markRead(id) {
    const notification = runtimeStore.notifications.find((item) => item._id === id);
    if (!notification) return null;
    notification.read = true;
    return notification;
  },

  markAllRead(userId) {
    let updated = 0;
    runtimeStore.notifications.forEach((notification) => {
      if (notification.recipientId === userId && !notification.read) {
        notification.read = true;
        updated += 1;
      }
    });
    return { updated };
  },
};
