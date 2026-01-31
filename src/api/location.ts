import type { Address, Coordinates } from "@/types/location";
import { api } from "./api";
import type { AxiosResponse } from "node_modules/axios/index.d.cts";

const LOCATION_URL: string = "/location";

export const resolveAddressToCoordinatesRequest = async (address: string): Promise<AxiosResponse<Coordinates>> => {
    return await api.get<Coordinates>(`${LOCATION_URL}/resolve`, { params: { q: address } });
}

export const reverseCoordinatesToAddressRequest = async (coordinates: Coordinates)
        : Promise<AxiosResponse<{ address: Address }>> => {
    return await api.get<{ address: Address }>(
        `${LOCATION_URL}/reverse`,
        {
            params: {
                lat: coordinates.lat,
                lng: coordinates.lng
            }
        }
    );
}
