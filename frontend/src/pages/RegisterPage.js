import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';  
import '../assets/css/register.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', dob: '', email: '', 
        phone: '', password: '', confirmPassword: '', gender: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateInputs = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        if (!emailRegex.test(formData.email)) {
            setError('Invalid email format');
            return false;
        }
        if (!phoneRegex.test(formData.phone)) {
            setError('Phone number must be 10 digits');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        try {
            const response = await axios.post('/api/auth/register', formData);
            setSuccess('Registration successful! Redirecting to login...');
            setError('');
            setFormData({ // Reset form data after successful registration
                firstName: '', lastName: '', dob: '', email: '', 
                phone: '', password: '', confirmPassword: '', gender: ''
            });
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed. User might already exist.');
            setSuccess('');
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Registration Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-row">
                        <div className="input-group">
                            <label htmlFor="firstName">First Name</label>
                            <input 
                                type="text" id="firstName" name="firstName" 
                                value={formData.firstName} onChange={handleChange} required 
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input 
                                type="text" id="lastName" name="lastName" 
                                value={formData.lastName} onChange={handleChange} required 
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="dob">Birthday</label>
                        <input 
                            type="date" id="dob" name="dob" 
                            value={formData.dob} onChange={handleChange} required 
                        />
                    </div>
                    <div className="input-row">
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" id="email" name="email" 
                                value={formData.email} onChange={handleChange} required 
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input 
                                type="text" id="phone" name="phone" 
                                value={formData.phone} onChange={handleChange} required 
                            />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" id="password" name="password" 
                                value={formData.password} onChange={handleChange} required 
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input 
                                type="password" id="confirmPassword" name="confirmPassword" 
                                value={formData.confirmPassword} onChange={handleChange} required 
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Gender</label>
                        <div className="gender-options">
                            <input 
                                type="radio" id="male" name="gender" value="Male" 
                                onChange={handleChange} required 
                            />
                            <label htmlFor="male">Male</label>
                            <input 
                                type="radio" id="female" name="gender" value="Female" 
                                onChange={handleChange} required 
                            />
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <button type="submit" className="register-button">Submit</button>
                </form>
                <p>
                    Already a user? 
                    <span 
                        className="redirect-link" 
                        onClick={() => navigate('/login')}
                    >
                        Login here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;
