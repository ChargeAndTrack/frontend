import { loginRequest } from "@/api/authentication";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthenticationStore = defineStore('authentication', () => {
    const token = ref("");
    const role = ref("");

    async function login(username: string, password: string) {
        const { data } = await loginRequest(username, password);
        role.value = data.role;
        token.value = data.token;
        localStorage.setItem("role", role.value);
        localStorage.setItem("token", token.value);
    }

    function restoreSession() {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            role.value = localStorage.getItem("role") ?? "";
            token.value = savedToken;
        }
    }

    function isAdmin(): boolean {
        return role.value.trim().toLowerCase() === "admin";
    }

    return { token, login, restoreSession, isAdmin };
});
