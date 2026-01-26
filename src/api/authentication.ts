import { api } from "./api";

export const loginRequest = async (username: string, password: string) => {
    return await api.post("/login", { "username": username, "password": password });
}
