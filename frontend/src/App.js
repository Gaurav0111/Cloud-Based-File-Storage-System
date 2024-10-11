import React, { useState } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import axios from 'axios';
import axiosInstance from '../src/api/axios'; // Adjust the import path as necessary
import { Route, Routes, Navigate } from 'react-router-dom'; // Only use Routes and Route
import Home from './pages/Home'; // Import Home component

function App() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginData, setLoginData] = useState({ identifier: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [user, setUser] = useState(null); // State to store user data

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    console.log("Sending login request:", loginData); // Log the login data
    try {
        const response = await axios.post('/api/auth/login', {
            identifier: loginData.identifier,
            password: loginData.password,
        });

        if (response && response.data) {
            console.log("Login successful:", response.data);
            setUser(response.data.user);
        } else {
            console.error("No data found in response.");
        }
    } catch (error) {
        console.error("Error logging in:", error);
        setErrorMessage("Login failed. Please check your credentials.");
    }
};

const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axiosInstance.post('/api/auth/register', registerData);

        if (response && response.data) {
            console.log('Registration successful:', response.data);
            setSuccessMessage('Registration successful! Please log in.');
            setRegisterData({ username: '', email: '', password: '' });
        } else {
            console.error("No data found in response.");
        }
    } catch (error) {
        if (error.response) {
            console.error('Registration failed:', error.response.data);
            setErrorMessage(error.response.data.message || 'Registration failed. Please try again.');
        } else {
            console.error('Registration failed:', error.message);
            setErrorMessage('Registration failed. Please try again.');
        }
    }
};
  

  return (
    <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
      {/* Sign In Form */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleLoginSubmit}>
          <h1>Sign In</h1>
          <div className="social-container">
            <a href="accounts.google.com" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="accounts.google.com" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="accounts.google.com" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your account</span>
          <input
            type="text"
            name="identifier"
            placeholder="Username or Email"
            value={loginData.identifier}
            onChange={handleLoginChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
            required
          />
          <a href="accounts.google.com">Forgot your password?</a>
          <button type="submit">Sign In</button>
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
        </form>
      </div>

      {/* Sign Up Form */}
      <div className="form-container sign-up-container">
        <form onSubmit={handleRegisterSubmit}>
          <h1>Sign Up</h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={registerData.username}
            onChange={handleRegisterChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={registerData.email}
            onChange={handleRegisterChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={registerData.password}
            onChange={handleRegisterChange}
            required
          />
          <button type="submit">Sign Up</button>
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
        </form>
      </div>

      {/* Overlay Section */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us, please login with your personal info.</p>
            <button className="ghost" onClick={handleToggle}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us.</p>
            <button className="ghost" onClick={handleToggle}>Sign Up</button>
          </div>
        </div>
      </div>

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : null} />
        <Route path="/home" element={user ? <Home username={user.username} /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
