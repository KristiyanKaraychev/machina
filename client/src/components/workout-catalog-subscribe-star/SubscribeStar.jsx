import "./SubscribeStar.css";

import { FaStar } from "react-icons/fa";

import { useContext, useEffect, useState } from "react";

import { UserContext } from "../../contexts/UserContext.jsx";
import { ErrorContext } from "../../contexts/ErrorContext.jsx";

import workoutService from "../../services/workoutService.js";

export default function SubscribeStar({ alreadySubscribed, workoutId }) {
    const [isSubscribed, setIsSubscribed] = useState(alreadySubscribed);
    const { isLoggedIn } = useContext(UserContext);
    const { showError } = useContext(ErrorContext);

    useEffect(() => {
        setIsSubscribed(alreadySubscribed);
    }, [alreadySubscribed]);

    const handleSubscribeClick = async (e) => {
        e.preventDefault();

        if (!isSubscribed) {
            try {
                await workoutService.subscribe(workoutId).then((data) => {
                    console.log(data);
                    // setWorkout(data);
                    // setComments(data.comments);
                    setIsSubscribed(true);
                });
            } catch (error) {
                showError(error.message);
            }
        }
    };

    return (
        <>
            {isLoggedIn() && (
                <FaStar
                    className="favorite-icon"
                    color={isSubscribed ? "gold" : "lightgray"}
                    onClick={handleSubscribeClick}
                />
            )}
        </>
    );
}
