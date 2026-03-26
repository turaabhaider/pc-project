import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Comparison from './pages/Comparison'; // Ensure this file exists
import Navbar from './components/Navbar';

function App() {
  // Check if token exists to keep user logged in on refresh
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <div className="app-container">
      {/* Navbar only shows if logged in */}
      {isAuthenticated && <Navbar setAuth={setAuth} />}
      
      <Routes>
        {/* Auth Routes */}
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/register" 
          element={!isAuthenticated ? <Register /> : <Navigate to="/" />} 
        />

        {/* Protected Dashboard Route */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
        />

        {/* Protected Comparison/Builds Route */}
        <Route 
          path="/builds" 
          element={isAuthenticated ? <Comparison /> : <Navigate to="/login" />} 
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;