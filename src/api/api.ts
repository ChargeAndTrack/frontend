import router from "@/routes/router";
import { useAuthenticationStore } from "@/store/authentication.store";
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use(
    (config) => {
        const authenticationStore = useAuthenticationStore();
        if (authenticationStore.token) {
            config.headers.Authorization = authenticationStore.token;
        }
        return config;
    },
    (error) => {
        if (error.response?.status === 403) {
            router.push({ name: 'Forbidden' });
        }
        return Promise.reject(error);
    }
);
