import "./Header.css";

import { FaBars, FaTimes } from "react-icons/fa";

import { useContext, useState } from "react";
import { Link, NavLink } from "react-router";

import CreateWorkout from "../workout-catalog-create/CreateWorkout.jsx";

import { UserContext } from "../../contexts/UserContext.jsx";

export default function Header() {
    const [showCreateWorkout, setShowCreateWorkout] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { isLoggedIn } = useContext(UserContext);

    const navigation = isLoggedIn()
        ? [
              { name: "Home", path: "/" },
              { name: "Workouts", path: "/workouts" },
              { name: "Profile", path: "/profile" },
              { name: "Logout", path: "/logout" },
          ]
        : [
              { name: "Home", path: "/" },
              { name: "Workouts", path: "/workouts" },
              { name: "Login", path: "/login" },
              { name: "Register", path: "/register" },
          ];

    const createWorkoutClickHandler = () => {
        setShowCreateWorkout(true);
        setMenuOpen(false);
    };

    const closeCreateWorkoutClickHandler = () => {
        setShowCreateWorkout(false);
    };

    const saveCreateWorkoutClickHandler = async () => {
        setShowCreateWorkout(false);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
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

                <button
                    className="nav-menu-btn"
                    onClick={() => setMenuOpen(true)}
                >
                    {menuOpen ? "" : <FaBars />}
                </button>

                <div className={`nav-overlay ${menuOpen ? "open" : ""}`}>
                    <div className="nav-overlay-content">
                        <button
                            className="nav-close-btn"
                            onClick={() => setMenuOpen(false)}
                        >
                            ✕
                        </button>
                        {navigation.slice(0, 2).map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                style={({ isActive }) =>
                                    isActive ? { color: "#007bff" } : {}
                                }
                                onClick={toggleMenu}
                            >
                                {item.name}
                            </NavLink>
                        ))}
                        {isLoggedIn() && (
                            <>
                                <NavLink
                                    key={"Subscriptions"}
                                    to={"/subscriptions"}
                                    style={({ isActive }) =>
                                        isActive ? { color: "#007bff" } : {}
                                    }
                                    onClick={toggleMenu}
                                >
                                    Subscriptions
                                </NavLink>
                                <NavLink
                                    key={"Create"}
                                    onClick={createWorkoutClickHandler}
                                >
                                    + Create Workout
                                </NavLink>
                            </>
                        )}
                        {navigation.slice(2).map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                style={({ isActive }) =>
                                    isActive ? { color: "#007bff" } : {}
                                }
                                onClick={toggleMenu}
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                </div>

                <nav className="nav-left">
                    {navigation.slice(0, 2).map((item) => (
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
                    {isLoggedIn() && (
                        <>
                            <NavLink
                                key={"Subscriptions"}
                                to={"/subscriptions"}
                                style={({ isActive }) =>
                                    isActive ? { color: "#007bff" } : {}
                                }
                            >
                                Subscriptions
                            </NavLink>
                            <NavLink
                                className={"btn"}
                                key={"Create"}
                                onClick={createWorkoutClickHandler}
                            >
                                + Create Workout
                            </NavLink>
                        </>
                    )}
                </nav>

                <nav className="nav-right">
                    {navigation.slice(2).map((item) => (
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
