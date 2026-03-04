import React from 'react';

const PayrollList = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Payroll Management</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <span className="material-symbols-outlined text-xl">add</span>
          Generate Payroll
        </button>
      </div>
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <p className="text-gray-600">Payroll management interface will be displayed here.</p>
      </div>
    </div>
  );
};

export default PayrollList;
