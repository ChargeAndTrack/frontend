import { loginRequest } from "@/api/authentication";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthenticationStore = defineStore('authentication', () => {
    const token = ref("");
    
    async function login(username: string, password: string) {
        const { data } = await loginRequest(username, password);
        token.value = data.token;
        localStorage.setItem("token", token.value);
    }

    function restoreSession() {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            token.value = savedToken;
        }
    }

    return { token, login, restoreSession };
});
