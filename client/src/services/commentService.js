import { environment } from "../environment/environment.js";

export default {
    async getComments() {
        const response = await fetch(`${environment.apiURL}/comments`, {});
        const result = await response.json();

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

        return result;
    },
};
