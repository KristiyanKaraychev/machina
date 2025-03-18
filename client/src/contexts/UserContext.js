import { createContext } from "react";

export const UserContext = createContext({
    _id: "",
    username: "",
    userLoginHandler: () => null,
    userLogoutHandler: () => null,
});
