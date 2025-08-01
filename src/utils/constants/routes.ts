//DASHBOARD ROUTES
const DASHBOARD_PATHS = {
  OVERVIEW: '/dashboard/overview',
  ANALYTICS: '/dashboard/analytics',
  PRODUCTS: '/dashboard/products',
  SALES: '/dashboard/sales',
  PAYMENTS: '/dashboard/payments',
  REFUNDS: '/dashboard/refunds',
  INVOICES: '/dashboard/invoices',
  RETURNS: '/dashboard/returns',
  NOTIFICATIONS: '/dashboard/notifications',
  FEEDBACK: '/dashboard/feedback',
  SETTINGS: '/dashboard/settings',
} as const;

const DASHBOARD_PAGE_TITLES = {
  [DASHBOARD_PATHS.OVERVIEW]: 'Overview',
  [DASHBOARD_PATHS.ANALYTICS]: 'Analytics',
  [DASHBOARD_PATHS.PRODUCTS]: 'Products',
  [DASHBOARD_PATHS.SALES]: 'Sales',
  [DASHBOARD_PATHS.PAYMENTS]: 'Payments',
  [DASHBOARD_PATHS.REFUNDS]: 'Refunds',
  [DASHBOARD_PATHS.INVOICES]: 'Invoices',
  [DASHBOARD_PATHS.RETURNS]: 'Returns',
  [DASHBOARD_PATHS.NOTIFICATIONS]: 'Notifications',
  [DASHBOARD_PATHS.FEEDBACK]: 'Feedback',
  [DASHBOARD_PATHS.SETTINGS]: 'Settings',
} as const;

 type DashboardPathType = typeof DASHBOARD_PATHS[keyof typeof DASHBOARD_PATHS];
 type DashboardPageTitleType = typeof DASHBOARD_PAGE_TITLES[keyof typeof DASHBOARD_PAGE_TITLES];


import type { ComponentType } from 'react';
import { 
  LayoutDashboard, BarChart2, Package, ShoppingCart,
  CreditCard, RefreshCw, FileText, RotateCcw,
  Bell, MessageSquare, Settings, Settings2
} from 'lucide-react';

interface NavItemProps {
  label: string;
  path?: string;  
  iconComponent?: ComponentType<{ className?: string }>;
  selectedIconComponent?: ComponentType<{ className?: string }>;  
  isSectionHeader?: boolean;  
}

const navItems: NavItemProps[] = [
  { 
    label: 'Main Menu', 
    isSectionHeader: true 
  },
  { 
    label: 'Overview', 
    path: DASHBOARD_PATHS.OVERVIEW, 
    iconComponent: LayoutDashboard, 
    selectedIconComponent: LayoutDashboard 
  },
  { 
    label: 'Analytics', 
    path: DASHBOARD_PATHS.ANALYTICS, 
    iconComponent: BarChart2, 
    selectedIconComponent: BarChart2 
  },
  { 
    label: 'Products', 
    path: DASHBOARD_PATHS.PRODUCTS, 
    iconComponent: Package, 
    selectedIconComponent: Package 
  },
  { 
    label: 'Transactions', 
    isSectionHeader: true 
  },
  { 
    label: 'Sales', 
    path: DASHBOARD_PATHS.SALES, 
    iconComponent: ShoppingCart, 
    selectedIconComponent: ShoppingCart 
  },
  { 
    label: 'Payments', 
    path: DASHBOARD_PATHS.PAYMENTS, 
    iconComponent: CreditCard, 
    selectedIconComponent: CreditCard 
  },
  { 
    label: 'Refunds', 
    path: DASHBOARD_PATHS.REFUNDS, 
    iconComponent: RefreshCw, 
    selectedIconComponent: RefreshCw 
  },
  { 
    label: 'Invoices', 
    path: DASHBOARD_PATHS.INVOICES, 
    iconComponent: FileText, 
    selectedIconComponent: FileText 
  },
  { 
    label: 'General', 
    isSectionHeader: true 
  },
  { 
    label: 'Returns', 
    path: DASHBOARD_PATHS.RETURNS, 
    iconComponent: RotateCcw, 
    selectedIconComponent: RotateCcw 
  },
  { 
    label: 'Notifications', 
    path: DASHBOARD_PATHS.NOTIFICATIONS, 
    iconComponent: Bell, 
    selectedIconComponent: Bell 
  },
  { 
    label: 'Feedback', 
    path: DASHBOARD_PATHS.FEEDBACK, 
    iconComponent: MessageSquare, 
    selectedIconComponent: MessageSquare 
  },
  { 
    label: 'Settings', 
    path: DASHBOARD_PATHS.SETTINGS, 
    iconComponent: Settings, 
    selectedIconComponent: Settings2 
  }
];

export { navItems,DASHBOARD_PATHS,DASHBOARD_PAGE_TITLES };
export type { NavItemProps,DashboardPathType,DashboardPageTitleType };

