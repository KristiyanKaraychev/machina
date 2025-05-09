import "./Home.css";

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";

import WorkoutList from "../workout-list/WorkoutList.jsx";

import workoutService from "../../services/workoutService.js";

import { ErrorContext } from "../../contexts/ErrorContext.jsx";

export default function Home() {
    const [workouts, setWorkouts] = useState([]);
    const { showError } = useContext(ErrorContext);

    useEffect(() => {
        workoutService
            .getLastThree()
            .then((data) => {
                setWorkouts(data);
            })
            .catch((error) => {
                showError(error.message);
            });
    }, [showError]);

    return (
        <>
            <Helmet>
                <title>Machina</title>
            </Helmet>

            <section className="home">
                <h1>Elevate Your Training</h1>
                <p>Discover and share workout routines</p>
                <Link key="Workouts" to="/workouts" className="btn">
                    GET TO WORK
                </Link>
            </section>
            <h2 className="home-workout-list">Recently Added</h2>
            <WorkoutList workouts={workouts} />
        </>
    );
}
