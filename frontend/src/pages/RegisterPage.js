import React, { useState } from 'react';
import axios from '../api/axios';  
import '../assets/css/register.css';

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // You can add validation here (e.g., check if passwords match)

        try {
            console.log(formData);
            const response = await axios.post('/api/auth/register', formData);
            // Handle success (e.g., redirect to login page or show a success message)
            console.log('Registration successful:', response.data);
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Registration error:', error);
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
                            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="dob">Birthday</label>
                        <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
                    </div>
                    <div className="input-row">
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Gender</label>
                        <div className="gender-options">
                            <input type="radio" id="male" name="gender" value="Male" onChange={handleChange} />
                            <label htmlFor="Male">Male</label>
                            <input type="radio" id="female" name="gender" value="female" onChange={handleChange} />
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>
                    <button type="submit" className="register-button">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
