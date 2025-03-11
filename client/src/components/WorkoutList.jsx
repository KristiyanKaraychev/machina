import { useEffect, useState } from "react";

import WorkoutListItem from "./WorkoutListItem.jsx";
import CreateWorkout from "./CreateWorkout.jsx";

import workoutService from "../services/workoutService.js";

export default function WorkoutList() {
    const [workouts, setWorkouts] = useState([]);
    const [showCreateWorkout, setShowCreateWorkout] = useState(false);

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

    const workoutDeleteHandler = async (userId) => {
        //set userId
        await workoutService.delete(userId);

        //delete from local state?
    };

    const saveCreateWorkoutClickHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const workoutData = Object.fromEntries(formData);
        console.log(workoutData);

        const newWorkout = await workoutService.create({
            ...workoutData,
            user: { _id: "1231231" },
        });
        console.log(newWorkout);

        setWorkouts((state) => [...state, newWorkout]);

        setShowCreateWorkout(false);
    };

    return (
        <>
            {showCreateWorkout && (
                <CreateWorkout
                    onClose={closeCreateWorkoutClickHandler}
                    onSave={saveCreateWorkoutClickHandler}
                />
            )}

            <section className="workout-list">
                {workouts.map((workout) => (
                    <WorkoutListItem key={workout._id} {...workout} />
                ))}
            </section>
        </>
    );
}
