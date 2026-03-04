import React from 'react';

const AttendanceList = () => {
  const attendanceData = [
    { id: 1, name: 'Sarah Williams', department: 'Engineering', checkIn: '08:45 AM', checkOut: '05:30 PM', hours: '8.75', status: 'Present' },
    { id: 2, name: 'John Davis', department: 'Sales', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: '9.00', status: 'Present' },
    { id: 3, name: 'Michael Johnson', department: 'HR', checkIn: '08:30 AM', checkOut: '05:15 PM', hours: '8.75', status: 'Present' },
    { id: 4, name: 'Emily Chen', department: 'Finance', checkIn: '-', checkOut: '-', hours: '-', status: 'On Leave' },
    { id: 5, name: 'Robert Taylor', department: 'Engineering', checkIn: '-', checkOut: '-', hours: '-', status: 'Absent' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Daily Attendance Log</h1>
          <p className="text-gray-500 mt-1">Track employee attendance and work hours</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <span className="material-symbols-outlined text-xl">download</span>
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <span className="material-symbols-outlined text-xl">add</span>
            Mark Attendance
          </button>
        </div>
      </div>

      {/* Date Picker */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-indigo-600">calendar_today</span>
            <h2 className="text-lg font-semibold text-gray-900">March 4, 2026</h2>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-green-50 rounded-lg">
                <span className="material-symbols-outlined text-2xl text-green-600">check_circle</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Present</p>
                <p className="text-3xl font-bold text-gray-900">641</p>
              </div>
            </div>
            <span className="text-sm font-medium text-green-600">95.2%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-red-50 rounded-lg">
                <span className="material-symbols-outlined text-2xl text-red-600">cancel</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Absent</p>
                <p className="text-3xl font-bold text-gray-900">18</p>
              </div>
            </div>
            <span className="text-sm font-medium text-red-600">2.7%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg">
                <span className="material-symbols-outlined text-2xl text-blue-600">event</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">On Leave</p>
                <p className="text-3xl font-bold text-gray-900">14</p>
              </div>
            </div>
            <span className="text-sm font-medium text-blue-600">2.1%</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                search
              </span>
              <input
                type="text"
                placeholder="Search by employee name or ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Sales</option>
            <option>HR</option>
            <option>Finance</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
            <option>All Status</option>
            <option>Present</option>
            <option>Absent</option>
            <option>On Leave</option>
          </select>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Check Out
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Work Hours
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceData.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full font-semibold text-sm">
                        {record.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{record.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {record.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.checkIn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.checkOut}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {record.hours}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      record.status === 'Present'
                        ? 'bg-green-100 text-green-700'
                        : record.status === 'On Leave'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-gray-100">
                      <span className="material-symbols-outlined text-xl">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing 1 to 5 of 673 employees
          </p>
          <div className="flex items-center gap-2">
            <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
              <option>10 per page</option>
              <option>25 per page</option>
              <option>50 per page</option>
            </select>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceList;
