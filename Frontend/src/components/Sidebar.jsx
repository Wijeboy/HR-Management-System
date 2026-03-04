import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiHome,
  FiUsers,
  FiClock,
  FiCalendar,
  FiDollarSign,
  FiBriefcase,
  FiTrendingUp,
  FiBarChart2,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, isAdmin, isHR, isManager } = useAuth();

  const menuItems = [
    {
      path: '/dashboard',
      icon: FiHome,
      label: 'Dashboard',
      roles: ['admin', 'hr', 'manager', 'employee'],
    },
    {
      path: '/employees',
      icon: FiUsers,
      label: 'Employees',
      roles: ['admin', 'hr', 'manager'],
    },
    {
      path: '/attendance',
      icon: FiClock,
      label: 'Attendance',
      roles: ['admin', 'hr', 'manager', 'employee'],
    },
    {
      path: '/leave/requests',
      icon: FiCalendar,
      label: 'Leave Management',
      roles: ['admin', 'hr', 'manager', 'employee'],
    },
    {
      path: '/payroll',
      icon: FiDollarSign,
      label: 'Payroll',
      roles: ['admin', 'hr'],
    },
    {
      path: '/recruitment/jobs',
      icon: FiBriefcase,
      label: 'Recruitment',
      roles: ['admin', 'hr'],
    },
    {
      path: '/performance/reviews',
      icon: FiTrendingUp,
      label: 'Performance',
      roles: ['admin', 'hr', 'manager', 'employee'],
    },
    {
      path: '/reports',
      icon: FiBarChart2,
      label: 'Reports',
      roles: ['admin', 'hr', 'manager'],
    },
    {
      path: '/settings',
      icon: FiSettings,
      label: 'Settings',
      roles: ['admin'],
    },
  ];

  const hasAccess = (roles) => {
    return roles.includes(user?.role);
  };

  return (
    <div
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } bg-gray-900 text-white transition-all duration-300 flex flex-col`}
    >
      {/* Logo */}
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        {!collapsed && (
          <h2 className="text-xl font-bold text-primary-400">HRMS</h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => {
            if (!hasAccess(item.roles)) return null;

            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                  title={collapsed ? item.label : ''}
                >
                  <Icon className="text-xl flex-shrink-0" />
                  {!collapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
              <span className="text-lg font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
