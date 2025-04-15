const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const app = express();
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
// Register endpoint to create a new user
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
// Login endpoint for user authentication
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    // Check if the username exists
    const query = 'SELECT * FROM customers WHERE username = ?';
    db.query(query, [username], async (err, results) => {
      if (err) {
        console.error('Error fetching user:', err);
        return res.status(500).json({ error: 'Error fetching user. Please try again.' });
      }

      if (results.length === 0) {
        return res.status(400).json({ error: 'Invalid credentials.' });
      }

      const user = results[0];

      // Compare the entered password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials.' });
      }

      // Login successful
      res.status(200).json({ message: 'Login successful!' });
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'An error occurred during login. Please try again.' });
  }
});

// Endpoint to fetch all customers
app.get('/api/customers', (req, res) => {
  const query = 'SELECT * FROM customers';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching customers:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json(results);
  });
});

// Endpoint to fetch all orders
app.get('/api/orders', (req, res) => {
  const { customerId } = req.query; // Get customerId from query parameters

  if (!customerId) {
    return res.status(400).json({ error: 'Customer ID is required.' });
  }

  // SQL query to fetch all orders by customerId
  const query = 'SELECT * FROM orders WHERE customer_id = ?';
  db.query(query, [customerId], (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No orders found for this customer.' });
    }

    res.json(results); // Return all the orders for the customer
  });
});

// Endpoint to fetch all drivers
app.get('/api/drivers', (req, res) => {
  const query = 'SELECT * FROM drivers';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching drivers:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json(results);
  });
});
// Add a new driver
app.post('/api/drivers', (req, res) => {
  const { name, vehicle_info, status } = req.body;

  if (!name || !vehicle_info || !status) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const query = 'INSERT INTO drivers (name, vehicle_info, status) VALUES (?, ?, ?)';
  db.query(query, [name, vehicle_info, status], (err, result) => {
    if (err) {
      console.error('Error adding driver:', err);
      return res.status(500).json({ error: 'Failed to add driver. Please try again.' });
    }
    res.status(201).json({ message: 'Driver added successfully.' });
  });
});


// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
