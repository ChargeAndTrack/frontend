import type { GeoPoint } from "./location";

export interface ChargingStation {
    _id: string,
    power: number,
    enabled?: boolean,
    location?: GeoPoint
}

export interface ChargingStationBody {
    power: number,
    enabled?: boolean,
    location?: GeoPoint
}
