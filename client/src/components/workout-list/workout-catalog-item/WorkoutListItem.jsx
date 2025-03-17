import { Link } from "react-router";
import SubscribeStar from "../../workout-catalog-subscribe-star/SubscribeStar.jsx";

export default function WorkoutListItem({
    _id,
    workoutName,
    difficulty,
    length,
    imgURL,
}) {
    return (
        <>
            <li className="workout-item">
                <Link key={_id} to={`/workouts/${_id}`}>
                    <SubscribeStar />
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
