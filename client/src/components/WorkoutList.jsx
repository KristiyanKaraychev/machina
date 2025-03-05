import { useEffect } from "react";

import workoutService from "../services/workoutService.js";

function WorkoutList() {
    useEffect(() => {
        workoutService.getAll().then((data) => console.log(data));
    }, []);

    return (
        <>
            <section className="workout-list">
                <div className="workout-item">
                    <h3>Strength Training</h3>
                    <p>45 min | Advanced</p>
                </div>
                <div className="workout-item">
                    <h3>Cardio</h3>
                    <p>30 min | Intermediate</p>
                </div>
            </section>
        </>
    );
}

export default WorkoutList;
