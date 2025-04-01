import "./Subscriptions.css";

import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import workoutService from "../../services/workoutService.js";

import WorkoutList from "../workout-list/WorkoutList.jsx";

import { UserContext } from "../../contexts/UserContext.jsx";
import { ErrorContext } from "../../contexts/ErrorContext.jsx";

export default function Subscriptions() {
    const [workouts, setWorkouts] = useState([]);
    const { _id } = useContext(UserContext);
    const { showError } = useContext(ErrorContext);
    const userId = _id;

    useEffect(() => {
        const abortController = new AbortController();

        workoutService.getAll(abortController).then((data) => {
            let filteredData = data.filter((workout) =>
                workout.subscribers.includes(userId)
            );

            setWorkouts(filteredData);
        });
        // .catch((error) => {
        //     showError(error.message);
        // });

        return () => {
            abortController.abort();
        };
    }, [userId, showError]);
    return (
        <>
            <Helmet>
                <title>Subscriptions - Machina</title>
            </Helmet>

            <div className="subscriptions-wrapper">
                <h1>Your Subscriptions</h1>
                <WorkoutList workouts={workouts} />
            </div>
        </>
    );
}
