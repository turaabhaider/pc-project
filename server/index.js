const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs'); // Needed for "No Database" security
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. MOCK DATABASE (No external DB needed)
const users = []; // Registration data stays here until the server restarts
const computers = [
  { id: 1, name: "Quantum X-1 Platinum", status: "Flagship", cpu: "i9-15900K", gpu: "RTX 5090 Ti", ram: "128GB DDR5", storage: "4TB Gen5", price: "4,999" },
  { id: 2, name: "Nebula Storm Pro", status: "High-End", cpu: "Ryzen 9 9950X", gpu: "RX 8900 XTX", ram: "64GB DDR5", storage: "2TB Gen5", price: "3,299" },
  { id: 3, name: "Titan V8 Overlord", status: "Extreme", cpu: "Threadripper 7980X", gpu: "Dual RTX 5090", ram: "256GB ECC", storage: "16TB RAID 0", price: "12,499" }
];

// 2. AUTH ROUTES (Fixes the error in image_4d395f.jpg)
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Missing fields" });
  
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  res.status(201).json({ message: "User registered!" });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (user && await bcrypt.compare(password, user.password)) {
    return res.json({ token: "fake-jwt-token", message: "Success" });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

// 3. HARDWARE ROUTE (For the dashboard in image_a849de.jpg)
app.get('/api/computers', (req, res) => res.json(computers));

// 4. THE MONOLITH FIX (Serves your website)
const buildPath = path.join(__dirname, '../client/dist');
app.use(express.static(buildPath));

app.get('/*any', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 System Online at Port ${PORT}`));