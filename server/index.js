const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// --- HARDWARE DATA ---
const computers = [
  { id: 1, name: "Quantum X-1 Platinum", status: "Flagship", cpu: "i9-15900K", gpu: "RTX 5090 Ti", ram: "128GB DDR5", storage: "4TB Gen5", cooling: "360mm Liquid", psu: "1200W Titan", benchmark: 100, price: "4,999" },
  { id: 2, name: "Nebula Storm Pro", status: "High-End", cpu: "Ryzen 9 9950X", gpu: "RX 8900 XTX", ram: "64GB DDR5", storage: "2TB Gen5", cooling: "Air Stealth", psu: "1000W Gold", benchmark: 92, price: "3,299" },
  { id: 3, name: "Titan V8 Overlord", status: "Extreme", cpu: "Threadripper 7980X", gpu: "Dual RTX 5090", ram: "256GB ECC", storage: "16TB RAID 0", cooling: "Custom Loop", psu: "1600W Plat", benchmark: 115, price: "12,499" },
  { id: 4, name: "Ghost Spectre", status: "Silent", cpu: "i7-16700K", gpu: "RTX 5070", ram: "32GB DDR5", storage: "1TB Gen5", cooling: "Passive Fanless", psu: "750W Plat", benchmark: 78, price: "2,199" },
  { id: 5, name: "Neon Pulse Mini", status: "SFF ITX", cpu: "Ryzen 7 9700X", gpu: "RTX 5080", ram: "32GB DDR5", storage: "2TB Gen4", cooling: "240mm AIO", psu: "850W Gold", benchmark: 85, price: "2,499" },
  { id: 6, name: "Aurora Streamer", status: "Creator", cpu: "i9-15900K", gpu: "RTX 5080 Ti", ram: "64GB DDR5", storage: "4TB + 8TB HDD", cooling: "360mm Liquid", psu: "1000W Gold", benchmark: 94, price: "3,899" },
  { id: 7, name: "Vertex Workstation", status: "Pro", cpu: "Xeon w9-3495X", gpu: "RTX 6000 Ada", ram: "512GB ECC", storage: "8TB Gen5", cooling: "Industrial Air", psu: "1300W Plat", benchmark: 108, price: "9,599" },
  { id: 8, name: "Cyberpunk Edge", status: "Themed", cpu: "Ryzen 9 9900X", gpu: "RTX 5070 Ti", ram: "32GB DDR5", storage: "1TB Gen5", cooling: "Neon Liquid", psu: "850W Gold", benchmark: 82, price: "2,299" },
  { id: 9, name: "Shadow Assassin", status: "Elite", cpu: "i5-16600K", gpu: "RTX 5060 Ti", ram: "16GB DDR5", storage: "500GB Gen5", cooling: "Low Profile", psu: "650W Gold", benchmark: 65, price: "1,499" },
  { id: 10, name: "Omega Sentinel", status: "Standard", cpu: "Ryzen 5 9600X", gpu: "RX 8800 XT", ram: "32GB DDR5", storage: "1TB Gen4", cooling: "Standard Air", psu: "750W Gold", benchmark: 72, price: "1,799" }
];

// API Route
app.get('/api/computers', (req, res) => res.json(computers));

// --- THE MONOLITH BRIDGE ---
// This serves the static React files from the client/dist folder
const buildPath = path.join(__dirname, '../client/dist');
app.use(express.static(buildPath));

// Catch-all: Send index.html for any non-API route (handles React Router refreshes)
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Monolith flying on port ${PORT}`));