import type { ChargingStation } from "@/types/chargingStation";
import { api } from "./api";
import { resolveAddressToCoordinatesRequest } from "./location";

const CHARGING_STATION_URL: string = "/charging-stations";

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

export const  addChargingStationRequest = async (chargingStation: ChargingStation) => {
    return await api.post(CHARGING_STATION_URL, chargingStation);
}
