const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// --- IN-MEMORY DATA ---
const users = []; 
const computers = [
  { id: 1, name: "Quantum X-1 Platinum", status: "Flagship", cpu: "i9-15900K", gpu: "RTX 5090 Ti", ram: "128GB DDR5", storage: "4TB Gen5", cooling: "Liquid", psu: "1200W", price: "4,999", benchmark: 98 },
  { id: 2, name: "Nebula Storm Pro", status: "High-End", cpu: "Ryzen 9 9950X", gpu: "RX 8900 XTX", ram: "64GB DDR5", storage: "2TB Gen5", cooling: "Air High-Flow", psu: "850W", price: "3,299", benchmark: 85 },
  { id: 3, name: "Titan V8 Overlord", status: "Extreme", cpu: "Threadripper 7980X", gpu: "Dual RTX 5090", ram: "256GB ECC", storage: "16TB RAID 0", cooling: "Industrial Liquid", psu: "1600W Titanium", price: "12,499", benchmark: 100 }
];

// --- AUTH: REGISTER ---
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing fields" });
    if (users.find(u => u.email === email)) return res.status(400).json({ message: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: "Register Error" });
  }
});

// --- AUTH: LOGIN ---
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || "SECRET_KEY", { expiresIn: '1h' });
    res.json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Login Error" });
  }
});

// --- HARDWARE API ---
app.get('/api/computers', (req, res) => res.json(computers));

// --- MONOLITH SERVING ---
const buildPath = path.join(__dirname, '../client/dist');
app.use(express.static(buildPath));

// BULLETPROOF FIX FOR THE CRASH:
// We use a middleware function instead of a string route like '*' or '(.*)'.
// This prevents path-to-regexp from ever running and crashing the deployment.
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next(); // Don't interfere with API calls
  }
  res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 System Live on Port ${PORT}`));