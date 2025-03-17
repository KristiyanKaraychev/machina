import { useEffect, useState } from "react";
import "./Subscriptions.css";

import workoutService from "../../services/workoutService.js";

import WorkoutList from "../workout-list/WorkoutList.jsx";

export default function Subscriptions() {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();

        workoutService.getAll(abortController).then((data) => {
            console.log(data);
            setWorkouts(data);
        });

        return () => {
            abortController.abort();
        };
    }, []);

    return (
        <>
            <div className="subscriptions-wrapper">
                <h1>Your Subscriptions</h1>
                <WorkoutList workouts={workouts} />
            </div>
        </>
    );
}
