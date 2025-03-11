import { Link } from "react-router";
import WorkoutList from "./WorkoutList.jsx";

export default function Home() {
    return (
        <>
            <section className="home">
                <h2>Elevate Your Training</h2>
                <p>Discover and share workout routines</p>
                <Link key="/workouts" to="/workouts" className="btn">
                    Get Started
                </Link>
            </section>

            {/* <WorkoutList /> */}
        </>
    );
}
