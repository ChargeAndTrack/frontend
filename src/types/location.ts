export interface Coordinates {
    latitude: number,
    longitude: number
}

export interface GeoPoint {
    type: string,
    coordinates: Coordinates
}

export interface Address {
    street: string,
    houseNumber: number,
    city: string
}
