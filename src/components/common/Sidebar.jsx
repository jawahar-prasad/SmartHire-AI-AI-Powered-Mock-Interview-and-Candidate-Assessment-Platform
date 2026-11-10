import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Simple sidebar with role‑based links
const Sidebar = () => {
  const { profile } = useAuth();
  const location = useLocation();
  const role = profile?.role;

  const links = [
    { to: '/candidate/dashboard', label: 'Candidate Dashboard', roles: ['candidate'] },
    { to: '/recruiter/dashboard', label: 'Recruiter Dashboard', roles: ['recruiter'] },
    { to: '/admin/dashboard', label: 'Admin Dashboard', roles: ['admin'] },
  ];

  return (
    <nav className="bg-blue-800 text-white w-64 min-h-screen p-4 hidden md:block">
      <h2 className="text-xl font-bold mb-6">SmartHire AI</h2>
      <ul>
        {links
          .filter((ln) => ln.roles.includes(role))
          .map((ln) => (
            <li key={ln.to} className="mb-2">
              <Link
                to={ln.to}
                className={`block px-3 py-2 rounded hover:bg-blue-700 ${location.pathname === ln.to ? 'bg-blue-700' : ''}`}
              >
                {ln.label}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Sidebar;

