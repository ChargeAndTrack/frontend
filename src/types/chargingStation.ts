import type { GeoPoint } from "./location";

export interface ChargingStation {
    power: number,
    enabled?: boolean,
    location?: GeoPoint
}
