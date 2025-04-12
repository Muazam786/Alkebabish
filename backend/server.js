const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const app = express();// Register endpoint to create a new user
app.post('/api/register', async (req, res) => {
  const { username, password, role } = req.body;

  // Validate the input data
  if (!username || !password || !role) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Check if the username already exists
    const checkQuery = 'SELECT * FROM customers WHERE username = ?';
    db.query(checkQuery, [username], async (err, results) => {
      if (err) {
        console.error('Error checking username:', err);
        return res.status(500).json({ error: 'Error checking username. Please try again.' });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: 'Username already exists. Please choose another.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // SQL query to insert the new user into the database
      const query = 'INSERT INTO customers (username, password, role) VALUES (?, ?, ?)';
      db.query(query, [username, hashedPassword, role], (err, result) => {
        if (err) {
          console.error('Error registering user:', err);
          return res.status(500).json({ error: 'Failed to register user. Please try again.' });
        }

        res.status(201).json({ message: 'User registered successfully.' });
      });
    });
  } catch (err) {
    console.error('Error hashing password:', err);
    res.status(500).json({ error: 'Error registering user. Please try again.' });
  }
});

app.use(cors());
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
