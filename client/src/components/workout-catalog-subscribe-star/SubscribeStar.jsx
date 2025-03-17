import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./SubscribeStar.css";

export default function SubscribeStar() {
    const [isFavorited, setIsFavorited] = useState(false);

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        if (!isFavorited) {
            setIsFavorited(true);
        }
    };

    return (
        <>
            <FaStar
                className="favorite-icon"
                color={isFavorited ? "gold" : "lightgray"}
                onClick={handleFavoriteClick}
            />
        </>
    );
}
