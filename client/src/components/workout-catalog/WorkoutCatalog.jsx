import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import workoutService from "../../services/workoutService.js";
import CreateWorkout from "../workout-catalog-create/CreateWorkout.jsx";
import WorkoutList from "../workout-list/WorkoutList.jsx";
import { ChevronDownIcon } from "@heroicons/react/solid";

export default function WorkoutCatalog() {
    const [searchParams] = useSearchParams();
    const [workouts, setWorkouts] = useState([]);
    const [displayWorkouts, setDisplayWorkouts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [showCreateWorkout, setShowCreateWorkout] = useState(true);

    const sortOptions = [
        {
            name: "All",
            href: "/workouts",
            current: !searchParams.get("sortBy"),
        },

        {
            name: "Most Recent",
            href: "/workouts?sortBy=date&dir=asc",
            current: searchParams.get("sortBy") === "date",
        },
        {
            name: "Most Subscribed",
            href: "/workouts?sortBy=subscribers&dir=desc",
            current: searchParams.get("sortBy") === "subscribers",
        },
    ];

    useEffect(() => {
        const abortController = new AbortController();

        workoutService.getAll(abortController).then((data) => {
            console.log(data);
            setWorkouts(data);
        });

        return () => {
            abortController.abort();
        };
    }, []);

    useEffect(() => {
        const filter = Object.fromEntries(searchParams);

        if (filter.sortBy === "subscribers") {
            setDisplayWorkouts(
                [...workouts].sort((w1, w2) =>
                    filter.dir === "asc"
                        ? w1.subscribers.length - w2.subscribers.length
                        : w2.subscribers.length - w1.subscribers.length
                )
            );
        } else if (filter.sortBy === "date") {
            setDisplayWorkouts(
                [...workouts].sort((w1, w2) => {
                    if (filter.dir === "asc") {
                        return (
                            new Date(w2.created_at) - new Date(w1.created_at)
                        );
                    } else {
                        return (
                            new Date(w1.created_at) - new Date(w2.created_at)
                        );
                    }
                })
            );
        } else {
            setDisplayWorkouts([...workouts]);
        }
        setIsOpen(false);
    }, [workouts, searchParams]);

    const toggleDropDrownHandler = () => {
        setIsOpen(!isOpen);
    };

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

    const saveCreateWorkoutClickHandler = async (workoutData) => {
        // e.preventDefault();
        // const formData = new FormData(e.target);
        // const workoutData = Object.fromEntries(formData);
        // console.log(workoutData);

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

            <div className="menu-container">
                <button
                    className="menu-button"
                    onClick={toggleDropDrownHandler}
                >
                    <span style={{ fontWeight: "bold" }}>
                        Sort:{" "}
                        {
                            sortOptions.find(
                                (option) => option.current === true
                            )?.name
                        }
                    </span>
                    <ChevronDownIcon className="chevron-icon" />
                </button>

                {isOpen && (
                    <div className="menu-items">
                        {sortOptions.map((option) => (
                            <Link
                                key={option.name}
                                to={option.href}
                                className={`menu-item ${
                                    option.current ? "active" : ""
                                }`}
                            >
                                {option.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <WorkoutList workouts={displayWorkouts} />
        </>
    );
}
