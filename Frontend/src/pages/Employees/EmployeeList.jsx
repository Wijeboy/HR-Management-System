import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const employees = [
    { id: 'EMP-0001', name: 'Sarah Williams', department: 'Engineering', role: 'Senior Developer', email: 'sarah.w@company.com', status: 'Active' },
    { id: 'EMP-0002', name: 'John Davis', department: 'Sales', role: 'Sales Manager', email: 'john.d@company.com', status: 'Active' },
    { id: 'EMP-0003', name: 'Michael Johnson', department: 'HR', role: 'HR Specialist', email: 'michael.j@company.com', status: 'Active' },
    { id: 'EMP-0004', name: 'Emily Chen', department: 'Finance', role: 'Accountant', email: 'emily.c@company.com', status: 'Active' },
    { id: 'EMP-0005', name: 'Robert Taylor', department: 'Engineering', role: 'DevOps Engineer', email: 'robert.t@company.com', status: 'On Leave' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">All Employees</h3>
          <p className="text-gray-500 mt-1">Manage access, status, and department details.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 rounded-lg border border-gray-200 bg-white text-gray-600 font-medium text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors">
            <span className="material-symbols-outlined" style={{fontSize: '20px'}}>file_upload</span>
            Export
          </button>
          <Link
            to="/employees/add"
            className="h-10 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
          >
            <span className="material-symbols-outlined" style={{fontSize: '20px'}}>add</span>
            Add Employee
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm text-gray-600">
            <span className="material-symbols-outlined text-gray-400" style={{fontSize: '18px'}}>filter_list</span>
            <span className="font-medium">Filter By:</span>
          </div>
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:border-indigo-600/50 transition-colors text-gray-700">
              Department
              <span className="material-symbols-outlined text-gray-400" style={{fontSize: '18px'}}>expand_more</span>
            </button>
          </div>
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:border-indigo-600/50 transition-colors text-gray-700">
              Status
              <span className="material-symbols-outlined text-gray-400" style={{fontSize: '18px'}}>expand_more</span>
            </button>
          </div>
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:border-indigo-600/50 transition-colors text-gray-700">
              Role
              <span className="material-symbols-outlined text-gray-400" style={{fontSize: '18px'}}>expand_more</span>
            </button>
          </div>
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:border-indigo-600/50 transition-colors text-gray-700">
              Location
              <span className="material-symbols-outlined text-gray-400" style={{fontSize: '18px'}}>expand_more</span>
            </button>
          </div>
          <div className="ml-auto">
            <button className="text-sm text-indigo-600 font-medium hover:underline">Clear all</button>
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-200">
                <th className="p-4 pl-6 w-12">
                  <input className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" type="checkbox" />
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Employee Name
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right pr-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employees.map((employee) => (
                <tr key={employee.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="p-4 pl-6">
                    <input className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" type="checkbox" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold ring-2 ring-white">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{employee.name}</p>
                        <p className="text-xs text-gray-500">{employee.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600 font-mono">
                    #{employee.id}
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {employee.role}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                      employee.department === 'Engineering' 
                        ? 'bg-purple-50 text-purple-700 border-purple-100' 
                        : employee.department === 'Sales'
                        ? 'bg-blue-50 text-blue-700 border-blue-100'
                        : employee.department === 'HR'
                        ? 'bg-green-50 text-green-700 border-green-100'
                        : 'bg-orange-50 text-orange-700 border-orange-100'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        employee.department === 'Engineering'
                          ? 'bg-purple-500'
                          : employee.department === 'Sales'
                          ? 'bg-blue-500'
                          : employee.department === 'HR'
                          ? 'bg-green-500'
                          : 'bg-orange-500'
                      }`}></span>
                      {employee.department}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${
                      employee.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="p-4 text-right pr-6">
                    <button className="text-gray-400 hover:text-indigo-600 transition-colors p-1 rounded-md hover:bg-gray-100">
                      <span className="material-symbols-outlined" style={{fontSize: '20px'}}>more_vert</span>
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
            Showing 1 to 5 of 847 employees
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              3
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

export default EmployeeList;
