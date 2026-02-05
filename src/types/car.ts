export interface Car {
    _id: string;
    plate: string;
    maxBattery: number; // in kWh
    currentBattery: number; // in percentage
    currentChargingStationId?: string;
}

export interface CarBody {
    plate: string;
    maxBattery: number; // in kWh
}
