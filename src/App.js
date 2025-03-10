import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CustomersPage from './components/CustomersPage';
import OrdersPage from './components/OrdersPage';
import DriversPage from './components/DriversPage';
import PaymentsPage from './components/PaymentsPage';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/drivers" element={<DriversPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
      </Routes>
    </div>
  );
}

export default App;
