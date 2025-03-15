import "./App.css";

import { Route, Routes } from "react-router";

import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./components/home/Home.jsx";
import Login from "./components/auth/login/Login.jsx";
import Register from "./components/auth/register/Register.jsx";
import NotFound from "./components/404/NotFound.jsx";
import WorkoutList from "./components/workout-catalog/WorkoutList.jsx";
import WorkoutDetails from "./components/workout-catalog-details/WorkoutDetails.jsx";
import { useState } from "react";
import useFetch from "./components/hooks/useFetch.js";

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
                    <Route path="/workouts" element={<WorkoutList />} />
                    <Route
                        path="/workouts/:workoutId"
                        element={<WorkoutDetails />}
                    />
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
