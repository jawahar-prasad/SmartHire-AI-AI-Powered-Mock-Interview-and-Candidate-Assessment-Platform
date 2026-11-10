import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Protects routes based on the user's role.
 * `allowedRoles` is an array of role strings, e.g. ['admin'].
 */
const RoleRoute = ({ allowedRoles, children }) => {
  const { profile, loading } = useAuth();

  if (loading) {
    // Placeholder while loading; could be a spinner.
    return null;
  }

  // If not authenticated or profile missing, redirect to login.
  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = allowedRoles.includes(profile.role);
  return hasAccess ? children : <Navigate to="/unauthorized" replace />;
};

export default RoleRoute;

