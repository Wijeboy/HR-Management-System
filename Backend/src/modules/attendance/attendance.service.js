import { helpers, runtimeStore } from "../runtime/runtime.store.js";

const WORK_START_HOUR = 9;
const LATE_THRESHOLD_MINUTES = 30;

const paginate = (items, page = 1, limit = 10) => {
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / safeLimit));
  const records = items.slice((safePage - 1) * safeLimit, safePage * safeLimit);
  return { records, total, page: safePage, totalPages };
};

const getEmployee = (employeeId) =>
  runtimeStore.employees.find((employee) => employee.employeeId === employeeId && employee.isActive);

const findAttendanceRecord = (employeeId, dateStr) =>
  runtimeStore.attendanceRecords.find((record) => record.employeeId === employeeId && record.date === dateStr) || null;

const getApprovedLeaveEmployeeIdsForDate = (dateStr) => {
  const selectedDate = new Date(`${dateStr}T00:00:00`);
  return runtimeStore.leaveRequests
    .filter((request) => {
      if (request.status !== "approved") return false;
      const startDate = new Date(request.startDate);
      const endDate = request.endDate ? new Date(request.endDate) : startDate;
      return startDate <= selectedDate && selectedDate <= endDate;
    })
    .map((request) => request.employeeId);
};

export const attendanceService = {
  checkIn(employeeId) {
    const employee = getEmployee(employeeId);
    if (!employee) throw new Error("Employee not found");

    const today = new Date();
    const dateStr = helpers.dateOnly(today);
    const existing = findAttendanceRecord(employeeId, dateStr);

    if (existing?.checkIn) throw new Error("Already checked in today");

    const status =
      today.getHours() > WORK_START_HOUR ||
      (today.getHours() === WORK_START_HOUR && today.getMinutes() > LATE_THRESHOLD_MINUTES)
        ? "late"
        : "present";

    const nextRecord = {
      _id: existing?._id || `att-${employeeId.toLowerCase()}-${dateStr}`,
      employeeId,
      employeeName: employee.name,
      department: employee.department,
      date: dateStr,
      checkIn: today.toISOString(),
      checkOut: null,
      totalHours: 0,
      status,
    };

    if (existing) {
      Object.assign(existing, nextRecord);
      return existing;
    }

    runtimeStore.attendanceRecords.push(nextRecord);
    return nextRecord;
  },

  checkOut(employeeId) {
    const dateStr = helpers.dateOnly(new Date());
    const record = findAttendanceRecord(employeeId, dateStr);

    if (!record?.checkIn) throw new Error("No check-in record found for today");
    if (record.checkOut) throw new Error("Already checked out today");

    const checkOut = new Date();
    const totalHours = Number(((checkOut.getTime() - new Date(record.checkIn).getTime()) / 3600000).toFixed(2));

    record.checkOut = checkOut.toISOString();
    record.totalHours = Math.max(0, totalHours);
    return record;
  },

  getTodayStatus(employeeId) {
    return findAttendanceRecord(employeeId, helpers.dateOnly(new Date()));
  },

  getEmployeeHistory(employeeId, page = 1, limit = 10) {
    const records = runtimeStore.attendanceRecords
      .filter((record) => record.employeeId === employeeId)
      .sort((a, b) => b.date.localeCompare(a.date));

    return paginate(records, page, limit);
  },

  getWeeklyAttendance(employeeId) {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    monday.setHours(0, 0, 0, 0);

    const days = [];
    let totalWeekHours = 0;
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    for (let index = 0; index < 7; index += 1) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      const dateStr = helpers.dateOnly(date);
      const record = findAttendanceRecord(employeeId, dateStr);
      const hours = record?.totalHours || 0;
      totalWeekHours += hours;
      days.push({ label: labels[index], date: dateStr, hours });
    }

    return {
      days,
      totalWeekHours: Number(totalWeekHours.toFixed(2)),
    };
  },

  getDailyAttendance(dateStr, department = "", status = "", page = 1, limit = 10) {
    const approvedLeaveEmployeeIds = new Set(getApprovedLeaveEmployeeIdsForDate(dateStr));
    const employees = runtimeStore.employees.filter((employee) => employee.isActive);
    const filteredEmployees = department
      ? employees.filter((employee) => employee.department === department)
      : employees;

    let records = filteredEmployees.map((employee) => {
      const record = findAttendanceRecord(employee.employeeId, dateStr);
      if (record) return { ...record };

      return {
        employeeId: employee.employeeId,
        employeeName: employee.name,
        department: employee.department,
        checkIn: null,
        checkOut: null,
        totalHours: 0,
        status: approvedLeaveEmployeeIds.has(employee.employeeId) ? "on_leave" : "absent",
      };
    });

    if (status) {
      records = records.filter((record) => record.status === status);
    }

    records.sort((a, b) => a.employeeName.localeCompare(b.employeeName));
    return paginate(records, page, limit);
  },

  getDailyStats(dateStr) {
    const employees = runtimeStore.employees.filter((employee) => employee.isActive);
    const records = this.getDailyAttendance(dateStr, "", "", 1, employees.length || 1).records;
    const total = records.length;

    const count = (value) => records.filter((record) => record.status === value).length;
    const ratio = (value) => (total === 0 ? "0.0" : ((value / total) * 100).toFixed(1));

    const present = count("present");
    const late = count("late");
    const absent = count("absent");
    const onLeave = count("on_leave");

    return {
      total,
      present,
      presentPct: ratio(present),
      absent,
      absentPct: ratio(absent),
      onLeave,
      onLeavePct: ratio(onLeave),
      late,
      latePct: ratio(late),
    };
  },

  getDepartments() {
    return [...new Set(runtimeStore.employees.filter((employee) => employee.isActive).map((employee) => employee.department))];
  },
};
