import "../Auth.css";

import React, { useActionState, useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";

import { useRegister } from "../../../api/userApi.js";
import { UserContext } from "../../../contexts/UserContext.js";

const RegisterForm = () => {
    const navigate = useNavigate();
    const { register } = useRegister();
    const { userLoginHandler } = useContext(UserContext);
    const [errors, setErrors] = useState({});

    const validateForm = (formData) => {
        const newErrors = {};
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!formData.username.trim()) {
            newErrors.username = "Username is required!";
        } else if (formData.username.trim().length < 5) {
            newErrors.username = "Username must be at least 5 characters long!";
        } else if (formData.username.trim().length > 20) {
            newErrors.username = "Username must not exceed 20 characters!";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required!";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email!";
        }

        if (!formData.password) {
            newErrors.password = "Password is required!";
        } else if (formData.password.length < 6) {
            newErrors.password =
                "Password should be at least 6 characters long!";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Confirm Password is required!";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.password = "Password miss-match!";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const registerHandler = async (_, formData) => {
        const { username, email, password, confirmPassword } =
            Object.fromEntries(formData);

        if (!validateForm({ username, email, password, confirmPassword })) {
            return;
        }

        const authData = await register(
            username,
            email,
            password,
            confirmPassword
        );

        console.log(authData);

        if (authData.message) {
            console.log(authData.message);
            return;
        }

        userLoginHandler(authData);
        navigate("/");
    };

    const [_, registerAction, isPending] = useActionState(registerHandler, {
        email: "",
        password: "",
    });

    return (
        <>
            <Helmet>
                <title>Register - Machina</title>
            </Helmet>

            <div className="auth-wrapper">
                <div className="auth-container">
                    <h2>Sign Up</h2>
                    <p>Create your account.</p>
                    <form action={registerAction}>
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                        />
                        {errors.username && (
                            <p className="error">{errors.username}</p>
                        )}

                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" required />
                        {errors.email && (
                            <p className="error">{errors.email}</p>
                        )}

                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                        />
                        {errors.password && (
                            <p className="error">{errors.password}</p>
                        )}

                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                        />
                        {errors.confirmPassword && (
                            <p className="error">{errors.confirmPassword}</p>
                        )}

                        <button
                            type="submit"
                            className="btn"
                            disabled={isPending}
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className="auth-footer">
                        Already have an account?{" "}
                        <Link key="Login" to="/login">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default RegisterForm;
