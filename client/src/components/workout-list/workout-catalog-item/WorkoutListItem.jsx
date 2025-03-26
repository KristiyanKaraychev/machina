import "./WorkoutListItem.css";

import { useContext } from "react";
import { Link } from "react-router";

import SubscribeStar from "../../workout-catalog-subscribe-star/SubscribeStar.jsx";

import { UserContext } from "../../../contexts/UserContext.jsx";

export default function WorkoutListItem({
    _id,
    workoutName,
    difficulty,
    length,
    imgURL,
    subscribers,
}) {
    const userContextData = useContext(UserContext);
    const userId = userContextData._id;

    const alreadySubscribed = () => {
        return subscribers.includes(userId);
    };

    return (
        <>
            <li className="workout-item">
                <Link key={_id} to={`/workouts/${_id}`}>
                    <SubscribeStar
                        alreadySubscribed={alreadySubscribed()}
                        workoutId={_id}
                    />
                    <h3>{workoutName}</h3>
                    <img
                        src={
                            imgURL ||
                            "https://cdn.vectorstock.com/i/2000v/02/13/dumbbell-icon-in-flat-style-workout-gym-tool-vector-54560213.avif"
                        }
                        alt={workoutName}
                    ></img>
                    <p>
                        {length} min | {difficulty}
                    </p>
                </Link>
            </li>
        </>
    );
}
