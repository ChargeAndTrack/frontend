import type { CarBody, Car } from "@/types/car";
import { api } from "./api";
import type { AxiosResponse } from "axios";

const CARS_ENDPOINT = "/cars";
const carEndpoint = (carId: string) => `${CARS_ENDPOINT}/${carId}`;

export const getCarsRequest = async (): Promise<AxiosResponse<Car[]>> => {
    return await api.get<Car[]>(CARS_ENDPOINT);
}

export const addCarRequest = async (car: CarBody): Promise<AxiosResponse<Car>> => {
    return await api.post<Car>(CARS_ENDPOINT, car);
}

export const getCarRequest = async (carId: string): Promise<AxiosResponse<Car>> => {
    return await api.get<Car>(carEndpoint(carId));
}

export const updateCarRequest = async (carId: string, car: CarBody): Promise<AxiosResponse<Car>> => {
    return await api.put<Car>(carEndpoint(carId), car);
}

export const deleteCarRequest = async (carId: string): Promise<AxiosResponse<{ cars: Car[] }>> => {
    return await api.delete<{ cars: Car[] }>(carEndpoint(carId));
}
