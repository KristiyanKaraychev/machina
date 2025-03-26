import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import App from "./App.jsx";
import ErrorProvider from "./providers/ErrorProvider.jsx";

createRoot(document.getElementById("root")).render(
    <ErrorProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ErrorProvider>
);
