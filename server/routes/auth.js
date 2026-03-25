const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hardcoded users for testing so you don't always have to register
const users = [
    {
        email: "admin@test.com",
        // This is a hashed version of the password '123456'
        password: "$2a$10$XmS0fS6I8.N.6F9.tWUnmOzrYq9zZshmYpGSmGkY0Y0Y0Y0Y0Y0Y0" 
    }
];

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ email, password: hashedPassword });
        console.log("User registered:", email);
        res.status(201).json({ message: "User registered" });
    } catch (err) {
        res.status(500).json({ message: "Registration Error" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // FIX: Hardcoded fallback secret so it NEVER crashes
        const secret = process.env.JWT_SECRET || "FUTURE_TECH_SUPER_SECRET_KEY_2026";
        
        const token = jwt.sign({ email: user.email }, secret, { expiresIn: '1h' });
        
        console.log("Login successful for:", email);
        res.json({ token });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;