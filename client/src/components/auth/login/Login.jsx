import React, { useState } from "react";

import "../Auth.css";
import { Link } from "react-router";

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
        <div className="auth-wrapper">
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

                    <button type="submit" className="btn">
                        Login
                    </button>
                </form>
                <p className="auth-footer">
                    Don't have an account?{" "}
                    <Link key="Register" to="/register">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
