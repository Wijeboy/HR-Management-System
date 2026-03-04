import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth Pages
import Login from './pages/Auth/Login';
import ForgotPassword from './pages/Auth/ForgotPassword';

// Dashboard Pages
import Dashboard from './pages/Dashboard/Dashboard';

// Employee Pages
import EmployeeList from './pages/Employees/EmployeeList';
import EmployeeDetails from './pages/Employees/EmployeeDetails';
import AddEmployee from './pages/Employees/AddEmployee';
import EditEmployee from './pages/Employees/EditEmployee';

// Attendance Pages
import AttendanceList from './pages/Attendance/AttendanceList';
import AttendanceReports from './pages/Attendance/AttendanceReports';

// Leave Pages
import LeaveRequests from './pages/Leave/LeaveRequests';
import LeaveBalance from './pages/Leave/LeaveBalance';
import ApplyLeave from './pages/Leave/ApplyLeave';

// Payroll Pages
import PayrollList from './pages/Payroll/PayrollList';
import GeneratePayroll from './pages/Payroll/GeneratePayroll';
import PayslipView from './pages/Payroll/PayslipView';

// Recruitment Pages
import JobPostings from './pages/Recruitment/JobPostings';
import Applicants from './pages/Recruitment/Applicants';
import OnboardingTasks from './pages/Recruitment/OnboardingTasks';

// Performance Pages
import PerformanceReviews from './pages/Performance/PerformanceReviews';
import GoalsKPIs from './pages/Performance/GoalsKPIs';

// Reports Pages
import Reports from './pages/Reports/Reports';

// Settings Pages
import Profile from './pages/Settings/Profile';
import Settings from './pages/Settings/Settings';

// 404 Page
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              {/* Dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Employees */}
              <Route path="/employees" element={<EmployeeList />} />
              <Route path="/employees/:id" element={<EmployeeDetails />} />
              <Route path="/employees/add" element={<AddEmployee />} />
              <Route path="/employees/edit/:id" element={<EditEmployee />} />

              {/* Attendance */}
              <Route path="/attendance" element={<AttendanceList />} />
              <Route path="/attendance/reports" element={<AttendanceReports />} />

              {/* Leave */}
              <Route path="/leave/requests" element={<LeaveRequests />} />
              <Route path="/leave/balance" element={<LeaveBalance />} />
              <Route path="/leave/apply" element={<ApplyLeave />} />

              {/* Payroll */}
              <Route path="/payroll" element={<PayrollList />} />
              <Route path="/payroll/generate" element={<GeneratePayroll />} />
              <Route path="/payroll/payslip/:id" element={<PayslipView />} />

              {/* Recruitment */}
              <Route path="/recruitment/jobs" element={<JobPostings />} />
              <Route path="/recruitment/applicants" element={<Applicants />} />
              <Route path="/recruitment/onboarding" element={<OnboardingTasks />} />

              {/* Performance */}
              <Route path="/performance/reviews" element={<PerformanceReviews />} />
              <Route path="/performance/goals" element={<GoalsKPIs />} />

              {/* Reports */}
              <Route path="/reports" element={<Reports />} />

              {/* Settings */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
