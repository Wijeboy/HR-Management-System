import React, { useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

const Reports = () => {
  const [reports, setReports] = useState([
    { id: 'RPT-001', name: 'Q1 Employee Performance', type: 'Performance', date: 'Mar 1, 2026', size: '2.4 MB', status: 'Ready' },
    { id: 'RPT-002', name: 'February Attendance Report', type: 'Attendance', date: 'Feb 28, 2026', size: '1.8 MB', status: 'Ready' },
    { id: 'RPT-003', name: 'Department Budget Analysis', type: 'Financial', date: 'Feb 15, 2026', size: '3.1 MB', status: 'Ready' },
  ]);

  const employeeGrowthData = useMemo(() => ({
    labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Total Employees',
        data: [790, 802, 815, 828, 839, 847],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.15)',
        fill: true,
        tension: 0.35,
      },
    ],
  }), []);

  const departmentDistributionData = useMemo(() => ({
    labels: ['Engineering', 'Sales', 'Support', 'Finance', 'HR'],
    datasets: [
      {
        data: [245, 187, 156, 78, 89],
        backgroundColor: ['#4f46e5', '#3b82f6', '#22c55e', '#a855f7', '#f97316'],
        borderWidth: 0,
      },
    ],
  }), []);

  const generateReport = () => {
    const id = `RPT-${String(reports.length + 1).padStart(3, '0')}`;
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const item = {
      id,
      name: `Auto Report ${id}`,
      type: 'General',
      date,
      size: '1.2 MB',
      status: 'Ready',
    };
    setReports((prev) => [item, ...prev]);
  };

  const exportReportList = () => {
    const header = 'Report ID,Report Name,Type,Generated,Size,Status';
    const rows = reports.map((r) => [r.id, r.name, r.type, r.date, r.size, r.status].join(','));
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-reports.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-500 mt-1">Automated insights and data visualization</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <span className="material-symbols-outlined text-xl">calendar_today</span>
            Last 30 Days
          </button>
          <button onClick={exportReportList} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <span className="material-symbols-outlined text-xl">download</span>
            Export
          </button>
          <button onClick={generateReport} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <span className="material-symbols-outlined text-xl">add</span>
            Generate Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg">
              <span className="material-symbols-outlined text-2xl text-blue-600">group</span>
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+12%</span>
          </div>
          <p className="text-sm font-medium text-gray-500 mt-4">Total Employees</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">847</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center w-12 h-12 bg-green-50 rounded-lg">
              <span className="material-symbols-outlined text-2xl text-green-600">trending_up</span>
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+8%</span>
          </div>
          <p className="text-sm font-medium text-gray-500 mt-4">Attendance Rate</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">95.8%</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-50 rounded-lg">
              <span className="material-symbols-outlined text-2xl text-purple-600">payments</span>
            </div>
            <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">+5%</span>
          </div>
          <p className="text-sm font-medium text-gray-500 mt-4">Total Payroll</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">$8.9M</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-50 rounded-lg">
              <span className="material-symbols-outlined text-2xl text-orange-600">person_off</span>
            </div>
            <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">+2%</span>
          </div>
          <p className="text-sm font-medium text-gray-500 mt-4">Turnover Rate</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">4.2%</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employee Growth Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Employee Growth Trend</h2>
              <p className="text-sm text-gray-500">Year-over-year comparison</p>
            </div>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <span className="material-symbols-outlined text-xl">more_vert</span>
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <Line
              data={employeeGrowthData}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: false },
                },
              }}
            />
          </div>
        </div>

        {/* Department Distribution */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Department Distribution</h2>
              <p className="text-sm text-gray-500">Employee allocation by department</p>
            </div>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <span className="material-symbols-outlined text-xl">more_vert</span>
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <Doughnut
              data={departmentDistributionData}
              options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
            />
          </div>
        </div>
      </div>

      {/* Recent Reports Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Generated Reports</h2>
          <p className="text-sm text-gray-500">Recently created analytics reports</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Report Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Generated</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Size</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg">
                        <span className="material-symbols-outlined text-xl text-blue-600">description</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{report.name}</p>
                        <p className="text-xs text-gray-500">{report.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{report.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{report.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button onClick={exportReportList} className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-gray-100">
                      <span className="material-symbols-outlined text-xl">download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
