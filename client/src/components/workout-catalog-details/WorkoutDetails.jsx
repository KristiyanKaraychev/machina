import { useEffect, useState } from "react";
import { useParams } from "react-router";

import workoutService from "../../services/workoutService.js";

export default function WorkoutDetails() {
    const { workoutId } = useParams();
    const [workout, setWorkout] = useState({});

    useEffect(() => {
        const abortController = new AbortController();

        workoutService.getOne(workoutId, abortController).then((data) => {
            console.log(data);
            setWorkout(data);
        });

        return () => {
            abortController.abort();
        };
    }, [workoutId]);

    return (
        <>
            <div className="workout-details">
                <img
                    src={workout.imgURL}
                    alt={workout.workoutName}
                    className="workout-image"
                />
                <h1 className="workout-title">{workout.workoutName}</h1>
                <p className="workout-description">{workout.description}</p>
                <p className="workout-meta">
                    <strong>Difficulty:</strong> {workout.difficulty} |{" "}
                    <strong>Length:</strong> {workout.length} min
                </p>

                <h2>Exercises</h2>
                {/* <ul className="exercise-list">
                    {workout.exercises.length > 0 ? (
                        workout.exercises.map((exercise, index) => (
                            <li key={index} className="exercise-item">
                                {exercise.name}
                            </li>
                        ))
                    ) : (
                        <p>No exercises found for this workout.</p>
                    )}
                </ul> */}
            </div>
        </>
    );
}
