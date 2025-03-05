import { environment } from "../environment/environment.js";

export default {
    async getAll() {
        const response = await fetch(`${environment.apiURL}/workouts`);
        const result = response.json();

        return result;
    },
};
