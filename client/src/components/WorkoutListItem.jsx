import { Link } from "react-router";

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
                    <h3>{workoutName}</h3>
                    <img src={imgURL} alt={workoutName}></img>
                    <p>
                        {length} min | {difficulty}
                    </p>
                </Link>
            </li>

            {/* <a href="/" className="workout-item">
                <h3>{workoutName}</h3>
                <img src={imgURL}></img>
                <p>
                    {length} min | {difficulty}
                </p>
            </a> */}
        </>
    );
}
