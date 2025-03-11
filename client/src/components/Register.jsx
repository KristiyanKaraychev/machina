import React, { useState } from "react";

import "./Auth.css";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    };

    const confirmPasswordChangeHandler = (e) => {
        setConfirmPassword(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("Registering with:", { email, password });
        // Handle registration logic here
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <h2>Sign Up</h2>
                <p>Create your account.</p>
                <form onSubmit={submitHandler}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={emailChangeHandler}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={passwordChangeHandler}
                        required
                    />

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="confirmPassword"
                        value={confirmPassword}
                        onChange={confirmPasswordChangeHandler}
                        required
                    />

                    <button type="submit" className="btn">
                        Sign Up
                    </button>
                </form>
                <p className="auth-footer">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;
