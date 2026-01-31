import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
    // Used to redirect user after registration
    const navigate = useNavigate();

    // State to store registration form data
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    // Handles input changes for all fields
    const handleChange = (e) => {
        setUser({
            ...user,                            // Keep existing values
            [e.target.name]: e.target.value     // Update specific field
        });
    };

    // Handles registration form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload

        // Basic validation for empty fields
        if (!user.name || !user.email || !user.password) {
            alert("All fields are required");
            return;
        }

        // Save user data in localStorage
        localStorage.setItem("user", JSON.stringify(user));

        alert("Registration successful");
        // Redirect to login page
        navigate("/");
    };

    return (
        <div className='container mt-5'>
            <div className='card p-4'>
                <h3>Register</h3>

                {/* Registration form */}
                <form onSubmit={handleSubmit}>
                    <input
                        className='form-control mb-2'
                        name='name'
                        placeholder='Name'
                        onChange={handleChange}
                    />

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
                        Register
                    </button>
                </form>

                <p className='mt-3 text-center'>
                    Already have an account? <Link to="/">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register