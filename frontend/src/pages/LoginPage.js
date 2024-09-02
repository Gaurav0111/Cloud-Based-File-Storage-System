// import React from 'react';
// import '../assets/css/login.css'; // Import the CSS file


// const LoginPage = () => {
//     return (
//         <div className="login-container">
//             <div className="login-box">
//                 <h2>Login</h2>
//                 <form>
//                     <div className="input-container">
//                         <i className="fa fa-user icon"></i>
//                         <input type="text" placeholder="User name / Email" required />
//                     </div>
//                     <div className="input-container">
//                         <i className="fa fa-lock icon"></i>
//                         <input type="password" placeholder="Password" required />
//                     </div>
//                     <button type="submit" className="login-button">LOG IN NOW</button>
//                 </form>
//                 <div className="social-login">
//                     <p>log in via</p>
//                     <div className="social-icons">
//                         <i className="fa fa-instagram"></i>
//                         <i className="fa fa-facebook"></i>
//                         <i className="fa fa-twitter"></i>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;


import React from 'react';
import '../assets/css/login.css';

function Login() {
    return (
        <div className="login-container">
            <div className="login-card">
                <form>
                    <div className="input-group">
                        <label htmlFor="email">Username / Email</label>
                        <input type="text" id="email" placeholder="User name / Email" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Password" />
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
