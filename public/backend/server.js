const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fdms"
});

// Fetch One Customer
app.get("/api/customers/first", (req, res) => {
  const sql = "SELECT * FROM customers LIMIT 1";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result.length > 0 ? result[0] : null);
  });
});

// Fetch One Driver
app.get("/api/drivers/first", (req, res) => {
  const sql = "SELECT * FROM drivers LIMIT 1";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result.length > 0 ? result[0] : null);
  });
});

// Fetch One Order
app.get("/api/orders/first", (req, res) => {
  const sql = "SELECT * FROM orders LIMIT 1";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result.length > 0 ? result[0] : null);
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
