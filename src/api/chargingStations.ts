import type { AddChargingStationBody, ChargingStation, UpdatableChargingStation } from "@/types/chargingStation";
import { api } from "./api";
import { resolveAddressToCoordinatesRequest } from "./location";
import { useAuthenticationStore } from "@/store/authentication.store";
import type { AxiosResponse } from "node_modules/axios/index.d.cts";
import type { Coordinates } from "@/types/location";

const CHARGING_STATION_URL: string = "/charging-stations";
export const DEFAULT_RADIUS_IN_METERS: number = 5000;

export const getNearbyChargingStationsRequest = async (coordinates: Coordinates)
        : Promise<AxiosResponse<ChargingStation[]>> => {
    return await api.get<ChargingStation[]>(
        `${CHARGING_STATION_URL}/near`,
        {
            params: {
                lng: coordinates.lng,
                lat: coordinates.lat,
                radius: DEFAULT_RADIUS_IN_METERS,
                onlyEnabled: useAuthenticationStore().isAdmin() ? false : true
            }
        }
    );
};

export async function getClosestChargingStationRequest(coordinates: Coordinates)
        : Promise<AxiosResponse<ChargingStation>>;
export async function getClosestChargingStationRequest(address: string)
        : Promise<AxiosResponse<ChargingStation>>;
export async function getClosestChargingStationRequest(value: Coordinates | string)
        : Promise<AxiosResponse<ChargingStation>> {
    if (typeof value === "string") {
        const location = (await resolveAddressToCoordinatesRequest(value)).data;
        console.log("Location: " + JSON.stringify(location));
        value = location;
    }
    return await api.get<ChargingStation>(
        `${CHARGING_STATION_URL}/closest`,
        {
            params: {
                lng: value.lng,
                lat: value.lat,
                onlyEnabledAndAvailable: useAuthenticationStore().isAdmin() ? false : true
            }
        }
    );
};

export const getChargingStationRequest = async (chargingStationId: string) => {
    return await api.get(`${CHARGING_STATION_URL}/${chargingStationId}`)
}

export const addChargingStationRequest = async (chargingStation: AddChargingStationBody) => {
    return await api.post(CHARGING_STATION_URL, chargingStation);
}

export const removeChargingStationRequest = async (chargingStationId: string) => {
    return await api.delete(`${CHARGING_STATION_URL}/${chargingStationId}`);
}

export const updateChargingStationRequest = async (chargingStation: UpdatableChargingStation) => {
    return await api.put(`${CHARGING_STATION_URL}/${chargingStation._id}`, chargingStation);
}

export const stopRechargeRequest = async (chargingStationId: string, carId: string) => {
    return await api.post(`${CHARGING_STATION_URL}/${chargingStationId}/stop-recharge`, { "carId": carId });
}
