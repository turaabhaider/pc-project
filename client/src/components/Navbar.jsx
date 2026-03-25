import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setAuth }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1 onClick={() => navigate('/')}>FutureTech 🚀</h1>
      <div className="nav-links">
        <button onClick={() => navigate('/')}>Dashboard</button>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;