import { useState } from "react";
import { Link, NavLink } from "react-router";
import CreateWorkout from "../workout-catalog-create/CreateWorkout.jsx";

const navigation = [
    { name: "Home", path: "/" },
    { name: "Workouts", path: "/workouts" },
    { name: "Subscriptions", path: "/subscriptions" },
    { name: "Profile", path: "/profile" },
    { name: "Register", path: "/register" },
    { name: "Login", path: "/login" },
    { name: "Logout", path: "/logout" },
];

export default function Header() {
    const [showCreateWorkout, setShowCreateWorkout] = useState(false);

    const createWorkoutClickHandler = () => {
        setShowCreateWorkout(true);
    };

    const closeCreateWorkoutClickHandler = () => {
        setShowCreateWorkout(false);
    };

    const saveCreateWorkoutClickHandler = async () => {
        setShowCreateWorkout(false);
    };

    return (
        <>
            <header>
                {showCreateWorkout && (
                    <CreateWorkout
                        onClose={closeCreateWorkoutClickHandler}
                        onSave={saveCreateWorkoutClickHandler}
                    />
                )}

                <h1>
                    <Link key="Home" to="/">
                        MACHINA
                    </Link>
                </h1>

                <nav className="nav-left">
                    {navigation.slice(0, 3).map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            style={({ isActive }) =>
                                isActive ? { color: "#007bff" } : {}
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                    <NavLink
                        className={"btn"}
                        key={"Create"}
                        onClick={createWorkoutClickHandler}
                    >
                        + Create Workout
                    </NavLink>
                </nav>

                <nav className="nav-right">
                    {navigation.slice(3).map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            style={({ isActive }) =>
                                isActive ? { color: "#007bff" } : {}
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </header>
        </>
    );
}
