import React from 'react';

const ApplyLeave = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Apply for Leave</h1>
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
              <option>Sick Leave</option>
              <option>Vacation</option>
              <option>Personal</option>
            </select>
          </div>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeave;
