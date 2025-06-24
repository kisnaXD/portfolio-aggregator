const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_root_password', // Replace with your MySQL root password
    database: 'portfolio_app'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected');
});

// Register endpoint
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ error: 'Registration failed' });
        res.status(201).json({ message: 'User registered' });
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ error: 'User not found' });
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
        res.json({ message: 'Login successful', userId: user.id });
    });
});

app.listen(5000, () => console.log('Server running on port 5000'));