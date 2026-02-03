import type { Address, GeoPoint } from "./location";

export interface ChargingStation {
    _id: string;
    power: number; // in kW
    available: boolean;
    enabled: boolean;
    location: GeoPoint;
    currentCarId?: string;
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

export interface ChargingStationWithCarPlate extends ChargingStation {
    currentCarPlate?: string;
}

export interface ShowableChargingStation extends ChargingStationWithCarPlate {
    address: Address;
}
