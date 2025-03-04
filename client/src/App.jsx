import "./App.css";

function App() {
    const testFunction = () => {
        console.log("test");
    };

    return (
        <>
            <button onClick={testFunction}>Test</button>
        </>
    );
}

export default App;
