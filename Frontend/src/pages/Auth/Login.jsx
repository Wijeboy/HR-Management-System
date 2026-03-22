import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  // Dummy credentials — aligned with backend/data/dummyData.js
  // employeeId must match dummyEmployees[].id in dummyData.js
  const dummyUsers = [
    { role: 'admin',    email: 'admin@company.com',    password: 'admin123',    name: 'Admin User',         department: 'IT',               id: 'user_admin_001',    employeeId: 'EMP001' },
    { role: 'hr',       email: 'hr@company.com',       password: 'hr123',       name: 'HR Manager',         department: 'Human Resources',  id: 'user_hr_001',       employeeId: 'EMP002' },
    { role: 'manager',  email: 'manager@company.com',  password: 'manager123',  name: 'Department Manager', department: 'Engineering',       id: 'user_manager_001',  employeeId: 'EMP003' },
    { role: 'employee', email: 'employee@company.com', password: 'employee123', name: 'John Doe',           department: 'Sales',            id: 'user_employee_001', employeeId: 'EMP004' },
  ];

  const handleQuickLogin = (userType) => {
    const u = dummyUsers.find((d) => d.role === userType);
    if (u) { setEmail(u.email); setPassword(u.password); setSelectedRole(u.role); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = {
        email,
        password,
      };
      if (selectedRole) payload.role = selectedRole;

      const response = await authService.login(payload);

      const token = response?.data?.token;
      const user = response?.data?.user;

      if (!token || !user) {
        setError('Login response is invalid. Please try again.');
        return;
      }

      login(user, token);
    } catch (err) {
      setError(err?.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="pt-8 pb-6 px-8 flex flex-col items-center">
          <div className="mb-6 flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600/10 text-indigo-600">
            <span className="material-symbols-outlined text-[32px]">dataset</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight text-center">FUCHSIUS HRMS</h1>
          <p className="mt-2 text-sm text-gray-600 text-center">Enter your credentials to access your workspace</p>
        </div>

        {/* Quick Login */}
        <div className="px-8 pb-4">
          <p className="text-xs font-medium text-gray-500 mb-3 text-center">Quick Login (Demo Accounts)</p>
          <div className="grid grid-cols-2 gap-2">
            {[['admin','🔑 Admin'],['hr','👤 HR Manager'],['manager','📊 Manager'],['employee','👨‍💼 Employee']].map(([role, label]) => (
              <button key={role} type="button" onClick={() => handleQuickLogin(role)}
                className="px-3 py-2 text-xs font-medium rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700 transition-colors">
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form className="px-8 pb-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-900" htmlFor="role">Select Role</label>
            <select className="block w-full rounded-lg border-gray-300 bg-white py-2.5 pl-3 pr-10 text-gray-900 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 text-sm"
              id="role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
              <option value="">Auto detect from account</option>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="hr">HR Admin</option>
              <option value="admin">Super Admin</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-900" htmlFor="email">Email / Employee ID / Name</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </div>
              <input className="block w-full rounded-lg border-gray-300 py-2.5 pl-10 pr-3 text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 text-sm"
                id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com or EMP006 or Pramod" required />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-900" htmlFor="password">Password</label>
              <Link to="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline">Forgot password?</Link>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                <span className="material-symbols-outlined text-[20px]">lock</span>
              </div>
              <input className="block w-full rounded-lg border-gray-300 py-2.5 pl-10 pr-10 text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 text-sm"
                id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => setShowPassword(!showPassword)}>
                <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility' : 'visibility_off'}</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}

          <div className="flex items-center">
            <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-600 border-gray-300 rounded" id="remember" />
            <label className="ml-2 block text-sm text-gray-700" htmlFor="remember">Remember me for 30 days</label>
          </div>

          <button type="submit"
            className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-colors">
            <span className="material-symbols-outlined text-[20px]">login</span>
            Sign in to workspace
          </button>

          <div className="pt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs font-semibold text-blue-900 mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs text-blue-800">
              <div><strong>Admin:</strong> admin@company.com / admin123</div>
              <div><strong>HR:</strong> hr@company.com / hr123</div>
              <div><strong>Manager:</strong> manager@company.com / manager123</div>
              <div><strong>Employee:</strong> employee@company.com / employee123</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;