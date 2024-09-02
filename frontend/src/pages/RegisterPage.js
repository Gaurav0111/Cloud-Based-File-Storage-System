import React from 'react';
import '../assets/css/register.css'; 

function Register() {
    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Registration Form</h2>
                <form>
                    <div className="input-row">
                        <div className="input-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" placeholder="First Name" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="dob">Birthday</label>
                        <input type="date" id="dob" />
                    </div>
                    <div className="input-row">
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Email" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="text" id="phone" placeholder="Phone Number" />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Password" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" id="confirmPassword" placeholder="Confirm Password" />
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Gender</label>
                        <div className="gender-options">
                            <input type="radio" id="male" name="gender" value="male" />
                            <label htmlFor="male">Male</label>
                            <input type="radio" id="female" name="gender" value="female" />
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


// const RegisterPage = () => {
//     return (
//         <div className="register-container">
//             <h2>Register</h2>
//             <form>
//                 <div className="form-group">
//                     <label>Email:</label>
//                     <input type="email" placeholder="Enter your email" />
//                 </div>
//                 <div className="form-group">
//                     <label>Password:</label>
//                     <input type="password" placeholder="Enter your password" />
//                 </div>
//                 <button type="submit" className="btn">Register</button>
//             </form>
//         </div>
//     );
// };

// export default RegisterPage;
