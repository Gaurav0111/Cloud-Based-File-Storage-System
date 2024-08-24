import React from 'react';
import '../assets/css/login.css'; // Import the CSS file

const LoginPage = () => {
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" placeholder="Enter your password" />
                </div>
                <button type="submit" className="btn">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
