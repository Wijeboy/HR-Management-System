import { Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // No authentication check - allow access to all routes for testing
  return <Outlet />;
};

export default PrivateRoute;
