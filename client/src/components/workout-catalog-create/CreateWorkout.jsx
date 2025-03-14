import React, { useEffect, useState } from "react";

import "./CreateWorkout.css";
import exerciseService from "../../services/exerciseService.js";

export default function CreateWorkout({ onClose, onSave }) {
    const [workoutName, setWorkoutName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("Beginner");
    const [time, setTime] = useState("");
    const [imgURL, setImgURL] = useState("");
    const [exercises, setExercises] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedExercises, setSelectedExercises] = useState([]);

    let filteredExercises = [];

    if (searchTerm !== "") {
        filteredExercises = exercises.filter((exercise) =>
            exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    useEffect(() => {
        exerciseService.getExercise().then((data) => {
            console.log(data);
            setExercises(data);
        });
    }, []);

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

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const workoutData = {
            ...Object.fromEntries(formData),
            exercises: selectedExercises,
        };

        // const workoutData = {
        //     workoutName,
        //     description,
        //     difficulty,
        //     length: time, // Ensure consistency in naming
        //     imgURL,
        //     exercises: selectedExercises.map((exercise) => exercise.id), // Send only IDs
        // };

        console.log("Workout Data:");
        console.log(workoutData);
        onSave(workoutData);
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
                        <h2>Create a Workout</h2>
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
                                Create Workout
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
