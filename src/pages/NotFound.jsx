import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div className="max-w-md w-full bg-white rounded shadow p-6 text-center">
      <h2 className="text-3xl font-bold mb-4">404 – Page Not Found</h2>
      <p className="mb-6">The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-600 hover:underline">Return Home</Link>
    </div>
  </div>
);

export default NotFound;

