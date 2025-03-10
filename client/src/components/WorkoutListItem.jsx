export default function WorkoutListItem({
    workoutName,
    difficulty,
    length,
    imgURL,
}) {
    return (
        <>
            <li className="workout-item">
                <a href="/">
                    <h3>{workoutName}</h3>
                    <img src={imgURL} alt={workoutName}></img>
                    <p>
                        {length} min | {difficulty}
                    </p>
                </a>
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
