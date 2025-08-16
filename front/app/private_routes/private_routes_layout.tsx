import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../hooks/use_auth';
import { Box, CircularProgress } from '@mui/material';
import { Outlet } from "react-router";


interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default function PrivateLayout() {
  return (
    <PrivateRoute>
      <Outlet />
    </PrivateRoute>
  );
}