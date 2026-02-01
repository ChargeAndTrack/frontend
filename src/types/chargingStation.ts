import type { Address, GeoPoint } from "./location";

export interface ChargingStation {
    _id: string;
    power: number; // in kW
    available: boolean;
    enabled: boolean;
    location: GeoPoint;
}

export interface AddChargingStationBody {
    power: number,
    enabled?: boolean,
    location?: GeoPoint
}

export interface UpdatableChargingStation {
    _id: string,
    power: number,
    enabled?: boolean,
    location?: GeoPoint
}

export interface ChargingStationWithAddress extends ChargingStation {
    address: Address
}
