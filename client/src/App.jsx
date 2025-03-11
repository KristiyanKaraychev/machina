import "./App.css";

import { Route, Routes } from "react-router";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";
import Workouts from "./components/Workouts.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import NotFound from "./components/NotFound.jsx";
import WorkoutList from "./components/WorkoutList.jsx";
import WorkoutDetails from "./components/WorkoutDetails.jsx";

function App() {
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
                    <Route path="/login" element={<Login />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </main>

            <Footer />
        </>
    );
}

export default App;
