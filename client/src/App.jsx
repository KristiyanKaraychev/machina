import "./App.css";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";

function App() {
    return (
        <>
            <Header />

            <main>
                <Home />
            </main>

            <Footer />
        </>
    );
}

export default App;
