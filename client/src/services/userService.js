import { environment } from "../environment/environment.js";

export default {
    async getProfile() {
        const response = await fetch(`${environment.apiURL}/users/profile`, {
            credentials: "include",
        });
        const result = await response.json();

        return result;
    },

    async editProfile(userData) {
        const response = await fetch(`${environment.apiURL}/users/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(userData),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "You don't have permission to edit this!"
            );
        }

        return result;
    },
};
