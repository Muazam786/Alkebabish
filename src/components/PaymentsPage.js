import React, { useState, useEffect } from 'react';

function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({ orderId: '', customerId: '', method: '', status: 'pending' });

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

  const addPayment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPayment),
      });
      if (response.ok) {
        setNewPayment({ orderId: '', customerId: '', method: '', status: 'pending' });
        fetchPayments();
      }
    } catch (error) {
      console.error('Error adding payment:', error);
    }
  };

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

  const deletePayment = async (id) => {
    try {
      const response = await fetch(`/api/payments/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchPayments();
      }
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Payments</h2>
      <form onSubmit={addPayment}>
        <input
          type="text"
          name="orderId"
          placeholder="Order ID"
          value={newPayment.orderId}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="customerId"
          placeholder="Customer ID"
          value={newPayment.customerId}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="method"
          placeholder="Payment Method"
          value={newPayment.method}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Payment</button>
      </form>
      <ul>
        {payments.map(payment => (
          <li key={payment.id}>
            Payment #{payment.id}: Order {payment.orderId}, Customer {payment.customerId}, {payment.method} - {payment.status}
            {payment.status !== 'paid' && (
              <button onClick={() => updatePaymentStatus(payment.id, 'paid')}>Mark as Paid</button>
            )}
            <button onClick={() => deletePayment(payment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PaymentsPage;
