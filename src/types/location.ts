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
    city: string
}
