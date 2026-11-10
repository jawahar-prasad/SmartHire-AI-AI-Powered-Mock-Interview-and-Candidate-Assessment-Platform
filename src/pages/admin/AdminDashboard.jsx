import React from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { profile } = useAuth();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Welcome, {profile?.name || 'Admin'}!</h2>
      <p className="text-gray-700">This is your admin dashboard.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">User Management (Coming Soon)</div>
        <div className="p-4 bg-white rounded shadow">Recruiter Management (Coming Soon)</div>
        <div className="p-4 bg-white rounded shadow">Platform Settings (Coming Soon)</div>
      </div>
    </div>
  );
};

export default AdminDashboard;

