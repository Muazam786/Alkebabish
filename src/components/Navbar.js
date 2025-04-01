import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#eee' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/customers" style={{ marginRight: '1rem' }}>Customers</Link>
      <Link to="/orders" style={{ marginRight: '1rem' }}>Orders</Link>
      <Link to="/drivers" style={{ marginRight: '1rem' }}>Drivers</Link>
      <Link to="/payments" style={{ marginRight: '1rem' }}>Payments</Link>
    </nav>
  );
}

export default Navbar;
