export default function WorkoutListItem({ title }) {
    return (
        <>
            <div className="workout-item">
                <h3>{title}</h3>
                <p>45 min | Advanced</p>
            </div>
        </>
    );
}
