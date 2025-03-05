import "./App.css";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";

function App() {
    return (
        <>
            <Header />

            <main>
                <section class="hero">
                    <h2>Elevate Your Training</h2>
                    <p>Discover and share workout routines</p>
                    <button>Get Started</button>
                </section>

                <section class="workout-list">
                    <div class="workout-item">
                        <h3>Strength Training</h3>
                        <p>45 min | Advanced</p>
                    </div>
                    <div class="workout-item">
                        <h3>HIIT Cardio</h3>
                        <p>30 min | Intermediate</p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default App;
