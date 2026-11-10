import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Header = () => {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-800 text-white flex justify-between items-center px-4 py-2">
      <h1 className="text-lg font-semibold">SmartHire AI</h1>
      <div className="flex items-center space-x-2">
        {profile && <span className="text-sm">{profile.name}</span>}
        <button onClick={handleLogout} className="flex items-center hover:bg-blue-700 p-1 rounded">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;

