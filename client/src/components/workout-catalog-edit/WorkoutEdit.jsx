import React, { useEffect, useState } from "react";

import "./EditWorkout.css";
import exerciseService from "../../services/exerciseService.js";
import workoutService from "../../services/workoutService.js";
import { useNavigate } from "react-router";

export default function EditWorkout({
    workoutId,
    onClose,
    onSave,
    setWorkout,
}) {
    const [workoutName, setWorkoutName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [time, setTime] = useState("");
    const [imgURL, setImgURL] = useState("");
    const [exercises, setExercises] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedExercises, setSelectedExercises] = useState([]);

    const navigate = useNavigate();

    let filteredExercises = [];

    if (searchTerm !== "") {
        filteredExercises = exercises.filter((exercise) =>
            exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    useEffect(() => {
        const abortController = new AbortController();

        async function fetchWorkoutData() {
            try {
                const workoutData = await workoutService.getOne(
                    workoutId,
                    abortController
                );
                console.log(workoutData);

                setWorkoutName(workoutData.workoutName);
                setDescription(workoutData.description);
                setDifficulty(workoutData.difficulty);
                setTime(workoutData.length);
                setImgURL(workoutData.imgURL);
                setSelectedExercises(workoutData.exercises);

                const exercisesData = await exerciseService.getExercise();
                console.log("exercises:", exercisesData);

                const filteredExercises1 = exercisesData.filter(
                    (exercise) =>
                        !workoutData.exercises.some(
                            (selected) => selected._id === exercise._id
                        )
                );

                setExercises(filteredExercises1);
            } catch (error) {
                console.error("Error fetching workout data:", error);
            }
        }

        fetchWorkoutData();

        return () => {
            abortController.abort();
        };
    }, [workoutId]);

    const addExercise = (exercise) => {
        setSelectedExercises((prev) => [...prev, exercise]);
        setExercises((prev) => prev.filter((e) => e._id !== exercise._id));
    };

    const removeExercise = (exercise) => {
        const removedExercise = selectedExercises.find(
            (e) => e._id === exercise._id
        );
        setExercises((prev) => [...prev, removedExercise]);
        setSelectedExercises((prev) =>
            prev.filter((e) => e._id !== exercise._id)
        );
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const workoutData = {
            ...Object.fromEntries(formData),
            exercises: selectedExercises,
        };

        try {
            const editedWorkout = await workoutService.edit(workoutId, {
                ...workoutData,
            });

            setWorkout(editedWorkout);
            navigate(`/workouts/${workoutId}`);
            onSave();
        } catch (error) {
            console.log(error.message);
        }

        //     console.log("Workout Data:");
        //     console.log(workoutData);

        //     try {
        //         const newWorkout = await workoutService.create({
        //             ...workoutData,
        //         });
        //         console.log(newWorkout);

        //         navigate(`/workouts/${newWorkout._id}`);
        //         onSave();
        //     } catch (error) {
        //         console.log(error);
        //     }
    };

    const workoutNameChangeHandler = (e) => {
        setWorkoutName(e.target.value);
    };

    const descriptionChangeHandler = (e) => {
        setDescription(e.target.value);
    };

    const difficultyChangeHandler = (e) => {
        setDifficulty(e.target.value);
    };

    const timeChangeHandler = (e) => {
        setTime(e.target.value);
    };

    const imgURLChangeHandler = (e) => {
        setImgURL(e.target.value);
    };

    return (
        <>
            <div className="overlay">
                <div className="backdrop" onClick={onClose}></div>
                <div className="modal">
                    <div className="form-wrapper">
                        <button className="close-btn" onClick={onClose}>
                            &times;
                        </button>
                        <h2>Edit Workout</h2>
                        <form onSubmit={onSubmitHandler}>
                            <div className="form-group">
                                <label htmlFor="workoutName">
                                    Workout Title
                                </label>
                                <input
                                    id="workoutName"
                                    name="workoutName"
                                    type="text"
                                    value={workoutName}
                                    onChange={workoutNameChangeHandler}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={descriptionChangeHandler}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="difficulty">Difficulty</label>
                                <select
                                    id="difficulty"
                                    name="difficulty"
                                    value={difficulty}
                                    onChange={difficultyChangeHandler}
                                >
                                    <option>Beginner</option>
                                    <option>Intermediate</option>
                                    <option>Advanced</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="length">
                                    Estimated Time (mins)
                                </label>
                                <input
                                    id="length"
                                    name="length"
                                    type="number"
                                    value={time}
                                    onChange={timeChangeHandler}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Search Exercises:</label>
                                <input
                                    type="text"
                                    placeholder="Search exercises..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />

                                <ul className="exercise-list">
                                    {filteredExercises.map((exercise) => (
                                        <li key={exercise._id}>
                                            {exercise.name}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    addExercise(exercise)
                                                }
                                            >
                                                Add
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                <h3>Selected Exercises:</h3>
                                <ul className="selected-exercises">
                                    {selectedExercises.map((exercise) => (
                                        <li key={exercise._id}>
                                            {exercise.name}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeExercise(exercise)
                                                }
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="form-group">
                                <label htmlFor="imgURL">Workout Image</label>
                                <input
                                    id="imgURL"
                                    name="imgURL"
                                    type="url"
                                    value={imgURL}
                                    onChange={imgURLChangeHandler}
                                />
                            </div>

                            <button type="submit" className="btn">
                                Edit Workout
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
