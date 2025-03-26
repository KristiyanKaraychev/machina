import { Navigate, Outlet } from "react-router";
import { useContext } from "react";

import { UserContext } from "../contexts/UserContext.jsx";
import { ErrorContext } from "../contexts/ErrorContext.jsx";

export default function GuestGuard() {
    const { _id } = useContext(UserContext);

    if (_id) {
        console.log("Route Guard: You are already logged in!");
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
