import { environment } from "../environment/environment.js";

export default {
    async getAll(signal) {
        const response = await fetch(`${environment.apiURL}/workouts`, signal);
        const result = await response.json();

        return result;
    },
    async getLastThree() {
        const response = await fetch(`${environment.apiURL}/workouts`);
        const result = await response.json();

        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        return result.slice(0, 3);
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
            credentials: "include",
            body: JSON.stringify(workoutData),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Invalid data!");
        }

        return result;
    },
    async edit(workoutId, workoutData) {
        const response = await fetch(
            `${environment.apiURL}/workouts/${workoutId}/edit`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(workoutData),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "You don't have permission to edit this!"
            );
        }

        return result;
    },
    async delete(workoutId) {
        const response = await fetch(
            `${environment.apiURL}/workouts/${workoutId}`,
            {
                method: "DELETE",
                credentials: "include",
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "You don't have permission to delete this!"
            );
        }

        return result;
    },
    async subscribe(workoutId) {
        const response = await fetch(
            `${environment.apiURL}/workouts/${workoutId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }
        );

        const result = await response.json();

        return result;
    },
};
