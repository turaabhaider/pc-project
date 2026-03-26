import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [computers, setComputers] = useState([]);

  useEffect(() => {
    const fetchHardware = async () => {
      try {
        // FIX: Removed 'http://localhost:5000'. 
        // This relative path allows the browser to talk to your Railway server.
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
      
      <div className="hardware-grid">
        {computers.length > 0 ? (
          computers.map((pc) => (
            <div key={pc.id} className="hardware-card">
              <h3>{pc.name}</h3>
              <p><strong>CPU:</strong> {pc.cpu}</p>
              <p><strong>GPU:</strong> {pc.gpu}</p>
              <div className="card-footer">
                <span>${pc.price}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="loading">Initializing hardware data streams...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;