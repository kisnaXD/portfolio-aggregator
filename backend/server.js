const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Rate limiting
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { error: 'Too many login attempts, please try again after 15 minutes' }
});

// Validate environment variables
const requiredEnv = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_SOCKET', 'PORT', 'JWT_SECRET'];
requiredEnv.forEach(key => {
    if (!process.env[key]) {
        console.error(`Missing environment variable: ${key}`);
        process.exit(1);
    }
});

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    socketPath: process.env.DB_SOCKET
});

db.connect(err => {
    if (err) {
        console.error('MySQL connection failed:', err);
        process.exit(1);
    }
    console.log('MySQL connected');
});

// Register endpoint
app.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password, mobileNo } = req.body;
        if (!firstName || !lastName || !email || !password || !mobileNo) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (first_name, last_name, email, password_hash, mobile_no) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [firstName, lastName, email, hashedPassword, mobileNo], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'Email or phone number already exists' });
                }
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Registration failed' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Login endpoint
app.post('/login', loginLimiter, async (req, res) => {
    try {
        const { identifier, password } = req.body;
        if (!identifier || !password) {
            return res.status(400).json({ error: 'Email/phone number and password required' });
        }

        const sql = 'SELECT * FROM users WHERE email = ? OR mobile_no = ?';
        db.query(sql, [identifier, identifier], async (err, results) => {
            if (err || results.length === 0) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: 'Login successful', token });
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Verify token endpoint
app.get('/verify', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid or expired token' });
            }
            res.json({ message: 'Token valid', userId: decoded.userId });
        });
    } catch (err) {
        console.error('Verify error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));