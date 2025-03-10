import React, { useState } from "react";

import "./Auth.css";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("Logging in with:", { email, password });
        // Handle authentication logic here
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
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

                <button type="submit" className="submit-btn">
                    Login
                </button>
            </form>
            <p className="auth-footer">
                Don't have an account? <a href="/register">Sign Up</a>
            </p>
        </div>
    );
};

export default LoginForm;
