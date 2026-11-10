import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Simple layout for auth pages (login, register, forgot password)
const AuthLayout = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <Outlet />
  </div>
);

export default AuthLayout;

