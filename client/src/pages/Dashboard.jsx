import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [computers, setComputers] = useState([]);

  useEffect(() => {
    const fetchHardware = async () => {
      try {
        // FIX: Change 'http://localhost:5000/api/computers' to '/api/computers'
        const response = await axios.get('/api/computers');
        setComputers(response.data);
      } catch (error) {
        console.error("Hardware synchronization failed:", error);
      }
    };
    fetchHardware();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <h2 className="system-status">SYSTEM STATUS: OPTIMAL</h2>
      
      <div className="hardware-grid" style={{ display: 'flex', gap: '2rem', justifyContent: 'center', padding: '2rem' }}>
        {computers.length > 0 ? (
          computers.map((pc) => (
            <div key={pc.id} className="hardware-card" style={{ background: '#111', border: '1px solid #333', borderRadius: '15px', padding: '1.5rem', width: '400px' }}>
              <h3 style={{ color: 'white' }}>{pc.name}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', color: '#888', fontSize: '0.8rem' }}>
                <p>PROCESSOR<br/><span style={{ color: 'white' }}>{pc.cpu}</span></p>
                <p>GRAPHICS<br/><span style={{ color: 'white' }}>{pc.gpu}</span></p>
                <p>MEMORY<br/><span style={{ color: 'white' }}>{pc.ram || '64GB'}</span></p>
                <p>STORAGE<br/><span style={{ color: 'white' }}>{pc.storage || '4TB'}</span></p>
              </div>
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'cyan', fontSize: '1.5rem' }}>${pc.price}</span>
                <button style={{ background: 'linear-gradient(to right, #007cf0, #00dfd8)', border: 'none', padding: '10px 20px', borderRadius: '5px', color: 'white', fontWeight: 'bold' }}>
                  CONFIGURE SYSTEM
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: '#555' }}>Initializing hardware data streams...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;