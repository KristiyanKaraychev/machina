import WorkoutList from "./WorkoutList.jsx";

function Home() {
    return (
        <>
            <section className="hero">
                <h2>Elevate Your Training</h2>
                <p>Discover and share workout routines</p>
                <button>Get Started</button>
            </section>

            <WorkoutList />
        </>
    );
}

export default Home;
