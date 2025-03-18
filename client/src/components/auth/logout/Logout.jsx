import { Navigate } from "react-router";
import { useLogout } from "../../../api/userApi.js";

export default function Logout() {
    const { isLoggedOut } = useLogout();

    return isLoggedOut ? <Navigate key="Home" to="/" /> : null;
}
