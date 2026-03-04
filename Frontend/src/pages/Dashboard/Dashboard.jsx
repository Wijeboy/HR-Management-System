import React from 'react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Control Center</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's your HR overview</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <span className="material-symbols-outlined text-xl">add</span>
          Quick Action
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+5.2%</span>
          </div>
          <p className="text-sm font-medium text-gray-500 mt-4">Present Today</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">806</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-50 rounded-lg">
              <span className="material-symbols-outlined text-2xl text-purple-600">calendar_today</span>
            </div>
            <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">12</span>
          </div>
          <p className="text-sm font-medium text-gray-500 mt-4">On Leave</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">24</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-50 rounded-lg">
              <span className="material-symbols-outlined text-2xl text-orange-600">assignment</span>
            </div>
            <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">3 New</span>
          </div>
          <p className="text-sm font-medium text-gray-500 mt-4">Pending Requests</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">17</p>
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
