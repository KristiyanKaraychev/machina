import "./App.css";

import { Route, Routes } from "react-router";

import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./components/home/Home.jsx";
import Login from "./components/auth/login/Login.jsx";
import Register from "./components/auth/register/Register.jsx";
import NotFound from "./components/404/NotFound.jsx";
import WorkoutCatalog from "./components/workout-catalog/WorkoutCatalog.jsx";
import WorkoutDetails from "./components/workout-catalog-details/WorkoutDetails.jsx";
import Subscriptions from "./components/Subscriptions/Subscriptions.jsx";
import { useState } from "react";
import useFetch from "./components/hooks/useFetch.js";
import Profile from "./components/profile/Profile.jsx";

function App() {
    const [user, setUser] = useState();

    const userLoginHandler = (user) => {
        setUser(user);
    };

    // const [pending, data] = useFetch(url)

    return (
        <>
            <Header />

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/workouts" element={<WorkoutCatalog />} />
                    <Route
                        path="/workouts/:workoutId"
                        element={<WorkoutDetails />}
                    />
                    <Route path="/subscriptions" element={<Subscriptions />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/login"
                        element={<Login onLogin={userLoginHandler} />}
                    />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </main>

            <Footer />
        </>
    );
}

export default App;
