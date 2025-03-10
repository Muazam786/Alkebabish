// server.js
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your_jwt_secret'; // Replace with an environment variable in production

// Middleware
app.use(express.json());
app.use(cors());

// Create a MySQL connection pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',  // 
  database: 'fdms'      // replace with your database name
});

// Registration endpoint
app.post('/api/register', (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Hash password before storing
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: 'Error hashing password' });
    const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    db.query(sql, [username, hash, role], (error, results) => {
      if (error) return res.status(500).json({ error: error.message });
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Missing username or password' });

  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: 'Error comparing passwords' });
      if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, role: user.role, username: user.username },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.json({ token });
    });
  });
});

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expect "Bearer TOKEN"
  if (!token) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Admin-only endpoint: Get all users
app.get('/api/users', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  const sql = 'SELECT id, username, role FROM users';
  db.query(sql, (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json(results);
  });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
