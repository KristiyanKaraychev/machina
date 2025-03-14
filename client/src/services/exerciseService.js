import { environment } from "../environment/environment.js";

export default {
    async getExercise() {
        const response = await fetch(`${environment.apiURL}/exercises`, {});
        const result = await response.json();

        return result;
    },
};
