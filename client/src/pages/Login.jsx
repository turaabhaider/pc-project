import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // FIX: Changed 'http://localhost:5000/api/auth/login' to '/api/auth/login'
      const response = await axios.post('/api/auth/login', { email, password });
      
      localStorage.setItem('token', response.data.token);
      setAuth(true);
      navigate('/');
    } catch (error) {
      alert("Login Failed: " + (error.response?.data?.message || "Server Error"));
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-glow-top"></div>
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo-icon"></div>
          <h2>FutureTech <span>Login</span></h2>
          <p>Access the Hardware Supremacy Dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="input-group">
            <label>EMAIL ADDRESS</label>
            <input 
              type="email" 
              placeholder="name@futuretech.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="input-group">
            <label>PASSWORD</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="auth-submit">
            INITIALIZE SESSION
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
      <div className="auth-glow-bottom"></div>
    </div>
  );
};

export default Login;