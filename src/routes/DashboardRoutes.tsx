import { type RouteObject } from 'react-router-dom';
import DashboardOverview from '../pages/DashboardOverview';
import { Companies, Employees } from '@/pages';


export const DashboardRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    children: [
      { index: true, element:null },
      { path: 'overview', element: <DashboardOverview /> },
      { path: 'companies', element: <Companies /> },
      { path: 'employees', element: <Employees /> },
    ]
  }
];