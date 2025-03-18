import React, { useActionState, useContext } from "react";

import "../Auth.css";

import { Link, useNavigate } from "react-router";
import { useLogin } from "../../../api/userApi.js";
import { UserContext } from "../../../contexts/UserContext.js";

const LoginForm = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    // const emailChangeHandler = (e) => {
    //     setEmail(e.target.value);
    // };

    // const passwordChangeHandler = (e) => {
    //     setPassword(e.target.value);
    // };

    // const loginSubmitHandler = (e) => {
    //     e.preventDefault();
    //     console.log("Logging in with:", { email, password });
    //     // Handle authentication logic here

    //     onLogin({ email, password });
    //     navigate("/workouts");
    // };

    const navigate = useNavigate();
    const { login } = useLogin();
    const { userLoginHandler } = useContext(UserContext);

    const loginHandler = async (_, formData) => {
        const fromValues = Object.fromEntries(formData);

        console.log("Logging in with:", fromValues);

        const authData = await login(fromValues.email, fromValues.password);

        console.log(authData);

        if (authData.message) {
            console.log(authData.message);
            return;
        }

        userLoginHandler(authData);
        navigate("/");
    };

    const [_, loginAction, isPending] = useActionState(loginHandler, {
        email: "",
        password: "",
    });

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <h2>Login</h2>
                <form action={loginAction}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        // value={email}
                        // onChange={emailChangeHandler}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        // value={password}
                        // onChange={passwordChangeHandler}
                        required
                    />

                    <button type="submit" className="btn" disabled={isPending}>
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
