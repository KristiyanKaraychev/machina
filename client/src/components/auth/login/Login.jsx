import "../Auth.css";

import React, { useActionState, useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";

import { useLogin } from "../../../api/userApi.js";
import { UserContext } from "../../../contexts/UserContext.jsx";
import { ErrorContext } from "../../../contexts/ErrorContext.jsx";

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useLogin();
    const { userLoginHandler } = useContext(UserContext);
    const [errors, setErrors] = useState({});
    const { showError } = useContext(ErrorContext);

    const validateForm = (formData) => {
        const newErrors = {};
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!formData.email) {
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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const loginHandler = async (_, formData) => {
        const fromValues = Object.fromEntries(formData);

        if (!validateForm(fromValues)) {
            return;
        }

        try {
            const authData = await login(fromValues.email, fromValues.password);
            navigate("/");
            userLoginHandler(authData);
        } catch (error) {
            showError(error.message);
        }
    };

    const [_, loginAction, isPending] = useActionState(loginHandler, {
        email: "",
        password: "",
    });

    return (
        <>
            <Helmet>
                <title>Login - Machina</title>
            </Helmet>

            <div className="auth-wrapper">
                <div className="auth-container">
                    <h2>Login</h2>
                    <form action={loginAction}>
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

                        <button
                            type="submit"
                            className="btn"
                            disabled={isPending}
                        >
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
        </>
    );
};

export default LoginForm;
