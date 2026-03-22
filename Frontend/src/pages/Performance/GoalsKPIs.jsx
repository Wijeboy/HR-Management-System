import React, { useState } from 'react';

const GoalsKPIs = () => {
  const [goals, setGoals] = useState([
    { id: 'GOAL-01', title: 'Reduce attrition below 4%', owner: 'HR', progress: 72, targetDate: '2026-06-30' },
    { id: 'GOAL-02', title: 'Increase engineering productivity by 12%', owner: 'Engineering', progress: 58, targetDate: '2026-07-31' },
    { id: 'GOAL-03', title: 'Improve attendance rate to 97%', owner: 'Operations', progress: 81, targetDate: '2026-05-31' },
  ]);
  const [title, setTitle] = useState('');

  const addGoal = () => {
    if (!title.trim()) return;
    const id = `GOAL-${String(goals.length + 1).padStart(2, '0')}`;
    setGoals((prev) => [...prev, { id, title: title.trim(), owner: 'Admin', progress: 0, targetDate: '2026-12-31' }]);
    setTitle('');
  };

  const incrementProgress = (id) => {
    setGoals((prev) => prev.map((goal) => (goal.id === id ? { ...goal, progress: Math.min(100, goal.progress + 10) } : goal)));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Goals & KPIs</h1>
        <p className="text-gray-500 mt-1">Track organization goals and update progress from one place.</p>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col md:flex-row gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new goal"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
        />
        <button onClick={addGoal} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Add Goal</button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-white p-5 rounded-xl border border-gray-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{goal.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{goal.id} • {goal.owner} • Target: {goal.targetDate}</p>
              </div>
              <button onClick={() => incrementProgress(goal.id)} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">+10%</button>
            </div>
            <div className="mt-4 h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600" style={{ width: `${goal.progress}%` }}></div>
            </div>
            <p className="mt-2 text-sm text-gray-600">Progress: <span className="font-semibold text-gray-900">{goal.progress}%</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsKPIs;
