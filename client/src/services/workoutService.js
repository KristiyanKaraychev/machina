import { environment } from "../environment/environment.js";

export default {
    async getAll() {
        const response = await fetch(`${environment.apiURL}/workouts`);
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
};
