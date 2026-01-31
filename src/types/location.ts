export interface Coordinates {
  lat: number,
  lng: number
}

export interface GeoPoint {
    type: string,
    coordinates: [number, number]
}

export const createGeoPoint = (coords: Coordinates, type?: string): GeoPoint => {
  return {
    "type": type ?? "Point",
    coordinates: [coords.lng, coords.lat]
  };
};

export interface Address {
    street: string,
    houseNumber?: string,
    city: string,
    postalCode?: string,
    region?: string,
    country: string
}

export const formatAddress = (address: Address): string => {
    return `${address.street}${address.houseNumber ? ' ' + address.houseNumber : ''}, ${address.city}`;
}
