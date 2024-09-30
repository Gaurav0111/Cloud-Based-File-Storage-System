import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/css/login.css';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({});
        setServerError('');
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.email) formErrors.email = 'Email is required';
        if (!formData.password) formErrors.password = 'Password is required';
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.post('/api/auth/login', formData);
            console.log('Login successful:', response.data);

            setFormData({ email: '', password: '' });
            navigate('/landing');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setServerError('Invalid email or password.');
            } else if (error.response && error.response.status === 404) {
                setServerError('User not found.');
            } else {
                setServerError('Login failed. Please try again.');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                {serverError && <p className="error">{serverError}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Username / Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="User name / Email"
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <button type="submit" className="login-button">LOG IN NOW</button>
                </form>

                <div className="redirect-to-register">
                    <p>Not registered? <Link to="/register">Register here</Link></p>
                </div>

                <div className="social-login">
                    <span>Log in via</span>
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
