import "./CreateWorkout.css";

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import exerciseService from "../../services/exerciseService.js";
import workoutService from "../../services/workoutService.js";

import { ErrorContext } from "../../contexts/ErrorContext.jsx";

export default function CreateWorkout({ onClose, onSave }) {
    const [workoutName, setWorkoutName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("Beginner");
    const [length, setLength] = useState("");
    const [imgURL, setImgURL] = useState("");
    const [exercises, setExercises] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [errors, setErrors] = useState({});
    const { showError } = useContext(ErrorContext);

    const navigate = useNavigate();

    let filteredExercises = [];

    if (searchTerm !== "") {
        filteredExercises = exercises.filter((exercise) =>
            exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    useEffect(() => {
        exerciseService.getExercise().then((data) => {
            console.log("exercises:");
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

        if (!e.target.value.trim()) {
            setErrors((prev) => ({
                ...prev,
                workoutName: "Workout title is required!",
            }));
        } else if (e.target.value.trim().length < 3) {
            setErrors((prev) => ({
                ...prev,
                workoutName:
                    "Workout title must be at least 3 characters long!",
            }));
        } else if (e.target.value.trim().length > 20) {
            setErrors((prev) => ({
                ...prev,
                workoutName: "Workout title must not exceed 20 characters!",
            }));
        } else {
            setErrors((prev) => ({ ...prev, workoutName: null }));
        }
    };

    const descriptionChangeHandler = (e) => {
        setDescription(e.target.value);

        if (!e.target.value.trim()) {
            setErrors((prev) => ({
                ...prev,
                description: "Workout description is required!",
            }));
        } else if (e.target.value.trim().length < 10) {
            setErrors((prev) => ({
                ...prev,
                description:
                    "Workout description must be at least 10 characters long!",
            }));
        } else if (e.target.value.trim().length > 600) {
            setErrors((prev) => ({
                ...prev,
                description:
                    "Workout description must not exceed 600 characters!",
            }));
        } else {
            setErrors((prev) => ({ ...prev, description: null }));
        }
    };

    const difficultyChangeHandler = (e) => {
        setDifficulty(e.target.value);
    };

    const lengthChangeHandler = (e) => {
        setLength(e.target.value);

        if (e.target.value < 1) {
            setErrors((prev) => ({
                ...prev,
                length: "Workout length must be at least 5 minutes!",
            }));
        } else if (e.target.value > 300) {
            setErrors((prev) => ({
                ...prev,
                length: "Workout length cannot exceed 300 minutes (5 hours)!",
            }));
        } else {
            setErrors((prev) => ({ ...prev, length: "" }));
        }
    };

    const imgURLChangeHandler = (e) => {
        setImgURL(e.target.value);

        if (
            e.target.value &&
            !/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i.test(e.target.value)
        ) {
            setErrors((prev) => ({
                ...prev,
                imgURL: "Please enter a valid image link!",
            }));
        } else {
            setErrors((prev) => ({ ...prev, imgURL: "" }));
        }
    };

    const validateForm = () => {
        let newErrors = {};

        if (!workoutName.trim()) {
            newErrors.workoutName = "Workout title is required!";
        } else if (workoutName.trim().length < 3) {
            newErrors.workoutName =
                "Workout title must be at least 3 characters long!";
        } else if (workoutName.trim().length > 20) {
            newErrors.workoutName =
                "Workout title must not exceed 20 characters!";
        }

        if (!description.trim()) {
            newErrors.description = "Workout description is required!";
        } else if (description.trim().length < 10) {
            newErrors.description =
                "Workout description must be at least 10 characters long!";
        } else if (description.trim().length > 600) {
            newErrors.description =
                "Workout title must not exceed 600 characters!";
        }

        if (length < 5) {
            newErrors.length = "Workout length must be at least 5 minutes!";
        } else if (length > 300) {
            newErrors.length =
                "Workout length cannot exceed 300 minutes (5 hours)!";
        }

        if (selectedExercises.length == 0) {
            newErrors.exercises = "Select at least one exercise!";
        }

        if (
            imgURL &&
            !/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i.test(imgURL)
        ) {
            newErrors.imgURL = "Please enter a valid image link!";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        console.log(formData);

        const workoutData = {
            ...Object.fromEntries(formData),
            exercises: selectedExercises,
        };

        console.log("Workout Data:");
        console.log(workoutData);

        if (!validateForm()) {
            return;
        }

        try {
            const newWorkout = await workoutService.create({
                ...workoutData,
            });
            console.log(newWorkout);

            navigate(`/workouts/${newWorkout._id}`);
            onSave();
        } catch (error) {
            showError(error.message);
        }
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
                                {errors.workoutName && (
                                    <p className="error">
                                        {errors.workoutName}
                                    </p>
                                )}
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
                                {errors.description && (
                                    <p className="error">
                                        {errors.description}
                                    </p>
                                )}
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
                                    Estimated Length (mins)
                                </label>
                                <input
                                    id="length"
                                    name="length"
                                    type="number"
                                    value={length}
                                    onChange={lengthChangeHandler}
                                    required
                                />
                                {errors.length && (
                                    <p className="error">{errors.length}</p>
                                )}
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

                                {errors.exercises && (
                                    <p className="error">{errors.exercises}</p>
                                )}

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
                                <label htmlFor="imgURL">
                                    Workout Image (optional)
                                </label>
                                <input
                                    id="imgURL"
                                    name="imgURL"
                                    type="url"
                                    value={imgURL}
                                    onChange={imgURLChangeHandler}
                                />
                                {errors.imgURL && (
                                    <p className="error">{errors.imgURL}</p>
                                )}
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
