import { Navigate, Outlet } from "react-router";
import { useContext } from "react";

import { UserContext } from "../contexts/UserContext.jsx";

export default function AuthGuard() {
    const { _id } = useContext(UserContext);

    if (!_id) {
        console.log("Route Guard: You need to be logged in!");
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
