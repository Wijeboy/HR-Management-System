import { prisma } from "../../lib/prisma.js";
import { runtimeStore } from "../runtime/runtime.store.js";
import { monthLabelFromPeriod, paydayFromPeriod, periodFromLabel } from "../../utils/date.js";
import { toNumber } from "../../utils/number.js";

const computeSummary = (records) =>
  records.reduce(
    (acc, record) => {
      acc.totalGross += record.gross;
      acc.totalDeductions += record.deductions;
      acc.totalNet += record.net;
      if (record.status === "Pending") acc.pending += 1;
      return acc;
    },
    { totalGross: 0, totalDeductions: 0, totalNet: 0, pending: 0 }
  );

const toWholeNumber = (value, fallback = 0) => {
  if (value === undefined || value === null || value === "") return fallback;
  return Math.max(0, Math.round(toNumber(value)));
};

const nextPayrollId = async (period) => {
  const token = String(period || "").replace("-", "");
  try {
    const countInPeriod = await prisma.payrollRecord.count({
      where: { id: { startsWith: `PR-${token}-` } },
    });

    return `PR-${token}-${String(countInPeriod + 1).padStart(4, "0")}`;
  } catch {
    const countInPeriod = runtimeStore.payrollRecords.filter((record) => record.id.startsWith(`PR-${token}-`)).length;
    return `PR-${token}-${String(countInPeriod + 1).padStart(4, "0")}`;
  }
};

const makePayrollCalculation = (payload, employee) => {
  const payPeriod = payload.payPeriod || new Date().toISOString().slice(0, 7);
  const workingDays = 22;
  const dayRate = employee.baseSalary / workingDays;

  const attendanceDays = toWholeNumber(payload.attendanceDays, 22);
  const unpaidLeaveDays = toWholeNumber(payload.unpaidLeaveDays, 0);
  const overtimeHours = toNumber(payload.overtimeHours ?? 0);
  const overtimeRate = toNumber(payload.overtimeRate ?? 0);
  const performanceBonus = toNumber(payload.performanceBonus ?? 0);
  const otherAllowance = toNumber(payload.otherAllowance ?? 0);
  const taxRate = toNumber(payload.taxRate ?? 12);
  const insuranceDeduction = toNumber(payload.insuranceDeduction ?? 0);
  const statutoryDeduction = toNumber(payload.statutoryDeduction ?? 0);
  const otherDeductions = toNumber(payload.otherDeductions ?? 0);

  const attendanceEarning = dayRate * attendanceDays;
  const leaveDeduction = dayRate * unpaidLeaveDays;
  const overtimePay = overtimeHours * overtimeRate;
  const totalAllowance = employee.fixedAllowance + performanceBonus + otherAllowance + overtimePay;
  const gross = attendanceEarning + totalAllowance;
  const taxDeduction = gross * (taxRate / 100);

  const totalDeductions =
    taxDeduction + insuranceDeduction + statutoryDeduction + otherDeductions + leaveDeduction;
  const netSalary = gross - totalDeductions;

  return {
    payPeriod,
    attendanceDays,
    unpaidLeaveDays,
    attendanceEarning,
    leaveDeduction,
    overtimePay,
    performanceBonus,
    otherAllowance,
    taxRate,
    taxDeduction,
    insuranceDeduction,
    statutoryDeduction,
    otherDeductions,
    gross,
    totalDeductions,
    netSalary,
  };
};

const filterRecords = (records, query) => {
  const search = String(query.search || "").toLowerCase();
  const status = query.status || "All Status";
  const period = query.period || "All Periods";

  return records.filter((record) => {
    const matchesSearch =
      !search ||
      record.employeeName.toLowerCase().includes(search) ||
      record.employeeId.toLowerCase().includes(search) ||
      record.id.toLowerCase().includes(search);

    const matchesStatus = status === "All Status" || record.status === status;
    const matchesPeriod = period === "All Periods" || record.period === period;

    return matchesSearch && matchesStatus && matchesPeriod;
  });
};

export const payrollService = {
  async getEmployees() {
    try {
      return await prisma.payrollEmployee.findMany({
        orderBy: { id: "asc" },
      });
    } catch {
      return [...runtimeStore.payrollEmployees].sort((left, right) => left.id.localeCompare(right.id));
    }
  },

  async createEmployee(payload) {
    try {
      const existing = await prisma.payrollEmployee.findUnique({
        where: { id: payload.id },
      });

      if (existing) return null;

      return await prisma.payrollEmployee.create({
        data: {
          id: payload.id,
          name: payload.name,
          department: payload.department,
          baseSalary: toNumber(payload.baseSalary),
          fixedAllowance: toNumber(payload.fixedAllowance),
          paymentMethod: payload.paymentMethod || "Bank Transfer",
          bankName: payload.bankName || "",
          accountNo: payload.accountNo || "",
        },
      });
    } catch {
      const existing = runtimeStore.payrollEmployees.find((employee) => employee.id === payload.id);
      if (existing) return null;

      const employee = {
        id: payload.id,
        name: payload.name,
        department: payload.department,
        baseSalary: toNumber(payload.baseSalary),
        fixedAllowance: toNumber(payload.fixedAllowance),
        paymentMethod: payload.paymentMethod || "Bank Transfer",
        bankName: payload.bankName || "",
        accountNo: payload.accountNo || "",
      };
      runtimeStore.payrollEmployees.push(employee);
      return employee;
    }
  },

  async getRecords(query) {
    let records;
    try {
      records = await prisma.payrollRecord.findMany({
        orderBy: [{ paymentDate: "desc" }, { id: "desc" }],
      });
    } catch {
      records = [...runtimeStore.payrollRecords].sort(
        (left, right) => right.paymentDate.localeCompare(left.paymentDate) || right.id.localeCompare(left.id)
      );
    }

    const filtered = filterRecords(records, query);
    return {
      records: filtered,
      summary: computeSummary(filtered),
    };
  },

  async getPayslips(query) {
    const where = {};
    if (query.employeeId) where.employeeId = String(query.employeeId);
    if (query.period) where.period = String(query.period);

    try {
      return await prisma.payslip.findMany({
        where,
        orderBy: [{ paymentDate: "desc" }, { id: "desc" }],
      });
    } catch {
      return runtimeStore.payslips
        .filter((payslip) => (!where.employeeId || payslip.employeeId === where.employeeId) && (!where.period || payslip.period === where.period))
        .sort((left, right) => right.paymentDate.localeCompare(left.paymentDate) || right.id.localeCompare(left.id));
    }
  },

  async getPayslipById(id) {
    try {
      return await prisma.payslip.findUnique({ where: { id } });
    } catch {
      return runtimeStore.payslips.find((payslip) => payslip.id === id) || null;
    }
  },

  async calculatePayroll(payload) {
    let employee;
    try {
      employee = await prisma.payrollEmployee.findUnique({ where: { id: payload.employeeId } });
    } catch {
      employee = runtimeStore.payrollEmployees.find((item) => item.id === payload.employeeId) || null;
    }
    if (!employee) return null;

    const calc = makePayrollCalculation(payload, employee);
    const payrollId = await nextPayrollId(calc.payPeriod);
    const periodLabel = monthLabelFromPeriod(calc.payPeriod);
    const paymentDate = payload.paymentDate || paydayFromPeriod(calc.payPeriod);

    const payrollRecord = {
      id: payrollId,
      employeeId: employee.id,
      employeeName: employee.name,
      department: employee.department,
      period: periodLabel,
      attendanceDays: calc.attendanceDays,
      leaveDays: calc.unpaidLeaveDays,
      gross: Number(calc.gross.toFixed(2)),
      deductions: Number(calc.totalDeductions.toFixed(2)),
      net: Number(calc.netSalary.toFixed(2)),
      status: payload.status || "Processed",
      paymentDate,
    };

    const payslip = {
      id: payrollId,
      payrollId,
      employeeId: employee.id,
      employeeName: employee.name,
      department: employee.department,
      period: calc.payPeriod,
      periodLabel,
      paymentDate,
      paymentMethod: employee.paymentMethod,
      bankName: employee.bankName,
      accountNo: employee.accountNo,
      earnings: [
        { label: "Attendance-based Salary", amount: Number(calc.attendanceEarning.toFixed(2)) },
        { label: "Fixed Allowance", amount: Number(employee.fixedAllowance.toFixed(2)) },
        { label: "Overtime", amount: Number(calc.overtimePay.toFixed(2)) },
        { label: "Performance Bonus", amount: Number(calc.performanceBonus.toFixed(2)) },
        { label: "Other Allowances", amount: Number(calc.otherAllowance.toFixed(2)) },
      ],
      deductions: [
        { label: `Tax (${calc.taxRate}%)`, amount: Number(calc.taxDeduction.toFixed(2)) },
        { label: "Insurance", amount: Number(calc.insuranceDeduction.toFixed(2)) },
        { label: "Statutory Contribution", amount: Number(calc.statutoryDeduction.toFixed(2)) },
        { label: "Leave Deduction", amount: Number(calc.leaveDeduction.toFixed(2)) },
        { label: "Other Deductions", amount: Number(calc.otherDeductions.toFixed(2)) },
      ],
      gross: Number(calc.gross.toFixed(2)),
      totalDeductions: Number(calc.totalDeductions.toFixed(2)),
      net: Number(calc.netSalary.toFixed(2)),
      attendanceDays: calc.attendanceDays,
      leaveDays: calc.unpaidLeaveDays,
    };

    try {
      await prisma.$transaction([
        prisma.payrollRecord.create({ data: payrollRecord }),
        prisma.payslip.create({ data: payslip }),
      ]);
    } catch {
      runtimeStore.payrollRecords.unshift(payrollRecord);
      runtimeStore.payslips.unshift(payslip);
    }

    return {
      payrollRecord,
      payslip,
      breakdown: calc,
    };
  },

  findPeriodFromLabel(periodLabel) {
    return periodFromLabel(periodLabel);
  },
};
