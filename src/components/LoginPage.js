import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setMessage('Login successful!');
        navigate('/'); // Redirect to homepage or dashboard
      } else {
        setMessage(data.error || 'Login failed.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Login error:', error);
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

      {/* Sign In Form */}
      <div className="container d-flex flex-column align-items-center justify-content-center flex-grow-1">
        <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 className="text-center mb-4">Sign In</h2>
          <form onSubmit={loginUser}>
            <div className="mb-3">
              <label className="form-label">Username/Email:</label>
              <input 
                type="text" 
                name="username" 
                className="form-control" 
                value={credentials.username} 
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
                value={credentials.password} 
                onChange={handleChange} 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign In</button>
          </form>
          {message && <p className="text-danger mt-3">{message}</p>}
          <p className="mt-3 text-center">
            Don't have an account? <Link to="/register">Sign Up</Link>
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

export default LoginPage;
