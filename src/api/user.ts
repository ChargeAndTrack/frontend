import type { User } from "@/types/user";
import { api } from "./api";
import type { AxiosResponse } from "axios";

export const getUserRequest = async (): Promise<AxiosResponse<User>> => {
    return await api.get<User>("/user");
}
