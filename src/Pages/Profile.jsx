import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {
    // Used for navigation and route protection
    const navigate = useNavigate();
    // State to store logged-in user data
    const [user, setUser] = useState(null);

    // Runs once when profile page loads
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        const storeUser = JSON.parse(localStorage.getItem("user"));

        // Redirect to login if user is not authenticated
        if (!isLoggedIn || !storeUser) {
            navigate("/");
        } else {
            setUser(storeUser);
        }
    }, [navigate]);

    // Handles input changes for profile edit
    const handleChange = (e) => {
        setUser({
            ...user,                            // Keep existing values
            [e.target.name]: e.target.value     // Update edited field
        });
    };

    // Saves updated user data
    const handleSave = () => {
        localStorage.setItem("user", JSON.stringify(user));
        alert("Profile updated successfully");
    };

    // Handles logout functionality
    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate("/");
    };

    // Prevent rendering until user data is loaded
    if (!user) {
        return null;
    }

    return (
        <div className='container mt-5'>
            <div className='card p-4'>
                <h3>My Account</h3>

                {/* Editable name field */}
                <div className='mb-2'>
                    <label>Name</label>
                    <input
                        className='form-control'
                        name='name'
                        value={user.name}
                        onChange={handleChange}
                    />
                </div>

                {/* Editable email field */}
                <div className='mb-3'>
                    <label>Email</label>
                    <input
                        className='form-control'
                        name='email'
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>

                {/* Action buttons */}
                <button className='btn btn-success my-2' onClick={handleSave}>
                    Save
                </button>

                <button className='btn btn-danger' onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Profile