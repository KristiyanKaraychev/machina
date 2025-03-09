import { useEffect, useState } from "react";

import WorkoutListItem from "./WorkoutListItem.jsx";
import CreateWorkout from "./CreateWorkout.jsx";

import workoutService from "../services/workoutService.js";

export default function WorkoutList() {
    const [workouts, setWorkouts] = useState([]);
    const [showCreateWorkout, setShowCreateWorkout] = useState(true);

    useEffect(() => {
        workoutService.getAll().then((data) => {
            console.log(data);
            setWorkouts(data);
        });
    }, []);

    const createWorkoutClickHandler = () => {
        setShowCreateWorkout(true);
    };

    const closeCreateWorkoutClickHandler = () => {
        setShowCreateWorkout(false);
    };

    return (
        <>
            {showCreateWorkout && (
                <CreateWorkout onClose={closeCreateWorkoutClickHandler} />
            )}

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
