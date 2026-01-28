import type { Coordinates } from "@/types/location";
import { api } from "./api";

const LOCATION_URL: string = "/location";

export const resolveAddressToCoordinatesRequest = async (address: string) => {
    return await api.get(`${LOCATION_URL}/resolve`, { params: { q: address } });
}

export const reverseCoordinatesToAddressRequest = async (coordinates: Coordinates) => {
    return await api.get(
        `${LOCATION_URL}/reverse`,
        {
            params: {
                lat: coordinates.latitude,
                lng: coordinates.longitude
            }
        }
    );
}
