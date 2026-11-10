import React from 'react';
import { useAuth } from '../../context/AuthContext';

const CandidateDashboard = () => {
  const { profile } = useAuth();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Welcome, {profile?.name || 'Candidate'}!</h2>
      <p className="text-gray-700">This is your candidate dashboard.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">Resume Upload (Coming Soon)</div>
        <div className="p-4 bg-white rounded shadow">AI Mock Interview (Coming Soon)</div>
        <div className="p-4 bg-white rounded shadow">Interview History (Coming Soon)</div>
        <div className="p-4 bg-white rounded shadow">Performance Analytics (Coming Soon)</div>
      </div>
    </div>
  );
};

export default CandidateDashboard;

