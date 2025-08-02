import React from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  CircleX,
  LayoutDashboard,
  Menu,
  Building2,
  Users,
  Settings,
  LogOut,
  User
} from 'lucide-react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  IconButton,
} from '@mui/material';
import { logout } from '@/store/slices/auth_slice';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

const SideBarLayout = (): React.JSX.Element => {


  const [isExpanded, setIsExpanded] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state: RootState) => state.auth);

  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard/overview' },
    { label: 'Companies', icon: <Building2 size={20} />, path: '/dashboard/companies' },
    { label: 'Employees', icon: <Users size={20} />, path: '/dashboard/employees' },
  ];

  const handleNavigation = (path: string, index: number) => {
    navigate(path);
  };
const dispatch=useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    dispatch(logout())
    navigate('/auth/login');
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: isExpanded ? 280 : 70,
          backgroundColor: '#2c3e50',
          color: 'white',
          transition: 'width 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid #34495e' }}>
          {isExpanded ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LayoutDashboard size={24} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Jetzy CRM
                </Typography>
              </Box>
              <IconButton
                onClick={() => setIsExpanded(false)}
                sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
              >
                <CircleX size={20} />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton
                onClick={() => setIsExpanded(true)}
                sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
              >
                <Menu size={24} />
              </IconButton>
            </Box>
          )}
        </Box>

        {/* User Profile */}
        {isExpanded && (
          <Box sx={{ p: 2, borderBottom: '1px solid #34495e' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: '#3c8dbc' }}>
                <User size={20} />
              </Avatar>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                  {user?.name??'Administrator'}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  {user?.email??'default@admin.com'}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        {/* Navigation */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <List sx={{ pt: 1 }}>
            {navItems.map((item, index) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => handleNavigation(item.path, index)}
                  sx={{
                    mx: 1,
                    borderRadius: 1,
                    '&.Mui-selected': {
                      backgroundColor: '#3c8dbc',
                      '&:hover': {
                        backgroundColor: '#3c8dbc',
                      },
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  {isExpanded && (
                    <ListItemText 
                      primary={item.label}
                      primaryTypographyProps={{ fontSize: '0.9rem' }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Logout */}
        <Box sx={{ p: 2, borderTop: '1px solid #34495e' }}>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <LogOut size={20} />
            </ListItemIcon>
            {isExpanded && (
              <ListItemText 
                primary="Logout"
                primaryTypographyProps={{ fontSize: '0.9rem' }}
              />
            )}
          </ListItemButton>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, overflow: 'auto', backgroundColor: '#f4f6f9' }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default SideBarLayout;