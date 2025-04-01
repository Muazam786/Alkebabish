import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminDashboard() {
  const [customer, setCustomer] = useState(null);
  const [driver, setDriver] = useState(null);
  const [order, setOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch One Customer, One Driver, and One Order from Database
  useEffect(() => {
    fetchCustomer();
    fetchDriver();
    fetchOrder();
  }, []);

  const fetchCustomer = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/customers/first");
      const data = await response.json();
      setCustomer(data);
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };

  const fetchDriver = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/drivers/first");
      const data = await response.json();
      setDriver(data);
    } catch (error) {
      console.error("Error fetching driver:", error);
    }
  };

  const fetchOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders/first");
      const data = await response.json();
      setOrder(data);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav className="bg-dark text-white p-3 vh-100" style={{ minWidth: "250px" }}>
        <h3 className="text-center">Admin Panel</h3>
        <ul className="nav flex-column">
          <li className="nav-item"><Link to="/" className="nav-link text-white">Home</Link></li>
          <li className="nav-item"><Link to="/admin/customers" className="nav-link text-white">Customers</Link></li>
          <li className="nav-item"><Link to="/admin/drivers" className="nav-link text-white">Drivers</Link></li>
          <li className="nav-item"><Link to="/admin/orders" className="nav-link text-white">Orders</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="container p-4">
        <h2>Admin Dashboard</h2>

        {/* Search Bar */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Customers, Drivers or Orders"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Display One Customer */}
        <h3>One Existing Customer</h3>
        {customer ? (
          <table className="table">
            <thead>
              <tr><th>Name</th><th>Contact</th><th>Address</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>{customer.name}</td>
                <td>{customer.contact}</td>
                <td>{customer.address}</td>
              </tr>
            </tbody>
          </table>
        ) : <p>No customer found.</p>}

        {/* Display One Driver */}
        <h3>One Existing Driver</h3>
        {driver ? (
          <table className="table">
            <thead>
              <tr><th>Name</th><th>Contact</th><th>Vehicle</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>{driver.name}</td>
                <td>{driver.contact}</td>
                <td>{driver.vehicle}</td>
              </tr>
            </tbody>
          </table>
        ) : <p>No driver found.</p>}

        {/* Display One Order */}
        <h3>One Existing Order</h3>
        {order ? (
          <table className="table">
            <thead>
              <tr><th>Order ID</th><th>Customer ID</th><th>Total Price (€)</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>{order.id}</td>
                <td>{order.customerId}</td>
                <td>€{order.totalPrice.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        ) : <p>No order found.</p>}
      </div>
    </div>
  );
}

export default AdminDashboard;
