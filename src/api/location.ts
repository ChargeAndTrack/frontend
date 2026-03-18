import type { Address, Location } from "@/types/location";
import { api } from "./api";
import type { AxiosResponse } from "node_modules/axios/index.d.cts";

const LOCATION_URL: string = "/location";

export const resolveAddressToCoordinatesRequest = async (address: string): Promise<AxiosResponse<Location>> => {
    return await api.get<Location>(`${LOCATION_URL}/resolve`, { params: { q: address } });
}

export const reverseCoordinatesToAddressRequest = async (location: Location)
        : Promise<AxiosResponse<Address>> => {
    return await api.get<Address>(
        `${LOCATION_URL}/reverse`,
        {
            params: {
                lat: location.latitude,
                lng: location.longitude
            }
        }
    );
}
