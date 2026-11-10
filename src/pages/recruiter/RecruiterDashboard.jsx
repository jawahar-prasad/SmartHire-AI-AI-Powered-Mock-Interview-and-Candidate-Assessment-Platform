import React from 'react';
import { useAuth } from '../../context/AuthContext';

const RecruiterDashboard = () => {
  const { profile } = useAuth();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Welcome, {profile?.name || 'Recruiter'}!</h2>
      <p className="text-gray-700">This is your recruiter dashboard.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">Candidate Analytics (Coming Soon)</div>
        <div className="p-4 bg-white rounded shadow">Interview Management (Coming Soon)</div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;

