export interface Car {
    _id: string;
    plate: string;
    maxBattery: number;
    currentBattery: number;
    isCharging: boolean;
}

export interface CarBody {
    plate: string;
    maxBattery: number;
}
