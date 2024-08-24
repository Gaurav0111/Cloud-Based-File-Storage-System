import React from 'react';
import '../assets/css/register.css'; // Import the CSS file

const RegisterPage = () => {
    return (
        <div className="register-container">
            <h2>Register</h2>
            <form>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" placeholder="Enter your password" />
                </div>
                <button type="submit" className="btn">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
