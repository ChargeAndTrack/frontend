export interface Car {
    _id: string;
    plate: string;
    maxBattery: number;
    currentBattery: number;
}

export interface AddCarBody {
    plate: string;
    maxBattery: number;
}
