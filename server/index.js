const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// --- IN-MEMORY DATA (No Database) ---
const users = []; 
const computers = [
  { id: 1, name: "Quantum X-1 Platinum", status: "Flagship", cpu: "i9-15900K", gpu: "RTX 5090 Ti", ram: "128GB DDR5", storage: "4TB Gen5", price: "4,999" },
  { id: 2, name: "Nebula Storm Pro", status: "High-End", cpu: "Ryzen 9 9950X", gpu: "RX 8900 XTX", ram: "64GB DDR5", storage: "2TB Gen5", price: "3,299" },
  { id: 3, name: "Titan V8 Overlord", status: "Extreme", cpu: "Threadripper 7980X", gpu: "Dual RTX 5090", ram: "256GB ECC", storage: "16TB RAID 0", price: "12,499" }
];

// --- AUTH ROUTES ---
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing fields" });

    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Hardware Route
app.get('/api/computers', (req, res) => res.json(computers));

// --- MONOLITH SERVING ---
const buildPath = path.join(__dirname, '../client/dist');
app.use(express.static(buildPath));

// Express 5 wildcard for React Router
app.get('/*any', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Monolith Active on Port ${PORT}`));