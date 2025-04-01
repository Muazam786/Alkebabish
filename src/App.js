import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CustomersPage from './components/CustomersPage';
import OrdersPage from './components/OrdersPage';
import DriversPage from './components/DriversPage';
import PaymentsPage from './components/PaymentsPage';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';
import AdminDashboard from "./components/AdminDashboard";


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
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
    </div>
  );
}

export default App;
