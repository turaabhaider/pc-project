const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// API Route
app.get('/api/computers', (req, res) => {
  res.json([
    { id: 1, name: "Quantum X-1 Platinum", status: "Flagship", cpu: "i9-15900K", gpu: "RTX 5090 Ti", ram: "128GB DDR5", storage: "4TB Gen5", price: "4,999" },
    { id: 2, name: "Nebula Storm Pro", status: "High-End", cpu: "Ryzen 9 9950X", gpu: "RX 8900 XTX", ram: "64GB DDR5", storage: "2TB Gen5", price: "3,299" },
    { id: 3, name: "Titan V8 Overlord", status: "Extreme", cpu: "Threadripper 7980X", gpu: "Dual RTX 5090", ram: "256GB ECC", storage: "16TB RAID 0", price: "12,499" }
  ]);
});

// --- THE FIX: Serving the Frontend ---
const buildPath = path.join(__dirname, '../client/dist');

// Only try to serve static files if the folder actually exists
app.use(express.static(buildPath));

// For Express 5, we use /*any to catch all frontend routes
app.get('/*any', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'), (err) => {
    if (err) {
      res.status(500).send("Frontend build (dist folder) not found. Please run 'npm run build' in the client folder.");
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));