import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ComparisonTable = ({ itemA, itemB }) => {
  if (!itemA || !itemB) return <p>Select systems to compare</p>;
  return (
    <div className="comparison-container">
      <table className="comp-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>{itemA.name}</th>
            <th>{itemB.name}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>CPU</td><td>{itemA.cpu}</td><td>{itemB.cpu}</td></tr>
          <tr><td>GPU</td><td>{itemA.gpu}</td><td>{itemB.gpu}</td></tr>
          <tr><td>RAM</td><td>{itemA.ram}</td><td>{itemB.ram}</td></tr>
          <tr><td>Price</td><td>${itemA.price}</td><td>${itemB.price}</td></tr>
        </tbody>
      </table>
    </div>
  );
};

const Comparison = () => {
  const [computers, setComputers] = useState([]);
  const [selectA, setSelectA] = useState(null);
  const [selectB, setSelectB] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // FIX: Use relative path to avoid "Connection Refused"
        const response = await axios.get('/api/computers');
        setComputers(response.data);
        if (response.data.length >= 2) {
          setSelectA(response.data[0]);
          setSelectB(response.data[1]);
        }
      } catch (error) {
        console.error("Failed to fetch live hardware:", error);
      }
    };
    fetchData();
  }, []);

  if (computers.length === 0) return <div className="loading">Connecting to Hardware API...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: 'cyan', marginBottom: '1.5rem' }}>Compare Systems</h2>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <select 
          value={selectA?.id} 
          onChange={(e) => setSelectA(computers.find(c => c.id === parseInt(e.target.value)))}
        >
          {computers.map(pc => <option key={pc.id} value={pc.id}>{pc.name}</option>)}
        </select>

        <span style={{ alignSelf: 'center', color: 'white' }}>VS</span>

        <select 
          value={selectB?.id} 
          onChange={(e) => setSelectB(computers.find(c => c.id === parseInt(e.target.value)))}
        >
          {computers.map(pc => <option key={pc.id} value={pc.id}>{pc.name}</option>)}
        </select>
      </div>

      <ComparisonTable itemA={selectA} itemB={selectB} />
    </div>
  );
};

export default Comparison;