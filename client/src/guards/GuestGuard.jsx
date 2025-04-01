import { Navigate, Outlet } from "react-router";
import { useContext } from "react";

import { UserContext } from "../contexts/UserContext.jsx";

export default function GuestGuard() {
    const { _id } = useContext(UserContext);

    if (_id) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
