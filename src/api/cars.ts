import type { CarBody, Car } from "@/types/car";
import { api } from "./api";
import type { AxiosResponse } from "axios";

export const addCarRequest = async (car: CarBody): Promise<AxiosResponse<Car>> => {
    return await api.post<Car>("/cars", car);
}

export const getCarRequest = async (carId: string): Promise<AxiosResponse<Car>> => {
    return await api.get<Car>(`/cars/${carId}`);
}

export const updateCarRequest = async (carId: string, car: CarBody): Promise<AxiosResponse<Car>> => {
    return await api.put<Car>(`/cars/${carId}`, car);
}
