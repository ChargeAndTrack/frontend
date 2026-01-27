import { api } from "./api";

export const getUserRequest = async () => {
    return await api.get("/user");
}
