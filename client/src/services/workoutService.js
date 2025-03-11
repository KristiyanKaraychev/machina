import { environment } from "../environment/environment.js";

export default {
    async getAll(signal) {
        const response = await fetch(`${environment.apiURL}/workouts`, signal);
        const result = await response.json();

        return result;
    },
    async getOne(workoutId, signal) {
        const response = await fetch(
            `${environment.apiURL}/workouts/${workoutId}`,
            signal
        );

        const result = await response.json();

        return result;
    },
    async create(workoutData) {
        const response = await fetch(`${environment.apiURL}/workouts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(workoutData),
        });

        const result = await response.json();

        return result;
    },
    async delete(workoutId) {
        const response = await fetch(
            `${environment.apiURL}/workouts/${workoutId}`,
            {
                method: "DELETE",
            }
        );

        const result = await response.json();

        return result;
    },
};
