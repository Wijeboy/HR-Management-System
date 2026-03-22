import React, { useMemo, useState } from 'react';

const Applicants = () => {
  const [stageFilter, setStageFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [applicants, setApplicants] = useState([
    { id: 'APP-001', name: 'Kasun Perera', role: 'Senior React Developer', experience: '5 years', stage: 'screening', score: 72 },
    { id: 'APP-002', name: 'Nimali Fernando', role: 'HR Executive', experience: '3 years', stage: 'interview', score: 81 },
    { id: 'APP-003', name: 'Ruwan Silva', role: 'Payroll Specialist', experience: '4 years', stage: 'offer', score: 88 },
    { id: 'APP-004', name: 'Dilani Jayasuriya', role: 'UI Designer', experience: '2 years', stage: 'applied', score: 63 },
  ]);

  const filtered = useMemo(() => {
    return applicants.filter((a) => {
      const matchesStage = stageFilter === 'all' || a.stage === stageFilter;
      const text = `${a.id} ${a.name} ${a.role}`.toLowerCase();
      const matchesSearch = text.includes(search.toLowerCase());
      return matchesStage && matchesSearch;
    });
  }, [applicants, stageFilter, search]);

  const advanceStage = (id) => {
    const order = ['applied', 'screening', 'interview', 'offer', 'hired'];
    setApplicants((prev) => prev.map((a) => {
      if (a.id !== id) return a;
      const currentIndex = order.indexOf(a.stage);
      const nextIndex = Math.min(order.length - 1, currentIndex + 1);
      return { ...a, stage: order[nextIndex] };
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Job Applicants</h1>
        <p className="text-gray-500 mt-1">Track candidates through recruitment stages.</p>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">search</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search applicants" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg" />
        </div>
        <select value={stageFilter} onChange={(e) => setStageFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg">
          <option value="all">All Stages</option>
          <option value="applied">Applied</option>
          <option value="screening">Screening</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="hired">Hired</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Applicant</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Role</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Experience</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Score</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">Stage</th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <p className="text-sm font-semibold text-gray-900">{a.name}</p>
                    <p className="text-xs text-gray-500">{a.id}</p>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-700">{a.role}</td>
                  <td className="px-5 py-3 text-sm text-gray-700">{a.experience}</td>
                  <td className="px-5 py-3 text-sm text-gray-700">{a.score}</td>
                  <td className="px-5 py-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700">{a.stage}</span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => advanceStage(a.id)} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Advance</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-gray-500">No applicants match your filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Applicants;
