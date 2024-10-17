import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import '../assets/css/login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', formData);
            setSuccess('Login successful! Redirecting...');
            setError('');
            setTimeout(() => navigate('/landing'), 2000); // Redirect to LandingPage.js
        } catch (error) {
            setError(error.response?.data?.message || 'Invalid email or password');
            setSuccess('');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" id="email" name="email" 
                            value={formData.email} onChange={handleChange} required 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" id="password" name="password" 
                            value={formData.password} onChange={handleChange} required 
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p>
                    Don't have an account? 
                    <span 
                        className="redirect-link" 
                        onClick={() => navigate('/register')}
                    >
                        Register here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;