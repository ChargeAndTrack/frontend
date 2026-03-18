import type { Address, Location } from "./location";

export interface ChargingStation {
    _id: string;
    power: number; // in kW
    available: boolean;
    enabled: boolean;
    location: Location;
    currentCarId?: string;
}

export interface AddChargingStationBody {
    power: number,
    enabled?: boolean,
    location?: Location
}

export interface UpdatableChargingStation {
    _id: string,
    power: number,
    enabled?: boolean,
    location?: Location
}

export interface ChargingStationWithCarPlate extends ChargingStation {
    currentCarPlate?: string;
}

export interface ShowableChargingStation extends ChargingStationWithCarPlate {
    address: Address;
}
