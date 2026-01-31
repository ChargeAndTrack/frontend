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

export const getClosestChargingStationRequest = async (address: string): Promise<AxiosResponse<ChargingStation>> => {
    const location = (await resolveAddressToCoordinatesRequest(address)).data;
    console.log("Location: " + JSON.stringify(location));
    return await api.get<ChargingStation>(
        `${CHARGING_STATION_URL}/closest`,
        {
            params: {
                lat: location.lat,
                lng: location.lng,
                onlyEnabledAndAvailable: false
            }
        }
    );
};

export const addChargingStationRequest = async (chargingStation: AddChargingStationBody) => {
    return await api.post(CHARGING_STATION_URL, chargingStation);
}

export const removeChargingStationRequest = async (chargingStationId: string) => {
    return await api.delete(`${CHARGING_STATION_URL}/${chargingStationId}`);
}

export const updateChargingStationRequest = async (chargingStationId: string, updates: UpdatableChargingStation) => {
    return await api.put(`${CHARGING_STATION_URL}/${chargingStationId}`, updates);
}
