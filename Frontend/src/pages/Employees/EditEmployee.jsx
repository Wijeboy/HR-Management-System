import React from 'react';
import { useParams } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Edit Employee</h1>
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <p className="text-gray-600">Editing Employee ID: {id}</p>
        <p className="text-sm text-gray-500 mt-4">Edit form will be displayed here.</p>
      </div>
    </div>
  );
};

export default EditEmployee;
