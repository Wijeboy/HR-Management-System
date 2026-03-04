import React from 'react';
import { useParams } from 'react-router-dom';

const EmployeeDetails = () => {
  const { id } = useParams();
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Employee Details</h1>
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <p className="text-gray-600">Employee ID: {id}</p>
        <p className="text-sm text-gray-500 mt-4">Detailed information will be displayed here.</p>
      </div>
    </div>
  );
};

export default EmployeeDetails;
