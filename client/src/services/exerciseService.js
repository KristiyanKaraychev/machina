import { environment } from "../environment/environment.js";

export default {
    async getExercise() {
        const response = await fetch(`${environment.apiURL}/exercises`, {});
        const result = await response.json();

        if (!response.ok) {
            const errorMessage = result.message;
            throw new Error(errorMessage);
        }

        return result;
    },
};
