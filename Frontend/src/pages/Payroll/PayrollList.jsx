import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const PayrollList = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const payrollRuns = [
    { id: 'PR-2026-03', month: 'March 2026', employees: 847, total: 4235000, processedOn: '2026-03-20', status: 'paid' },
    { id: 'PR-2026-02', month: 'February 2026', employees: 842, total: 4192000, processedOn: '2026-02-22', status: 'paid' },
    { id: 'PR-2026-01', month: 'January 2026', employees: 838, total: 4179000, processedOn: '2026-01-20', status: 'paid' },
    { id: 'PR-2025-12', month: 'December 2025', employees: 831, total: 4123000, processedOn: '2025-12-19', status: 'pending' },
  ];

  const filteredRuns = useMemo(() => {
    return payrollRuns.filter((run) => {
      const matchesStatus = status === 'all' || run.status === status;
      const text = `${run.id} ${run.month}`.toLowerCase();
      const matchesSearch = text.includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [payrollRuns, search, status]);

  const summary = useMemo(() => {
    const paid = filteredRuns.filter((r) => r.status === 'paid').length;
    const pending = filteredRuns.filter((r) => r.status === 'pending').length;
    const totalAmount = filteredRuns.reduce((acc, r) => acc + r.total, 0);
    return { paid, pending, totalAmount };
  }, [filteredRuns]);

  const exportCsv = () => {
    const header = 'Run ID,Month,Employees,Total Amount,Processed On,Status';
    const rows = filteredRuns.map((r) => [
      r.id,
      r.month,
      r.employees,
      r.total,
      r.processedOn,
      r.status,
    ].join(','));
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payroll-runs.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payroll Management</h1>
          <p className="text-gray-500 mt-1">Track monthly payroll runs and export summaries.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={exportCsv} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <span className="material-symbols-outlined text-xl">download</span>
            Export CSV
          </button>
          <Link to="/payroll/generate" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <span className="material-symbols-outlined text-xl">add</span>
            Generate Payroll
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500">Visible Runs</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{filteredRuns.length}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500">Paid Runs</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{summary.paid}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">${(summary.totalAmount / 1000000).toFixed(2)}M</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">search</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by run id or month"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Run ID</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Month</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Employees</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Total</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Processed</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Status</th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRuns.map((run) => (
                <tr key={run.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-sm font-semibold text-gray-900">{run.id}</td>
                  <td className="px-5 py-3 text-sm text-gray-700">{run.month}</td>
                  <td className="px-5 py-3 text-sm text-gray-700">{run.employees}</td>
                  <td className="px-5 py-3 text-sm text-gray-700">${run.total.toLocaleString()}</td>
                  <td className="px-5 py-3 text-sm text-gray-700">{run.processedOn}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${run.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {run.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link to={`/payroll/payslip/${run.id}`} className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                      <span className="material-symbols-outlined text-base">visibility</span>
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredRuns.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-gray-500">No payroll runs match your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PayrollList;
