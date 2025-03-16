import WorkoutListItem from "./workout-catalog-item/WorkoutListItem.jsx";

export default function WorkoutList({ workouts }) {
    return (
        <>
            {workouts.length > 0 ? (
                <section className="workout-list">
                    {workouts.map((workout) => (
                        <WorkoutListItem key={workout._id} {...workout} />
                    ))}
                </section>
            ) : (
                <h1>No Workouts Yet!</h1>
            )}
        </>
    );
}
