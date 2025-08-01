import { useRoutes, Navigate } from 'react-router-dom';
import { DashboardLayout, } from '../layout';
import { DashboardRoutes } from './DashboardRoutes';
import { Login } from '../pages/auth';
import ProtectedRoute from './ProtectedRoute';


export default function AppRouter() {
const login=true;
  
  const routes = useRoutes([
    {
      path: '/',
      element:login ? <Navigate to="/dashboard/overview" replace /> : <Navigate to="/auth/login" replace />
    },
    {
      path: '/auth',
      children: [
        { index: true, element: <Login /> },
        { path: 'login', element: <Login /> },
      ]
    },

    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>

      ),
      children: DashboardRoutes[0].children
    },

  ]);

  return routes;
}