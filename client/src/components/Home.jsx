import { Link } from "react-router";
import WorkoutList from "./WorkoutList.jsx";

export default function Home() {
    return (
        <>
            <section className="home">
                <h2>Elevate Your Training</h2>
                <p>Discover and share workout routines</p>
                <Link key="Workouts" to="/workouts" className="btn">
                    GET TO WORK
                </Link>
            </section>

            {/* <WorkoutList /> */}
        </>
    );
}
