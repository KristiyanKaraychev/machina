import "./App.css";
import CreateWorkout from "./components/CreateWorkout.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";

function App() {
    return (
        <>
            <Header />

            <main>
                <Home />
                <CreateWorkout />
            </main>

            <Footer />
        </>
    );
}

export default App;
