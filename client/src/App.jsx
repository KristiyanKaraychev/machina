import "./App.css";

import { useContext, useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router";
import { HelmetProvider } from "react-helmet-async";

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
import GuestGuard from "./guards/GuestGuard.jsx";

import ErrorMsg from "./components/error-msg/ErrorMsg.jsx";

import { ErrorContext } from "./contexts/ErrorContext.jsx";
import UserProvider from "./providers/UserProvider.jsx";

function App() {
    const { showError } = useContext(ErrorContext);
    const showErrorRef = useRef(showError);
    const location = useLocation();

    useEffect(() => {
        showErrorRef.current = showError;
    }, [showError]);

    useEffect(() => {
        showErrorRef.current(null);
    }, [location.pathname]);

    return (
        <>
            <UserProvider>
                <ErrorMsg />
                <Header />
                <main>
                    <HelmetProvider>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/workouts"
                                element={<WorkoutCatalog />}
                            />
                            <Route
                                path="/workouts/:workoutId"
                                element={<WorkoutDetails />}
                            />

                            <Route element={<AuthGuard />}>
                                <Route
                                    path="/subscriptions"
                                    element={<Subscriptions />}
                                />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/logout" element={<Logout />} />
                            </Route>

                            <Route element={<GuestGuard />}>
                                <Route path="/login" element={<Login />} />
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                            </Route>

                            <Route path="/*" element={<NotFound />} />
                        </Routes>
                    </HelmetProvider>
                </main>
                <Footer />
            </UserProvider>
        </>
    );
}

export default App;
