import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        🏛️ Citizen <span>Complaint</span> System
      </div>
      {auth && (
        <div className="navbar-right">
          <span className="navbar-user">
            👤 {auth.name} &nbsp;|&nbsp;
            <strong>{auth.role}</strong>
          </span>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
