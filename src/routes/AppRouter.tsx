import { useRoutes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DashboardLayout } from '../layout';
import { DashboardRoutes } from './DashboardRoutes';
import { Login } from '../pages/auth';
import ProtectedRoute from './ProtectedRoute';
import type { RootState } from '@/store/store';


export default function AppRouter() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const token=localStorage.getItem("authToken");
console.log(isLoggedIn,"inAPP ROUTER");
  const routes = useRoutes([
    {
      path: '/',
      element: token
        ? <Navigate to="/dashboard/overview" replace />
        : <Navigate to="/auth/login" replace />
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
    }
  ]);

  return routes;
}
