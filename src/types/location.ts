export interface Location {
    longitude: number
    latitude: number
}

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
