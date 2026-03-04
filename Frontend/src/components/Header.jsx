import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notifications
  const notifications = [
    { id: 1, message: 'New leave request from John Doe', time: '5 min ago', unread: true },
    { id: 2, message: 'Payroll processing completed', time: '1 hour ago', unread: true },
    { id: 3, message: 'Performance review due for 3 employees', time: '2 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b border-gray-200 bg-white px-8 sticky top-0 z-10">
      <div className="flex flex-1 items-center gap-4">
        {/* Search Bar */}
        <div className="relative flex w-full max-w-md items-center">
          <span className="absolute left-3 text-gray-500 material-symbols-outlined">search</span>
          <input
            className="h-10 w-full rounded-lg border-none bg-slate-100 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-600"
            placeholder="Search employees, departments, or requests..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Create Request Button */}
        <Link
          to="/leave/apply"
          className="flex h-10 items-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Create Request</span>
        </Link>

        <div className="h-6 w-px bg-gray-200"></div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex w-10 h-10 items-center justify-center rounded-lg text-gray-600 hover:bg-slate-100 hover:text-gray-900 transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                      notification.unread ? 'bg-blue-50' : ''
                    }`}
                  >
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-200 text-center">
                <Link 
                  to="/notifications" 
                  className="text-sm text-indigo-600 hover:text-indigo-700"
                  onClick={() => setShowNotifications(false)}
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Help Button */}
        <button className="flex w-10 h-10 items-center justify-center rounded-lg text-gray-600 hover:bg-slate-100 hover:text-gray-900 transition-colors">
          <span className="material-symbols-outlined text-[24px]">help</span>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="text-left hidden md:block">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </button>

          {/* User Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)}
              >
                <span className="material-symbols-outlined text-[20px]">person</span>
                <span>My Profile</span>
              </Link>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  logout();
                }}
                className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
