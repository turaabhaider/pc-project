import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [computers, setComputers] = useState([]);

  useEffect(() => {
    const getPCs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/computers');
        setComputers(response.data);
      } catch (error) {
        console.error("API Error:", error);
      }
    };
    getPCs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="app-wrapper">
      {/* --- REFINED NAVBAR --- */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo-section">
            <div className="logo-icon"></div>
            <h1>FutureTech <span>Supremacy</span></h1>
          </div>
          <div className="nav-actions">
            <button className="nav-link active">Dashboard</button>
            <button className="nav-link">Builds</button>
            <button className="logout-btn" onClick={handleLogout}>LOGOUT</button>
          </div>
        </div>
      </nav>

      <div className="dashboard-container">
        <header className="hero-section">
          <span className="system-status">SYSTEM STATUS: OPTIMAL</span>
          <h2>Hardware Supremacy <span>2026</span></h2>
          <div className="hero-divider"></div>
        </header>

        <div className="pc-grid">
          {computers.map((pc) => (
            <div key={pc.id} className="pc-card">
              <span className="card-badge">{pc.status}</span>
              <div className="card-header">
                <h3>{pc.name}</h3>
              </div>
              
              <div className="rich-specs-grid">
                <div className="spec-tile"><span>PROCESSOR</span><p>{pc.cpu}</p></div>
                <div className="spec-tile"><span>GRAPHICS</span><p>{pc.gpu}</p></div>
                <div className="spec-tile"><span>MEMORY</span><p>{pc.ram}</p></div>
                <div className="spec-tile"><span>STORAGE</span><p>{pc.storage}</p></div>
                <div className="spec-tile"><span>COOLING</span><p>{pc.cooling}</p></div>
                <div className="spec-tile"><span>POWER</span><p>{pc.psu}</p></div>
              </div>

              <div className="performance-meter">
                <div className="meter-label">
                  <span>BENCHMARK POWER</span>
                  <span>{pc.benchmark}%</span>
                </div>
                <div className="meter-bar">
                  <div className="meter-fill" style={{ width: `${Math.min(pc.benchmark, 100)}%` }}></div>
                </div>
              </div>

              <div className="card-footer">
                <div className="price-tag">{pc.price}</div>
                <button className="details-btn">DETAILS</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;