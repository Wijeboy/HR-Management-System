import React from 'react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-500">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 - Total Employees */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Total Employees</p>
            <span className="material-symbols-outlined text-gray-500">group</span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">1,248</span>
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
              <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span>
              12%
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-500">vs. last month</p>
        </div>

        {/* Card 2 - Monthly Payroll */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Monthly Payroll</p>
            <span className="material-symbols-outlined text-gray-500">attach_money</span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">$4.2M</span>
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
              <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span>
              2.4%
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-500">vs. last month</p>
        </div>

        {/* Card 3 - Active Requests */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Active Requests</p>
            <span className="material-symbols-outlined text-gray-500">pending_actions</span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">145</span>
            <span className="inline-flex items-center rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-800">
              <span className="material-symbols-outlined text-[14px] mr-0.5">trending_down</span>
              5%
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-500">vs. last month</p>
        </div>

        {/* Card 4 - Open Positions */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Open Positions</p>
            <span className="material-symbols-outlined text-gray-500">person_add</span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">12</span>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-800">
              <span className="material-symbols-outlined text-[14px] mr-0.5">remove</span>
              0%
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-500">vs. last month</p>
        </div>
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Activities</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-700">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { user: 'Sarah Williams', action: 'submitted a leave request', time: '2 hours ago', icon: 'calendar_today', color: 'blue' },
              { user: 'John Davis', action: 'completed onboarding', time: '4 hours ago', icon: 'check_circle', color: 'green' },
              { user: 'Michael Johnson', action: 'updated profile', time: '5 hours ago', icon: 'person', color: 'purple' },
              { user: 'Emily Chen', action: 'submitted expense claim', time: 'Yesterday', icon: 'receipt', color: 'orange' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
                <div className={`flex items-center justify-center w-10 h-10 bg-${activity.color}-50 rounded-full`}>
                  <span className={`material-symbols-outlined text-${activity.color}-600`}>{activity.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                  <p className="text-xs text-gray-500">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Department Overview</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-700">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Engineering', count: 245, change: '+8', color: 'indigo' },
              { name: 'Sales & Marketing', count: 187, change: '+12', color: 'blue' },
              { name: 'Customer Support', count: 156, change: '+5', color: 'green' },
              { name: 'Finance', count: 78, change: '+3', color: 'purple' },
              { name: 'Human Resources', count: 89, change: '+6', color: 'orange' },
            ].map((dept, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-${dept.color}-500`}></div>
                  <span className="text-sm font-medium text-gray-900">{dept.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-900">{dept.count}</span>
                  <span className="text-xs text-green-600 font-medium">{dept.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Announcements</h2>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-blue-600">campaign</span>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900">Company All-Hands Meeting</h3>
                <p className="text-sm text-gray-600 mt-1">Join us this Friday at 3 PM for our quarterly company update.</p>
                <p className="text-xs text-gray-500 mt-2">Posted 2 days ago</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-green-600">celebration</span>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900">New Employee Benefits</h3>
                <p className="text-sm text-gray-600 mt-1">We're excited to announce enhanced health insurance and wellness programs.</p>
                <p className="text-xs text-gray-500 mt-2">Posted 1 week ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
