import type { AddCarBody, Car } from "@/types/car";
import { api } from "./api";
import type { AxiosResponse } from "axios";

export const addCarRequest = async (car: AddCarBody): Promise<AxiosResponse<Car>> => {
    return await api.post<Car>("/cars", car);
}
