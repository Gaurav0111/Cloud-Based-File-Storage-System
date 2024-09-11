import React, { useState } from 'react';
import axios from '../api/axios';  // Axios instance
import '../assets/css/login.css';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', formData);
            console.log('Login successful:', response.data);
        } catch (error) {
            console.error('Login failed:', error.response.data);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Username / Email</label>
                        <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="User name / Email" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                    </div>
                    <button type="submit" className="login-button">LOG IN NOW</button>
                </form>
                <div className="social-login">
                    <span>log in via</span>
                    <div className="social-icons">
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-twitter"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
