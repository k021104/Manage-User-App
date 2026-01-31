import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    // Used for programmatic navigation after login
    const navigate = useNavigate();

    // State to store login form data
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    // Handles input field changes (email & password)
    const handleChange = (e) => {
        setLoginData({
            ...loginData,                       // Keep existing values
            [e.target.name]: e.target.value     // Update changed field
        });
    };

    // Handles login form submission
    const handleLogin = (e) => {
        e.preventDefault(); // Prevent page reload

        // Get registered user data from localStorage
        const storeUser = JSON.parse(localStorage.getItem("user"));

        // If no user is found, redirect to register
        if (!storeUser) {
            alert("No user found. Please register first.");
            return;
        }

        // Validate login credentials
        if (loginData.email === storeUser.email && loginData.password === storeUser.password) {
            // Mark user as logged in
            localStorage.setItem("isLoggedIn", true);
            // Navigate to profile page
            navigate("/profile");
        } else {
            alert("Invalid email or password");
        }
    };

    return (
        <div className='container mt-5'>
            <div className='card p-4'>
                <h3>Login</h3>

                {/* Login form */}
                <form onSubmit={handleLogin}>
                    <input
                        className='form-control mb-2'
                        name='email'
                        placeholder='Email'
                        onChange={handleChange}
                    />

                    <input
                        className='form-control mb-2'
                        type='password'
                        name='password'
                        placeholder='Password'
                        onChange={handleChange}
                    />

                    <button className='btn btn-primary w-100'>
                        Login
                    </button>
                </form>

                {/* Navigation link to register page */}
                <p className='mt-3 text-center'>
                    New User? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    )
}

export default Login