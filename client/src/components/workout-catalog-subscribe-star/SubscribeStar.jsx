import { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "./SubscribeStar.css";
import { UserContext } from "../../contexts/UserContext.js";
import workoutService from "../../services/workoutService.js";

export default function SubscribeStar({ alreadySubscribed, workoutId }) {
    const [isSubscribed, setIsSubscribed] = useState(alreadySubscribed);
    const { isLoggedIn } = useContext(UserContext);

    useEffect(() => {
        setIsSubscribed(alreadySubscribed);
    }, [alreadySubscribed]);

    const handleSubscribeClick = async (e) => {
        e.preventDefault();

        if (!isSubscribed) {
            await workoutService.subscribe(workoutId).then((data) => {
                console.log(data);
                // setWorkout(data);
                // setComments(data.comments);
                setIsSubscribed(true);
            });
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
