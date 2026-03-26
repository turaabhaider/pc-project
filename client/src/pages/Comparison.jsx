import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ComparisonTable = ({ itemA, itemB }) => {
  if (!itemA || !itemB) return <p style={{ color: 'white' }}>Select systems to compare</p>;
  return (
    <div className="comparison-container">
      <table className="comp-table" style={{ width: '100%', color: 'white', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #333' }}>
            <th style={{ textAlign: 'left', padding: '10px' }}>Feature</th>
            <th style={{ padding: '10px' }}>{itemA.name}</th>
            <th style={{ padding: '10px' }}>{itemB.name}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{ padding: '10px' }}>CPU</td><td style={{ textAlign: 'center' }}>{itemA.cpu}</td><td style={{ textAlign: 'center' }}>{itemB.cpu}</td></tr>
          <tr><td style={{ padding: '10px' }}>GPU</td><td style={{ textAlign: 'center' }}>{itemA.gpu}</td><td style={{ textAlign: 'center' }}>{itemB.gpu}</td></tr>
          <tr><td style={{ padding: '10px' }}>RAM</td><td style={{ textAlign: 'center' }}>{itemA.ram}</td><td style={{ textAlign: 'center' }}>{itemB.ram}</td></tr>
          <tr><td style={{ padding: '10px' }}>Price</td><td style={{ textAlign: 'center' }}>${itemA.price}</td><td style={{ textAlign: 'center' }}>${itemB.price}</td></tr>
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

  if (computers.length === 0) return <div style={{ color: 'cyan' }}>Connecting to Hardware API...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: 'cyan', marginBottom: '1.5rem' }}>Compare Systems</h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <select value={selectA?.id} onChange={(e) => setSelectA(computers.find(c => c.id === parseInt(e.target.value)))}>
          {computers.map(pc => <option key={pc.id} value={pc.id}>{pc.name}</option>)}
        </select>
        <span style={{ alignSelf: 'center', color: 'white' }}>VS</span>
        <select value={selectB?.id} onChange={(e) => setSelectB(computers.find(c => c.id === parseInt(e.target.value)))}>
          {computers.map(pc => <option key={pc.id} value={pc.id}>{pc.name}</option>)}
        </select>
      </div>
      <ComparisonTable itemA={selectA} itemB={selectB} />
    </div>
  );
};

export default Comparison;