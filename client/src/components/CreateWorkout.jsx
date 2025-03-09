import React, { useState } from "react";

import "./CreateWorkout.css";

export default function CreateWorkout({ onClose, onSave }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("Beginner");
    const [time, setTime] = useState("");
    // const [image, setImage] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [exerciseInput, setExerciseInput] = useState("");

    const handleAddExercise = () => {
        if (exerciseInput.trim()) {
            setExercises([...exercises, exerciseInput]);
            setExerciseInput("");
        }
    };

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
                                <label htmlFor="title">Workout Title</label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="difficulty">Difficulty</label>
                                <select
                                    id="difficulty"
                                    name="difficulty"
                                    value={difficulty}
                                    onChange={(e) =>
                                        setDifficulty(e.target.value)
                                    }
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
                                    onChange={(e) => setTime(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exercises">Exercises</label>
                                <div className="exercise-input">
                                    <input
                                        id="exercises"
                                        name="exercises"
                                        type="text"
                                        value={exerciseInput}
                                        onChange={(e) =>
                                            setExerciseInput(e.target.value)
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddExercise}
                                    >
                                        Add
                                    </button>
                                </div>
                                <ul className="exercise-list">
                                    {exercises.map((exercise, index) => (
                                        <li key={index}>- {exercise}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="form-group">
                                <label htmlFor="image">Workout Image</label>
                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setImage(e.target.files[0])
                                    }
                                />
                            </div>

                            <button type="submit" className="submit-btn">
                                Create Workout
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
