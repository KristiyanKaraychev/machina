import { Link, NavLink } from "react-router";

const navigation = [
    { name: "Home", path: "/" },
    { name: "Workouts", path: "/workouts" },
    { name: "Profile", path: "/profile" },
    { name: "Register", path: "/register" },
    { name: "Login", path: "/login" },
];

export default function Header() {
    return (
        <>
            <header>
                <h1>
                    <Link key="Home" to="/">
                        MACHINA
                    </Link>
                </h1>

                <nav>
                    {navigation.map((item) => (
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
