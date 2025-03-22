import "../Auth.css";

import React, { useActionState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";

import { useRegister } from "../../../api/userApi.js";
import { UserContext } from "../../../contexts/UserContext.js";

const RegisterForm = () => {
    const navigate = useNavigate();
    const { register } = useRegister();
    const { userLoginHandler } = useContext(UserContext);

    const registerHandler = async (_, formData) => {
        const { username, email, password, confirmPassword } =
            Object.fromEntries(formData);

        if (password !== confirmPassword) {
            console.log("Password miss-match!");
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

                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" required />

                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                        />

                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                        />

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
