import { Navigate } from 'react-router-dom';
import React from 'react';

export default function ProtectedRoute({ children }: { children: React.JSX.Element }) {
  const login=false;

  if (login) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}