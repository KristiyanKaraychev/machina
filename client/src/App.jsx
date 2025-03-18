import "./App.css";

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";

import { UserContext } from "./contexts/UserContext.js";

import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./components/home/Home.jsx";
import Login from "./components/auth/login/Login.jsx";
import Register from "./components/auth/register/Register.jsx";
import NotFound from "./components/404/NotFound.jsx";
import WorkoutCatalog from "./components/workout-catalog/WorkoutCatalog.jsx";
import WorkoutDetails from "./components/workout-catalog-details/WorkoutDetails.jsx";
import Subscriptions from "./components/Subscriptions/Subscriptions.jsx";
import Profile from "./components/profile/Profile.jsx";
import Logout from "./components/auth/logout/Logout.jsx";

import AuthGuard from "./guards/AuthGuard.jsx";

function App() {
    const [authData, setAuthData] = useState(null);
    const userKey = "[user]";

    //check local storage for user
    useEffect(() => {
        console.log("Initial load.");

        const storedUserData = localStorage.getItem(userKey) || "";

        if (storedUserData) {
            setAuthData(JSON.parse(storedUserData));
        }
    }, []);

    const isLoggedIn = () => !!authData?._id;

    const userLoginHandler = (resultData) => {
        localStorage.setItem(userKey, JSON.stringify(resultData));
        setAuthData(resultData);
    };

    const userLogoutHandler = () => {
        localStorage.removeItem(userKey);
        setAuthData({});
    };

    return (
        <>
            <UserContext.Provider
                value={{
                    ...authData,
                    userLoginHandler,
                    userLogoutHandler,
                    isLoggedIn,
                }}
            >
                <Header />

                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/workouts" element={<WorkoutCatalog />} />
                        <Route
                            path="/workouts/:workoutId"
                            element={<WorkoutDetails />}
                        />
                        <Route
                            path="/subscriptions"
                            element={
                                <AuthGuard>
                                    <Subscriptions />
                                </AuthGuard>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <AuthGuard>
                                    <Profile />
                                </AuthGuard>
                            }
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/logout"
                            element={
                                <AuthGuard>
                                    <Logout />
                                </AuthGuard>
                            }
                        />
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </main>

                <Footer />
            </UserContext.Provider>
        </>
    );
}

export default App;
