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
                    <a key="/" href="/">
                        MACHINA
                    </a>
                </h1>

                <nav>
                    {navigation.map((item) => (
                        <a key={item.name} href={item.path}>
                            {item.name}
                        </a>
                    ))}
                </nav>
            </header>
        </>
    );
}
