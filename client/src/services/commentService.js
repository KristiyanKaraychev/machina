import { environment } from "../environment/environment.js";

export default {
    async getComments() {
        const response = await fetch(`${environment.apiURL}/comments`, {});
        const result = await response.json();

        if (!response.ok) {
            const errorMessage = result.message;
            throw new Error(errorMessage);
        }

        return result;
    },
    async createComment(commentText, workoutId) {
        const response = await fetch(
            `${environment.apiURL}/workouts/${workoutId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ commentText }),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            const errorMessage = result.message;
            throw new Error(errorMessage);
        }

        return result;
    },
    async likeComment(workoutId) {
        const response = await fetch(
            `${environment.apiURL}/likes/${workoutId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }
        );

        const result = await response.json();

        if (!response.ok) {
            const errorMessage = result.message;
            throw new Error(errorMessage);
        }

        return result;
    },
};
