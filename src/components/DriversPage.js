import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function DriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [newDriver, setNewDriver] = useState({ name: '', contact: '', vehicle: '', status: 'available' });
  const [driverOrders, setDriverOrders] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);

  // Fetch Drivers
  const fetchDrivers = async () => {
    try {
      const response = await fetch('/api/drivers');
      const data = await response.json();
      setDrivers(data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  // Fetch Driver's Orders and Earnings
  const fetchDriverOrders = async () => {
    try {
      const response = await fetch('/api/driver/orders');
      const data = await response.json();
      setDriverOrders(data);

      // Calculate total earnings
      const earnings = data
        .filter(order => order.status === 'delivered')
        .reduce((sum, order) => sum + order.totalPrice, 0);
      setTotalEarnings(earnings);
    } catch (error) {
      console.error('Error fetching driver orders:', error);
    }
  };

  useEffect(() => {
    fetchDrivers();
    fetchDriverOrders();
  }, []);

  const handleInputChange = (e) => {
    setNewDriver({ ...newDriver, [e.target.name]: e.target.value });
  };

  const addDriver = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/drivers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDriver),
      });
      if (response.ok) {
        setNewDriver({ name: '', contact: '', vehicle: '', status: 'available' });
        fetchDrivers();
      }
    } catch (error) {
      console.error('Error adding driver:', error);
    }
  };

  const deleteDriver = async (id) => {
    try {
      const response = await fetch(`/api/drivers/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchDrivers();
      }
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <header className="bg-light py-3 shadow-sm">
        <div className="container d-flex align-items-center justify-content-between">
          <img src={logo} alt="Company Logo" style={{ height: '50px' }} />
          <nav>
            <Link to="/" className="btn btn-outline-primary me-2">Home</Link>
            <Link to="/orders" className="btn btn-outline-secondary">Orders</Link>
          </nav>
        </div>
      </header>

      <div className="container flex-grow-1">
        <h2 className="text-center mt-4">Drivers Management</h2>

        {/* Add Driver Form */}
        <div className="card p-4 shadow-sm mt-3">
          <h5>Add New Driver</h5>
          <form onSubmit={addDriver}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" name="name" className="form-control" value={newDriver.name} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Contact</label>
              <input type="text" name="contact" className="form-control" value={newDriver.contact} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Vehicle Details</label>
              <input type="text" name="vehicle" className="form-control" value={newDriver.vehicle} onChange={handleInputChange} required />
            </div>
            <button type="submit" className="btn btn-success w-100">Add Driver</button>
          </form>
        </div>

        {/* Drivers List */}
        <h3 className="text-center mt-5">Driver List</h3>
        {drivers.length > 0 ? (
          <table className="table table-bordered mt-3">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Vehicle</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map(driver => (
                <tr key={driver.id}>
                  <td>{driver.name}</td>
                  <td>{driver.contact}</td>
                  <td>{driver.vehicle}</td>
                  <td>
                    <span className={`badge ${driver.status === 'available' ? 'bg-success' : 'bg-warning'}`}>
                      {driver.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteDriver(driver.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No drivers found.</p>
        )}

        {/* Driver Orders */}
        <h3 className="text-center mt-5">Your Assigned Orders</h3>
        {driverOrders.length > 0 ? (
          <table className="table table-bordered mt-3">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total Price (€)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {driverOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customerId}</td>
                  <td>{order.items}</td>
                  <td>€{order.totalPrice.toFixed(2)}</td>
                  <td>
                    <span className={`badge ${order.status === 'delivered' ? 'bg-success' : order.status === 'cancelled' ? 'bg-danger' : 'bg-warning'}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No assigned orders.</p>
        )}

        {/* Earnings */}
        <div className="card p-4 shadow-sm mt-4">
          <h5 className="text-center">Your Earnings</h5>
          <h3 className="text-center text-success">€{totalEarnings.toFixed(2)}</h3>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-light py-3 text-center mt-auto">
        <p className="mb-0">© {new Date().getFullYear()} Food Delivery Service | Contact: 045480435</p>
        <p className="mb-0">Main Street, Kilcullen, Co. Kildare, Ireland</p>
        <a href="https://www.alkebabishkilcullen.ie" target="_blank" rel="noopener noreferrer">Visit our website</a>
      </footer>
    </div>
  );
}

export default DriversPage;
