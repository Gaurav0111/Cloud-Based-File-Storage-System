import React, { useState } from 'react';
import axios from '../api/axios';  
import '../assets/css/register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        gender: ''
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState(''); // To handle server-side errors
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
        setServerError(''); // Clear server error when user changes input
    };

    const validateForm = () => {
        let formErrors = {};

        if (!formData.firstName) formErrors.firstName = 'First Name is required';
        if (!formData.lastName) formErrors.lastName = 'Last Name is required';
        if (!formData.dob) formErrors.dob = 'Date of Birth is required';
        if (!formData.email) formErrors.email = 'Email is required';
        if (!formData.phone) formErrors.phone = 'Phone number is required';
        if (!formData.password) formErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = 'Passwords do not match';
        if (!formData.gender) formErrors.gender = 'Gender is required';

        setErrors(formErrors);

        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Stop form submission if validation fails
        }

        try {
            const response = await axios.post('/api/auth/register', formData);

            // Reset form after successful registration
            setFormData({
                firstName: '',
                lastName: '',
                dob: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: '',
                gender: ''
            });

            // Show success message and redirect to login
            alert('User registered successfully!');
            navigate('/login'); // Redirect to login page
        } catch (error) {
            // Handle server error (e.g., email already registered)
            if (error.response && error.response.status === 409) {
                setServerError('Email already registered.');
            } else {
                setServerError('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Registration Form</h2>
                {serverError && <p className="error">{serverError}</p>} {/* Server-side error */}

                <form onSubmit={handleSubmit}>
                    <div className="input-row">
                        <div className="input-group">
                            <label htmlFor="firstName">First Name</label>
                            <input 
                                type="text" 
                                id="firstName" 
                                name="firstName" 
                                value={formData.firstName} 
                                onChange={handleChange} 
                                placeholder="First Name" 
                            />
                            {errors.firstName && <p className="error">{errors.firstName}</p>}
                        </div>
                        <div className="input-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input 
                                type="text" 
                                id="lastName" 
                                name="lastName" 
                                value={formData.lastName} 
                                onChange={handleChange} 
                                placeholder="Last Name" 
                            />
                            {errors.lastName && <p className="error">{errors.lastName}</p>}
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="dob">Birthday</label>
                        <input 
                            type="date" 
                            id="dob" 
                            name="dob" 
                            value={formData.dob} 
                            onChange={handleChange} 
                        />
                        {errors.dob && <p className="error">{errors.dob}</p>}
                    </div>
                    <div className="input-row">
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                placeholder="Email" 
                            />
                            {errors.email && <p className="error">{errors.email}</p>}
                        </div>
                        <div className="input-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input 
                                type="text" 
                                id="phone" 
                                name="phone" 
                                value={formData.phone} 
                                onChange={handleChange} 
                                placeholder="Phone Number" 
                            />
                            {errors.phone && <p className="error">{errors.phone}</p>}
                        </div>
                    </div>
                    <div className="input-row">
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
                        <div className="input-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input 
                                type="password" 
                                id="confirmPassword" 
                                name="confirmPassword" 
                                value={formData.confirmPassword} 
                                onChange={handleChange} 
                                placeholder="Confirm Password" 
                            />
                            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Gender</label>
                        <div className="gender-options">
                            <input 
                                type="radio" 
                                id="male" 
                                name="gender" 
                                value="Male" 
                                checked={formData.gender === 'Male'} 
                                onChange={handleChange} 
                            />
                            <label htmlFor="male">Male</label>
                            <input 
                                type="radio" 
                                id="female" 
                                name="gender" 
                                value="Female" 
                                checked={formData.gender === 'Female'} 
                                onChange={handleChange} 
                            />
                            <label htmlFor="female">Female</label>
                        </div>
                        {errors.gender && <p className="error">{errors.gender}</p>}
                    </div>
                    <button type="submit" className="register-button">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
