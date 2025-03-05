import React, { useState } from "react";
import "./CreateWorkout.css";

export default function CreateWorkout() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("Beginner");
    const [time, setTime] = useState("");
    const [image, setImage] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [exerciseInput, setExerciseInput] = useState("");

    const handleAddExercise = () => {
        if (exerciseInput.trim()) {
            setExercises([...exercises, exerciseInput]);
            setExerciseInput("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const workoutData = {
            title,
            description,
            difficulty,
            time,
            exercises,
            image,
        };
        console.log("Workout Created:", workoutData);
    };

    return (
        <>
            <div className="create-workout-container">
                <div className="form-wrapper">
                    <h2>Create a Workout</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Workout Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Difficulty</label>
                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                            >
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Estimated Time (mins)</label>
                            <input
                                type="number"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Exercises</label>
                            <div className="exercise-input">
                                <input
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
                            <label>Workout Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>

                        <button type="submit" className="submit-btn">
                            Create Workout
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
