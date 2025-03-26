import "./ErrorMsg.css";

import { useContext } from "react";

import { ErrorContext } from "../../contexts/ErrorContext.jsx";

export default function ErrorMsg() {
    const { error } = useContext(ErrorContext);

    if (!error) return null;

    return <div className="notification error-message">{error}</div>;
}
