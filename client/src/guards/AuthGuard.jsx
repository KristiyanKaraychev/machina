import { Navigate } from "react-router";
import { useContext } from "react";

import { UserContext } from "../contexts/UserContext.js";

export default function AuthGuard({ children }) {
    const { _id } = useContext(UserContext);

    if (!_id) {
        console.log("You need to be logged in!");
        return <Navigate to="/login" replace />;
    }

    return children;
}
