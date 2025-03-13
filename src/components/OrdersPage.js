import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function OrdersPage() {
  const [orderId, setOrderId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  // Fetch Order Details
  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}?customerId=${customerId}`);
      const data = await response.json();
      if (response.ok) {
        setOrder(data);
        setError('');
      } else {
        setError('Order not found or incorrect details!');
        setOrder(null);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      setError('Error retrieving order details. Please try again.');
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
            <Link to="/customers" className="btn btn-outline-secondary">Customers</Link>
          </nav>
        </div>
      </header>

      {/* Order Search Form */}
      <div className="container flex-grow-1">
        <h2 className="text-center mt-4">Track Your Order</h2>
        <div className="card p-4 shadow-sm mt-3">
          <h5>Enter Order Details</h5>
          <div className="mb-3">
            <label className="form-label">Order ID</label>
            <input type="text" className="form-control" value={orderId} onChange={(e) => setOrderId(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Customer ID</label>
            <input type="text" className="form-control" value={customerId} onChange={(e) => setCustomerId(e.target.value)} required />
          </div>
          <button className="btn btn-primary w-100" onClick={fetchOrderDetails}>Check Order</button>
        </div>

        {/* Display Order Details */}
        {error && <p className="text-danger text-center mt-3">{error}</p>}
        {order && (
          <div className="card p-4 shadow-sm mt-4">
            <h5 className="text-center">Order Details</h5>
            <table className="table table-bordered mt-3">
              <tbody>
                <tr>
                  <th>Order ID</th>
                  <td>{order.id}</td>
                </tr>
                <tr>
                  <th>Customer ID</th>
                  <td>{order.customerId}</td>
                </tr>
                <tr>
                  <th>Items</th>
                  <td>{order.items}</td>
                </tr>
                <tr>
                  <th>Total Price (€)</th>
                  <td>€{order.totalPrice.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>
                    <span className={`badge ${order.status === 'delivered' ? 'bg-success' : 'bg-warning'}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
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

export default OrdersPage;
