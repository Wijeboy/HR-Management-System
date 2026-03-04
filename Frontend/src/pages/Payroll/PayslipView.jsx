import React from 'react';

const PayslipView = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Payslips</h1>
          <p className="text-gray-500 mt-1">View and download salary statements</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <span className="material-symbols-outlined text-xl">print</span>
            Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <span className="material-symbols-outlined text-xl">download</span>
            Download PDF
          </button>
        </div>
      </div>

      {/* Month Selection */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Pay Period</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
              <option>January 2026</option>
              <option>February 2026</option>
              <option selected>March 2026</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Employee</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
              <option>Sarah Williams (EMP-0034)</option>
              <option>John Davis (EMP-0012)</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              View Payslip
            </button>
          </div>
        </div>
      </div>

      {/* Payslip Document */}
      <div className="mx-auto max-w-4xl bg-white p-12 rounded-xl border border-gray-200 shadow-lg">
        {/* Company Header */}
        <div className="flex items-start justify-between border-b border-gray-200 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-2xl">hexagon</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FUCHSIUS Corporation</h1>
                <p className="text-sm text-gray-500">Human Resource Management</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold text-indigo-600">PAYSLIP</h2>
            <p className="text-sm text-gray-500 mt-2">March 2026</p>
            <p className="text-sm text-gray-500">Payment Date: March 31, 2026</p>
          </div>
        </div>

        {/* Employee Details */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-600 mb-4">Employee Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Name:</span>
                <span className="font-semibold">Sarah Williams</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Employee ID:</span>
                <span className="font-semibold">EMP-0034</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Department:</span>
                <span className="font-semibold">Sales & Marketing</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-600 mb-4">Payment Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Bank Name:</span>
                <span className="font-semibold">First National Bank</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Account No:</span>
                <span className="font-semibold">•••• 4567</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Method:</span>
                <span className="font-semibold">Direct Deposit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Earnings and Deductions */}
        <div className="mb-8">
          <table className="min-w-full">
            <thead>
              <tr className="border-b-2 border-indigo-600">
                <th className="py-3 text-left text-sm font-semibold text-gray-900">Earnings</th>
                <th className="py-3 text-right text-sm font-semibold text-gray-900">Amount ($)</th>
                <th className="px-6"></th>
                <th className="py-3 text-left text-sm font-semibold text-gray-900">Deductions</th>
                <th className="py-3 text-right text-sm font-semibold text-gray-900">Amount ($)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-3 text-sm text-gray-600">Basic Salary</td>
                <td className="py-3 text-right text-sm font-medium">8,500.00</td>
                <td className="px-6"></td>
                <td className="py-3 text-sm text-gray-600">Federal Tax</td>
                <td className="py-3 text-right text-sm font-medium">1,275.00</td>
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-600">Housing Allowance</td>
                <td className="py-3 text-right text-sm font-medium">1,500.00</td>
                <td className="px-6"></td>
                <td className="py-3 text-sm text-gray-600">Social Security</td>
                <td className="py-3 text-right text-sm font-medium">620.00</td>
              </tr>
              <tr>
                <td className="py-3 text-sm text-gray-600">Performance Bonus</td>
                <td className="py-3 text-right text-sm font-medium">2,000.00</td>
                <td className="px-6"></td>
                <td className="py-3 text-sm text-gray-600">Health Insurance</td>
                <td className="py-3 text-right text-sm font-medium">235.00</td>
              </tr>
              <tr className="border-t-2 border-indigo-600 font-bold">
                <td className="py-4 text-sm">Total Earnings</td>
                <td className="py-4 text-right text-sm">12,500.00</td>
                <td className="px-6"></td>
                <td className="py-4 text-sm">Total Deductions</td>
                <td className="py-4 text-right text-sm">3,200.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Net Pay */}
        <div className="bg-indigo-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">Net Salary (Take Home)</p>
              <p className="text-4xl font-bold mt-1">$9,300.00</p>
              <p className="text-xs opacity-75 mt-1">Paid via Direct Deposit on March 31, 2026</p>
            </div>
            <span className="material-symbols-outlined text-5xl opacity-20">payments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayslipView;
