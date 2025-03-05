import React, { useState } from "react";

import "./Auth.css";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Registering with:", { email, password });
        // Handle registration logic here
    };

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            <p>Create your account.</p>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="submit-btn">
                    Sign Up
                </button>
            </form>
            <p className="auth-footer">
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    );
};

export default RegisterForm;
