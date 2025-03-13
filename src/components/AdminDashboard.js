import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminDashboard() {
  const [customers, setCustomers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [reportType, setReportType] = useState("earnings");
  const [reportData, setReportData] = useState([]);

  // Fetch All Data
  useEffect(() => {
    fetchCustomers();
    fetchDrivers();
    fetchOrders();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/customers");
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await fetch("/api/drivers");
      const data = await response.json();
      setDrivers(data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Search Functionality (Filter Data)
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredDrivers = drivers.filter((driver) =>
    driver.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredOrders = orders.filter((order) =>
    order.customerId.toString().includes(searchQuery)
  );

  // Generate Reports
  const generateReport = () => {
    if (reportType === "earnings") {
      const totalEarnings = orders.reduce((sum, order) => sum + order.totalPrice, 0);
      setReportData([{ title: "Total Earnings", value: `€${totalEarnings.toFixed(2)}` }]);
    } else if (reportType === "customerOrders") {
      setReportData(orders.filter((order) => order.customerId.toString() === searchQuery));
    } else if (reportType === "driverDetails") {
      setReportData(drivers.filter((driver) => driver.name.toLowerCase().includes(searchQuery.toLowerCase())));
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav className="bg-dark text-white p-3 vh-100" style={{ minWidth: "250px" }}>
        <h3 className="text-center">Admin Panel</h3>
        <ul className="nav flex-column">
          <li className="nav-item"><Link to="/" className="nav-link text-white">Home</Link></li>
          <li className="nav-item"><a href="#" className="nav-link text-white">Customers</a></li>
          <li className="nav-item"><a href="#" className="nav-link text-white">Drivers</a></li>
          <li className="nav-item"><a href="#" className="nav-link text-white">Orders</a></li>
          <li className="nav-item"><a href="#" className="nav-link text-white">Reports</a></li>
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

        {/* Customer List */}
        <h3>Customers</h3>
        <table className="table">
          <thead>
            <tr><th>Name</th><th>Contact</th><th>Address</th></tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.contact}</td>
                <td>{customer.address}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Driver List */}
        <h3>Drivers</h3>
        <table className="table">
          <thead>
            <tr><th>Name</th><th>Contact</th><th>Vehicle</th></tr>
          </thead>
          <tbody>
            {filteredDrivers.map((driver) => (
              <tr key={driver.id}>
                <td>{driver.name}</td>
                <td>{driver.contact}</td>
                <td>{driver.vehicle}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Orders List */}
        <h3>Orders</h3>
        <table className="table">
          <thead>
            <tr><th>Order ID</th><th>Customer ID</th><th>Total Price</th></tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerId}</td>
                <td>€{order.totalPrice.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Reports Section */}
        <h3>Generate Reports</h3>
        <select className="form-control mb-2" onChange={(e) => setReportType(e.target.value)}>
          <option value="earnings">Overall Earnings</option>
          <option value="customerOrders">Specific Customer Orders</option>
          <option value="driverDetails">Driver Details</option>
        </select>
        <button className="btn btn-primary" onClick={generateReport}>Generate Report</button>

        {/* Report Output */}
        <div className="mt-3">
          {reportType === "earnings" ? (
            <h5>{reportData.length > 0 && reportData[0].title}: {reportData.length > 0 && reportData[0].value}</h5>
          ) : (
            <table className="table">
              <thead>
                <tr>{reportType === "customerOrders" ? <th>Order ID</th> : <th>Name</th>}<th>Details</th></tr>
              </thead>
              <tbody>
                {reportData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.id || data.title}</td>
                    <td>{data.items || data.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
