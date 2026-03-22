import React, { useMemo, useState } from 'react';

const JobPostings = () => {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [newTitle, setNewTitle] = useState('');
  const [newDepartment, setNewDepartment] = useState('Engineering');
  const [newLocation, setNewLocation] = useState('Colombo');

  const [jobs, setJobs] = useState([
    { id: 'JOB-101', title: 'Senior React Developer', department: 'Engineering', location: 'Colombo', applicants: 28, postedOn: '2026-03-01', status: 'open' },
    { id: 'JOB-102', title: 'HR Executive', department: 'Human Resources', location: 'Kandy', applicants: 12, postedOn: '2026-03-03', status: 'open' },
    { id: 'JOB-103', title: 'Payroll Specialist', department: 'Finance', location: 'Remote', applicants: 9, postedOn: '2026-02-22', status: 'closed' },
  ]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesStatus = status === 'all' || job.status === status;
      const text = `${job.id} ${job.title} ${job.department} ${job.location}`.toLowerCase();
      const matchesSearch = text.includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [jobs, search, status]);

  const createJob = () => {
    if (!newTitle.trim()) return;
    const id = `JOB-${100 + jobs.length + 1}`;
    const item = {
      id,
      title: newTitle.trim(),
      department: newDepartment,
      location: newLocation,
      applicants: 0,
      postedOn: new Date().toISOString().slice(0, 10),
      status: 'open',
    };
    setJobs((prev) => [item, ...prev]);
    setNewTitle('');
    setShowForm(false);
  };

  const toggleStatus = (id) => {
    setJobs((prev) => prev.map((job) => (job.id === id ? { ...job, status: job.status === 'open' ? 'closed' : 'open' } : job)));
  };

  const exportCsv = () => {
    const header = 'Job ID,Title,Department,Location,Applicants,Posted On,Status';
    const rows = filteredJobs.map((job) => [
      job.id,
      job.title,
      job.department,
      job.location,
      job.applicants,
      job.postedOn,
      job.status,
    ].join(','));
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'job-postings.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Postings</h1>
          <p className="text-gray-500 mt-1">Manage open roles, applications, and publishing status.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={exportCsv} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <span className="material-symbols-outlined text-xl">download</span>
            Export
          </button>
          <button onClick={() => setShowForm((prev) => !prev)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <span className="material-symbols-outlined text-xl">add</span>
            Create Job Posting
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-4 rounded-xl border border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-3">
          <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Job title" className="px-3 py-2 border border-gray-300 rounded-lg" />
          <select value={newDepartment} onChange={(e) => setNewDepartment(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Finance</option>
            <option>Sales</option>
            <option>IT</option>
          </select>
          <input value={newLocation} onChange={(e) => setNewLocation(e.target.value)} placeholder="Location" className="px-3 py-2 border border-gray-300 rounded-lg" />
          <button onClick={createJob} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Save Posting</button>
        </div>
      )}

      <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">search</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg">
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Job</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Department</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Location</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Applicants</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Posted</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Status</th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <p className="text-sm font-semibold text-gray-900">{job.title}</p>
                    <p className="text-xs text-gray-500">{job.id}</p>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-700">{job.department}</td>
                  <td className="px-5 py-3 text-sm text-gray-700">{job.location}</td>
                  <td className="px-5 py-3 text-sm text-gray-700">{job.applicants}</td>
                  <td className="px-5 py-3 text-sm text-gray-700">{job.postedOn}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${job.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => toggleStatus(job.id)} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                      {job.status === 'open' ? 'Close' : 'Reopen'}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredJobs.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-gray-500">No job postings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobPostings;
