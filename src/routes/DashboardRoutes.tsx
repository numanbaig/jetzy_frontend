import { type RouteObject } from 'react-router-dom';
import Settings from '../pages/Settings';
import DashboardOverview from '../pages/DashboardOverview';
import Companies from '../pages/Companies';
import Employees from '../pages/Employees';

export const DashboardRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    children: [
      { index: true, element: <DashboardOverview /> },
      { path: 'overview', element: <DashboardOverview /> },
      { path: 'companies', element: <Companies /> },
      { path: 'employees', element: <Employees /> },
      { path: 'settings', element: <Settings /> },
    ]
  }
];