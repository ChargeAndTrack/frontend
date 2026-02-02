import type { ChargingStation, ChargingStationBody } from "@/types/chargingStation";
import { api } from "./api";
import { resolveAddressToCoordinatesRequest } from "./location";

const CHARGING_STATION_URL: string = "/charging-stations";

export const getChargingStationRequest = async (chargingStationId: string) => {
    return await api.get(`${CHARGING_STATION_URL}/${chargingStationId}`)
}

export const getClosestChargingStationRequest = async (address: string) => {
    const location = (await resolveAddressToCoordinatesRequest(address)).data;
    console.log("Location: " + JSON.stringify(location));
    return await api.get(
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

export const addChargingStationRequest = async (chargingStation: ChargingStationBody) => {
    return await api.post(CHARGING_STATION_URL, chargingStation);
}

export const removeChargingStationRequest = async (chargingStationId: string) => {
    return await api.delete(`${CHARGING_STATION_URL}/${chargingStationId}`);
}

export const updateChargingStationRequest = async (chargingStation: ChargingStation) => {
    return await api.put(`${CHARGING_STATION_URL}/${chargingStation._id}`, chargingStation);
}

export const stopRechargeRequest = async (chargingStationId: string, carId: string) => {
    return await api.post(`${CHARGING_STATION_URL}/${chargingStationId}/stop-recharge`, { "carId": carId });
}
