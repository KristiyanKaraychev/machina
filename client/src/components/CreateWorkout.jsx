import React, { useState } from "react";

import "./CreateWorkout.css";

export default function CreateWorkout({ onClose, onSave }) {
    const [workoutName, setWorkoutName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("Beginner");
    const [time, setTime] = useState("");
    const [imgURL, setImgURL] = useState("");
    const [exercises, setExercises] = useState("");
    // const [exercises, setExercises] = useState([]);
    // const [exerciseInput, setExerciseInput] = useState("");

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

    const exercisesChangeHandler = (e) => {
        setExercises(e.target.value);
    };

    // const handleAddExercise = () => {
    //     if (exerciseInput.trim()) {
    //         setExercises([...exercises, exerciseInput]);
    //         setExerciseInput("");
    //     }
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const workoutData = {
    //         title,
    //         description,
    //         difficulty,
    //         time,
    //         exercises,
    //         image,
    //     };
    //     console.log("Workout Created:", workoutData);
    // };

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
                        <form onSubmit={onSave}>
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
                                <label htmlFor="exercises">Exercises</label>
                                <div>
                                    {/* className="exercise-input" */}
                                    <input
                                        id="exercises"
                                        name="exercises"
                                        type="text"
                                        value={exercises}
                                        onChange={exercisesChangeHandler}
                                    />
                                    {/* <button
                                        type="button"
                                        onClick={handleAddExercise}
                                    >
                                        Add
                                    </button> */}
                                </div>
                                {/* <ul className="exercise-list">
                                    {exercises.map((exercise, index) => (
                                        <li key={index}>- {exercise}</li>
                                    ))}
                                </ul> */}
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
