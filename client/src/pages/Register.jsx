import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // FIX: Changed 'http://localhost:5000/api/auth/register' to '/api/auth/register'
      await axios.post('/api/auth/register', { email, password });
      alert("Registration Successful! Please login.");
      navigate('/login');
    } catch (error) {
      alert("Registration Failed: " + (error.response?.data?.message || "Server Error"));
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-glow-top"></div>
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo-icon"></div>
          <h2>Join <span>FutureTech</span></h2>
          <p>Create your Hardware Supremacy account</p>
        </div>

        <form onSubmit={handleRegister} className="auth-form">
          <div className="input-group">
            <label>EMAIL ADDRESS</label>
            <input 
              type="email" 
              placeholder="e.g. pilot@future.tech" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="input-group">
            <label>CREATE PASSWORD</label>
            <input 
              type="password" 
              placeholder="Minimum 8 characters" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="auth-submit register-theme">
            CREATE ACCOUNT
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
      <div className="auth-glow-bottom"></div>
    </div>
  );
};

export default Register;