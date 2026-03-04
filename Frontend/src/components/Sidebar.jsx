import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const mainMenuItems = [
    {
      path: '/dashboard',
      icon: 'dashboard',
      label: 'Dashboard',
    },
    {
      path: '/employees',
      icon: 'group',
      label: 'Employees',
    },
    {
      path: '/attendance',
      icon: 'schedule',
      label: 'Attendance',
    },
    {
      path: '/leave/requests',
      icon: 'event',
      label: 'Leave Management',
    },
    {
      path: '/payroll',
      icon: 'payments',
      label: 'Payroll',
    },
    {
      path: '/recruitment/jobs',
      icon: 'work',
      label: 'Recruitment',
    },
    {
      path: '/performance/reviews',
      icon: 'trending_up',
      label: 'Performance',
    },
  ];

  const managementItems = [
    {
      path: '/reports',
      icon: 'bar_chart',
      label: 'Reports',
    },
    {
      path: '/settings',
      icon: 'settings',
      label: 'Settings',
    },
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <aside className="flex w-72 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-6 border-b border-gray-200">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
          <span className="material-symbols-outlined text-xl">hexagon</span>
        </div>
        <h1 className="text-lg font-bold tracking-tight text-gray-900">HRMS</h1>
      </div>

      {/* Navigation */}
      <div className="flex flex-1 flex-col justify-between overflow-y-auto px-4 py-6">
        <div className="flex flex-col gap-6">
          {/* User Profile */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">{user?.name || 'Guest User'}</span>
              <span className="text-xs text-gray-500 capitalize">{user?.role || 'Guest'}</span>
            </div>
          </div>

          {/* Main Menu */}
          <nav className="flex flex-col gap-1">
            <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Main Menu</p>
            {mainMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                  isActive(item.path)
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Management Section */}
          <nav className="flex flex-col gap-1">
            <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Management</p>
            {managementItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                  isActive(item.path)
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
