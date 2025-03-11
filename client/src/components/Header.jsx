import { Link } from "react-router";

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
                    <Link key="/home" to="/">
                        MACHINA
                    </Link>
                </h1>

                <nav>
                    {navigation.map((item) => (
                        <Link key={item.name} to={item.path}>
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </header>
        </>
    );
}
