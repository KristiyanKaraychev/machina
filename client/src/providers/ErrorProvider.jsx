import { useState } from "react";

import { ErrorContext } from "../contexts/ErrorContext.jsx";

export default function ErrorProvider({ children }) {
    const [error, setError] = useState(null);

    const showError = (message) => {
        console.log("error changed");
        console.log("message:" + message);

        setError(message);
    };

    return (
        <ErrorContext.Provider value={{ error, showError }}>
            {children}
        </ErrorContext.Provider>
    );
}
