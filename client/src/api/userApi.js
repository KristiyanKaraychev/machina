import request from "../utils/request.js";
import { useContext, useEffect } from "react";

import { environment } from "../environment/environment.js";
import { UserContext } from "../contexts/UserContext.js";

export const useLogin = () => {
    const login = async (email, password) => {
        return request.post(`${environment.apiURL}/login`, {
            email,
            password,
        });
    };

    return {
        login,
    };
};

export const useRegister = () => {
    const register = (username, email, password, confirmPassword) => {
        return request.post(`${environment.apiURL}/register`, {
            username,
            email,
            password,
            confirmPassword,
        });
    };
    return {
        register,
    };
};

export const useLogout = () => {
    const { _id, accessToken, userLogoutHandler } = useContext(UserContext);

    useEffect(() => {
        // if (!accessToken) {
        //     return;
        // }

        // const options = {
        //     headers: {
        //         "X-Authorization": accessToken,
        //     },
        // };

        request
            .post(`${environment.apiURL}/logout`, null)
            .then(userLogoutHandler);
    }, [userLogoutHandler]);
    // accessToken,
    return {
        isLoggedOut: !!_id,
    };
};
