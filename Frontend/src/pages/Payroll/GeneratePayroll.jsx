import React, { useMemo, useState } from 'react';

const GeneratePayroll = () => {
  const [month, setMonth] = useState('2026-03');
  const [department, setDepartment] = useState('All');
  const [bonusPct, setBonusPct] = useState(0);
  const [deductionPct, setDeductionPct] = useState(0);
  const [history, setHistory] = useState([]);

  const basePayrollByDepartment = {
    All: 4235000,
    Engineering: 1832000,
    Sales: 1024000,
    Finance: 538000,
    'Human Resources': 421000,
    IT: 620000,
  };

  const employeeByDepartment = {
    All: 847,
    Engineering: 245,
    Sales: 187,
    Finance: 78,
    'Human Resources': 89,
    IT: 103,
  };

  const preview = useMemo(() => {
    const base = basePayrollByDepartment[department] || 0;
    const bonus = (base * bonusPct) / 100;
    const deductions = (base * deductionPct) / 100;
    const net = Math.max(0, base + bonus - deductions);
    return { base, bonus, deductions, net, employees: employeeByDepartment[department] || 0 };
  }, [department, bonusPct, deductionPct]);

  const handleGenerate = () => {
    const runId = `PR-${month.replace('-', '')}-${department.slice(0, 2).toUpperCase()}`;
    const item = {
      id: runId,
      month,
      department,
      employees: preview.employees,
      net: preview.net,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setHistory((prev) => [item, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Generate Payroll</h1>
        <p className="text-gray-500 mt-1">Create a payroll run by month, department, and adjustment settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Payroll Month</label>
              <input value={month} onChange={(e) => setMonth(e.target.value)} type="month" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Department</label>
              <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg">
                {Object.keys(basePayrollByDepartment).map((dep) => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Bonus (%)</label>
              <input value={bonusPct} onChange={(e) => setBonusPct(Number(e.target.value) || 0)} type="number" min="0" max="25" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Deductions (%)</label>
              <input value={deductionPct} onChange={(e) => setDeductionPct(Number(e.target.value) || 0)} type="number" min="0" max="25" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
          </div>
          <button onClick={handleGenerate} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <span className="material-symbols-outlined text-lg">bolt</span>
            Generate Run
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-3">
          <h2 className="text-lg font-bold text-gray-900">Preview</h2>
          <div className="text-sm text-gray-600">Employees: <span className="font-semibold text-gray-900">{preview.employees}</span></div>
          <div className="text-sm text-gray-600">Base Payroll: <span className="font-semibold text-gray-900">${preview.base.toLocaleString()}</span></div>
          <div className="text-sm text-gray-600">Bonus: <span className="font-semibold text-green-600">+${preview.bonus.toLocaleString()}</span></div>
          <div className="text-sm text-gray-600">Deductions: <span className="font-semibold text-red-600">-${preview.deductions.toLocaleString()}</span></div>
          <div className="pt-2 border-t border-gray-100 text-sm text-gray-700">
            Net Payout: <span className="font-bold text-gray-900">${preview.net.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Generated Runs (Session)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Run ID</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Month</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Department</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Employees</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Net</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-sm font-semibold text-gray-900">{item.id}</td>
                  <td className="px-5 py-3 text-sm text-gray-700">{item.month}</td>
                  <td className="px-5 py-3 text-sm text-gray-700">{item.department}</td>
                  <td className="px-5 py-3 text-sm text-gray-700">{item.employees}</td>
                  <td className="px-5 py-3 text-sm text-gray-700">${item.net.toLocaleString()}</td>
                  <td className="px-5 py-3 text-sm text-gray-700">{item.createdAt}</td>
                </tr>
              ))}
              {history.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-gray-500">No runs generated yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GeneratePayroll;
