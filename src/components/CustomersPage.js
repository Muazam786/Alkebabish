import React, { useState, useEffect } from 'react';

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', contact: '', address: '' });

  // Fetch customers without page refresh
  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers');
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleInputChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const addCustomer = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCustomer),
      });
      if (response.ok) {
        setNewCustomer({ name: '', contact: '', address: '' });
        fetchCustomers();
      }
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      const response = await fetch(`/api/customers/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchCustomers();
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Customers</h2>
      <form onSubmit={addCustomer}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newCustomer.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={newCustomer.contact}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newCustomer.address}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Customer</button>
      </form>
      <ul>
        {customers.map(customer => (
          <li key={customer.id}>
            {customer.name} - {customer.contact} - {customer.address}
            <button onClick={() => deleteCustomer(customer.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomersPage;
