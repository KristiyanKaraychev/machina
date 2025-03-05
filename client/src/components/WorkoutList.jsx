import { useEffect, useState } from "react";

import WorkoutListItem from "./WorkoutListItem.jsx";

import workoutService from "../services/workoutService.js";

export default function WorkoutList() {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        workoutService.getAll().then((data) => {
            console.log(data);
            setWorkouts(data);
        });
    }, []);

    return (
        <>
            <section className="workout-list">
                {workouts.map((workout) => (
                    <WorkoutListItem key={workout._id} {...workout} />
                ))}

                <div className="workout-item">
                    <h3>Cardio</h3>
                    <p>30 min | Intermediate</p>
                </div>
            </section>
        </>
    );
}
