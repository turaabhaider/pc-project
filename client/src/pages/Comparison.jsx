import React, { useState } from 'react';

// This is the component you asked about! 
// We define it here so we can use it below.
const ComparisonTable = ({ itemA, itemB }) => (
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
        <tr><td>Release</td><td>{itemA.release}</td><td>{itemB.release}</td></tr>
        <tr><td>Price</td><td>${itemA.price}</td><td>${itemB.price}</td></tr>
      </tbody>
    </table>
  </div>
);

const Comparison = () => {
  // Mock data for now - usually this comes from your API
  const computers = [
    { id: 1, name: "Quantum X1", cpu: "Intel i9-14900K", gpu: "RTX 4090", ram: "64GB DDR5", release: "Nov 2025", price: 3500 },
    { id: 2, name: "Nebula Pro", cpu: "Ryzen 9 7950X", gpu: "RX 7900 XTX", ram: "32GB DDR5", release: "Dec 2025", price: 2800 },
    { id: 3, name: "Titan V8", cpu: "Threadripper", gpu: "Dual RTX 4080", ram: "128GB DDR5", release: "Jan 2026", price: 5200 }
  ];

  const [selectA, setSelectA] = useState(computers[0]);
  const [selectB, setSelectB] = useState(computers[1]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>Compare Systems</h2>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <select onChange={(e) => setSelectA(computers.find(c => c.id === parseInt(e.target.value)))}>
          {computers.map(pc => <option key={pc.id} value={pc.id}>{pc.name}</option>)}
        </select>

        <span style={{ alignSelf: 'center' }}>VS</span>

        <select onChange={(e) => setSelectB(computers.find(c => c.id === parseInt(e.target.value)))}>
          {computers.map(pc => <option key={pc.id} value={pc.id}>{pc.name}</option>)}
        </select>
      </div>

      <ComparisonTable itemA={selectA} itemB={selectB} />
    </div>
  );
};

export default Comparison;