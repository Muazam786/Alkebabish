import React, { useState, useEffect } from 'react';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ customerId: '', items: '', totalPrice: '', status: 'pending' });

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleInputChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const addOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });
      if (response.ok) {
        setNewOrder({ customerId: '', items: '', totalPrice: '', status: 'pending' });
        fetchOrders();
      }
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      const response = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Orders</h2>
      <form onSubmit={addOrder}>
        <input
          type="text"
          name="customerId"
          placeholder="Customer ID"
          value={newOrder.customerId}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="items"
          placeholder="Items (comma separated)"
          value={newOrder.items}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="totalPrice"
          placeholder="Total Price"
          value={newOrder.totalPrice}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Order</button>
      </form>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Order #{order.id}: Customer {order.customerId} - {order.items} - ${order.totalPrice} - {order.status}
            {order.status !== 'delivered' && (
              <button onClick={() => updateOrderStatus(order.id, 'delivered')}>Mark as Delivered</button>
            )}
            <button onClick={() => deleteOrder(order.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrdersPage;
