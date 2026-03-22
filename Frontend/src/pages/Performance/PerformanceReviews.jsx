import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const PerformanceReviews = () => {
  const [cycle, setCycle] = useState('Q1 2026');
  const [statusFilter, setStatusFilter] = useState('all');

  const [reviews, setReviews] = useState([
    { id: 'REV-001', employee: 'Sarah Williams', department: 'Engineering', manager: 'Department Manager', score: 4.7, status: 'completed', dueDate: '2026-03-15' },
    { id: 'REV-002', employee: 'John Davis', department: 'Sales', manager: 'Department Manager', score: 0, status: 'in_progress', dueDate: '2026-03-28' },
    { id: 'REV-003', employee: 'Michael Brown', department: 'Finance', manager: 'HR Manager', score: 0, status: 'pending', dueDate: '2026-04-02' },
    { id: 'REV-004', employee: 'Emily Chen', department: 'Marketing', manager: 'Department Manager', score: 4.2, status: 'completed', dueDate: '2026-03-18' },
  ]);

  const filtered = useMemo(() => {
    return reviews.filter((r) => statusFilter === 'all' || r.status === statusFilter);
  }, [reviews, statusFilter]);

  const markComplete = (id) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'completed', score: r.score || 4.0 } : r)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Performance Reviews</h1>
          <p className="text-gray-500 mt-1">Manage review cycles, scores, and completion statuses.</p>
        </div>
        <Link to="/performance/goals" className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
          Goals & KPIs
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <select value={cycle} onChange={(e) => setCycle(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg">
          <option>Q1 2026</option>
          <option>Q2 2026</option>
          <option>Q3 2026</option>
          <option>Q4 2026</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg">
          <option value="all">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="in_progress">In Progress</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Review ID</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Employee</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Department</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Manager</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Score</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Due Date</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Status</th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-sm font-semibold text-gray-900">{review.id}</td>
                  <td className="px-5 py-3 text-sm text-gray-700">{review.employee}</td>
                  <td className="px-5 py-3 text-sm text-gray-700">{review.department}</td>
                  <td className="px-5 py-3 text-sm text-gray-700">{review.manager}</td>
                  <td className="px-5 py-3 text-sm text-gray-700">{review.score ? `${review.score.toFixed(1)} / 5` : '-'}</td>
                  <td className="px-5 py-3 text-sm text-gray-700">{review.dueDate}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      review.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : review.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-amber-100 text-amber-700'
                    }`}>
                      {review.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    {review.status !== 'completed' ? (
                      <button onClick={() => markComplete(review.id)} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                        Mark Complete
                      </button>
                    ) : (
                      <span className="text-sm text-gray-400">Done</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-gray-500">No reviews found for selected filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm text-gray-500">Active cycle: <span className="font-medium text-gray-700">{cycle}</span></div>
    </div>
  );
};

export default PerformanceReviews;
