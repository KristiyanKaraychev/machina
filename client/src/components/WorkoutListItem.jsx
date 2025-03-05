export default function WorkoutListItem({ workoutName }) {
    return (
        <>
            <div className="workout-item">
                <h3>{workoutName}</h3>
                <p>45 min | Advanced</p>
            </div>
        </>
    );
}
