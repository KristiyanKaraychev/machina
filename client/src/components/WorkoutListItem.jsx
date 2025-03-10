export default function WorkoutListItem({ workoutName, difficulty, length }) {
    return (
        <>
            <div className="workout-item">
                <h3>{workoutName}</h3>
                <p>
                    {length} min | {difficulty}
                </p>
            </div>
        </>
    );
}
