import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import banner from '../assets/banner.jpeg';
import foodMenu from '../assets/menu.jpg';

function HomePage() {
  return (
    <div>
      {/* Header with Logo and Accessible Navigation Menu */}
      <header style={{ display: 'flex', alignItems: 'center', padding: '1rem', backgroundColor: '#f8f8f8' }}>
        <img src={logo} alt="Company Logo" style={{ height: '60px', marginRight: '1rem' }} />
        <nav aria-label="Main Navigation">
          <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
            <li style={{ margin: '0 1rem' }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
            </li>
            <li style={{ margin: '0 1rem' }}>
              <Link to="/customers" style={{ textDecoration: 'none', color: 'inherit' }}>Customers</Link>
            </li>
            <li style={{ margin: '0 1rem' }}>
              <Link to="/orders" style={{ textDecoration: 'none', color: 'inherit' }}>Orders</Link>
            </li>
            <li style={{ margin: '0 1rem' }}>
              <Link to="/drivers" style={{ textDecoration: 'none', color: 'inherit' }}>Drivers</Link>
            </li>
            <li style={{ margin: '0 1rem' }}>
              <Link to="/payments" style={{ textDecoration: 'none', color: 'inherit' }}>Payments</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Banner Section */}
      <section>
        <img 
          src={banner} 
          alt="Banner for Food Delivery Service" 
          style={{ width: '100%', maxHeight: '1100px', objectFit: 'cover' }} 
        />
      </section>

      {/* Main Content: Food Menu */}
      <main style={{ padding: '1rem', textAlign: 'center' }}>
        <h1>Welcome to Our Food Delivery Service</h1>
        <p>Discover our delicious food menu and enjoy our service.</p>
        <img 
          src={foodMenu} 
          alt="Food Menu" 
          style={{ width: '100%', maxWidth: '1000px', margin: '1rem 0' }} 
        />
      </main>

      {/* Footer with Business Details */}
      <footer style={{ backgroundColor: '#f8f8f8', padding: '1rem', textAlign: 'center' }}>
        <p><strong>€10–20 Pizza takeaway</strong></p>
        <p>Address: Main St, Kilcullenbridge, Kilcullen, Co. Kildare, Ireland</p>
        <p>Hours: Open ⋅ Closes 12 am</p>
        <p>Phone: +353 45 480 435</p>
        <p>
          Menu: <a href="https://alkebabishkilcullen.ie" target="_blank" rel="noopener noreferrer">alkebabishkilcullen.ie</a>
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
