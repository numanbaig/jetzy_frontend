import { Navigate } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

export default function ProtectedRoute({ children }: { children: React.JSX.Element }) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const token=localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}
