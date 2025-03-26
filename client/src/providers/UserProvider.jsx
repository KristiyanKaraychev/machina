import { UserContext } from "../contexts/UserContext.jsx";
import usePersistedState from "../hooks/usePersistedState";

export default function UserProvider({ children }) {
    const [authData, setAuthData] = usePersistedState("[user]", {});

    const isLoggedIn = () => !!authData?._id;

    const userLoginHandler = (resultData) => {
        setAuthData(resultData);
    };

    const userLogoutHandler = () => {
        setAuthData({});
    };

    return (
        <UserContext.Provider
            value={{
                ...authData,
                userLoginHandler,
                userLogoutHandler,
                isLoggedIn,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
