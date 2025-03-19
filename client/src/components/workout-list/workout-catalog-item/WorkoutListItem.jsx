import { Link } from "react-router";
import SubscribeStar from "../../workout-catalog-subscribe-star/SubscribeStar.jsx";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext.js";

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
                    <img src={imgURL} alt={workoutName}></img>
                    <p>
                        {length} min | {difficulty}
                    </p>
                </Link>
            </li>
        </>
    );
}
