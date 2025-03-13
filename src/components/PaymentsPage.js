import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({
    orderId: '',
    customerId: '',
    method: 'Credit/Debit Card',
    status: 'pending',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  // Fetch Payments
  const fetchPayments = async () => {
    try {
      const response = await fetch('/api/payments');
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleInputChange = (e) => {
    setNewPayment({ ...newPayment, [e.target.name]: e.target.value });
  };

  // Add Payment
  const addPayment = async (e) => {
    e.preventDefault();

    // Validate Card Fields if "Credit/Debit Card" is selected
    if (newPayment.method === 'Credit/Debit Card') {
      if (!newPayment.cardNumber || !newPayment.expiryDate || !newPayment.cvv) {
        alert('Please enter all card details.');
        return;
      }
    }

    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPayment),
      });
      if (response.ok) {
        setNewPayment({
          orderId: '',
          customerId: '',
          method: 'Credit/Debit Card',
          status: 'pending',
          cardNumber: '',
          expiryDate: '',
          cvv: ''
        });
        fetchPayments();
      }
    } catch (error) {
      console.error('Error adding payment:', error);
    }
  };

  // Update Payment Status
  const updatePaymentStatus = async (id, status) => {
    try {
      const response = await fetch(`/api/payments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        fetchPayments();
      }
    } catch (error) {
      console.error('Error updating payment:', error);
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
        <h2 className="text-center mt-4">Order Payment</h2>

        {/* Payment Form */}
        <div className="card p-4 shadow-sm mt-3">
          <h5>Enter Payment Details</h5>
          <form onSubmit={addPayment}>
            <div className="mb-3">
              <label className="form-label">Order ID</label>
              <input type="text" name="orderId" className="form-control" value={newPayment.orderId} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Customer ID</label>
              <input type="text" name="customerId" className="form-control" value={newPayment.customerId} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Payment Method</label>
              <select name="method" className="form-control" value={newPayment.method} onChange={handleInputChange}>
                <option value="Credit/Debit Card">Credit/Debit Card</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="PayPal">PayPal</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>

            {/* Show Card Details if Credit/Debit Card is Selected */}
            {newPayment.method === 'Credit/Debit Card' && (
              <>
                <div className="mb-3">
                  <label className="form-label">Card Number</label>
                  <input type="text" name="cardNumber" className="form-control" value={newPayment.cardNumber} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Expiry Date (MM/YY)</label>
                  <input type="text" name="expiryDate" className="form-control" value={newPayment.expiryDate} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">CVV</label>
                  <input type="text" name="cvv" className="form-control" value={newPayment.cvv} onChange={handleInputChange} required />
                </div>
              </>
            )}

            <button type="submit" className="btn btn-success w-100">Confirm Payment</button>
          </form>
        </div>

        {/* Payments List */}
        <h3 className="text-center mt-5">Payment Records</h3>
        {payments.length > 0 ? (
          <table className="table table-bordered mt-3">
            <thead className="table-dark">
              <tr>
                <th>Payment ID</th>
                <th>Order ID</th>
                <th>Customer ID</th>
                <th>Method</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.orderId}</td>
                  <td>{payment.customerId}</td>
                  <td>{payment.method}</td>
                  <td>
                    <span className={`badge ${payment.status === 'paid' ? 'bg-success' : 'bg-warning'}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td>
                    {payment.status !== 'paid' && (
                      <button className="btn btn-sm btn-primary me-2" onClick={() => updatePaymentStatus(payment.id, 'paid')}>
                        Mark as Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No payments found.</p>
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

export default PaymentsPage;
