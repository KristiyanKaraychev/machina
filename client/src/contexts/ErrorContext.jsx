import { createContext } from "react";

export const ErrorContext = createContext({
    error: "",
    showError: () => null,
});
