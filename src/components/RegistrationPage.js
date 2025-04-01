import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function RegistrationPage() {
  const [formData, setFormData] = useState({ username: '', password: '', role: 'customer' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Registration successful! Redirecting to Sign In...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage(data.error || 'Registration failed.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header with Logo */}
      <header className="bg-light py-3 shadow-sm">
        <div className="container d-flex align-items-center justify-content-between">
          <img src={logo} alt="Company Logo" style={{ height: '50px' }} />
          <Link to="/" className="btn btn-outline-primary">Home</Link>
        </div>
      </header>

      {/* Registration Form */}
      <div className="container d-flex flex-column align-items-center justify-content-center flex-grow-1">
        <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 className="text-center mb-4">Sign Up</h2>
          <form onSubmit={registerUser}>
            <div className="mb-3">
              <label className="form-label">Username/Email:</label>
              <input 
                type="text" 
                name="username" 
                className="form-control" 
                value={formData.username} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input 
                type="password" 
                name="password" 
                className="form-control" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Role:</label>
              <select name="role" className="form-control" value={formData.role} onChange={handleChange}>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success w-100">Sign Up</button>
          </form>
          {message && <p className="text-danger mt-3 text-center">{message}</p>}
          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-light py-3 text-center mt-auto">
        <p className="mb-0">© {new Date().getFullYear()} Food Delivery Service</p>
      </footer>
    </div>
  );
}

export default RegistrationPage;
