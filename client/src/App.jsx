import "./App.css";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

function App() {
    return (
        <>
            <Header />

            <main>
                <Home />
                <Register />
                <Login />
            </main>

            <Footer />
        </>
    );
}

export default App;
