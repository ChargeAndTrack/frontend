export interface Coordinates {
    latitude: number,
    longitude: number
}

export interface GeoPoint {
    type: string,
    coordinates: [number, number]
}

export const createGeoPoint = (coords: Coordinates, type?: string): GeoPoint => {
    return {
        "type": type ?? "Point",
        coordinates: [coords.longitude, coords.latitude]
    };
};

export interface Address {
    street: string,
    houseNumber?: number,
    city: string
}

export const formatAddress = (address: Address): string => {
    return `${address.street}${address.houseNumber ? ' ' + address.houseNumber : ''}, ${address.city}`;
}
