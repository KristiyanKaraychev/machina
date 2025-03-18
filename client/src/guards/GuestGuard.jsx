import { Navigate } from "react-router";
import { useContext } from "react";

import { UserContext } from "../contexts/UserContext.js";

export default function GuestGuard({ children }) {
    const { _id } = useContext(UserContext);

    if (_id) {
        console.log("You are already logged in!");
        return <Navigate to="/" replace />;
    }

    return children;
}
