import "./WorkoutCatalog.css";

import { ChevronDownIcon } from "@heroicons/react/solid";

import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Helmet } from "react-helmet-async";

import workoutService from "../../services/workoutService.js";

import WorkoutList from "../workout-list/WorkoutList.jsx";

import { ErrorContext } from "../../contexts/ErrorContext.jsx";

export default function WorkoutCatalog() {
    const [searchParams] = useSearchParams();
    const [workouts, setWorkouts] = useState([]);
    const [displayWorkouts, setDisplayWorkouts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const { showError } = useContext(ErrorContext);

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
            setWorkouts(data);
        });
        // .catch((error) => {
        //     showError(error.message);
        // });

        return () => {
            abortController.abort();
        };
    }, [showError]);

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

    return (
        <>
            <Helmet>
                <title>Workouts - Machina</title>
            </Helmet>

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
