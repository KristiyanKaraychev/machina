import { Link } from "react-router";

export default function NotFound() {
    return (
        <>
            <div className="not-found-container">
                <h1 className="not-found-heading">404</h1>
                <p className="not-found-text">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <Link key="/home" to="/" className="btn">
                    Go Back Home
                </Link>
            </div>
        </>
    );
}
