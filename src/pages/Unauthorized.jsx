import React from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Simple access-denied page.
 */
const Unauthorized = () => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded shadow p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
        <p className="mb-6">You do not have permission to view this page.</p>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
