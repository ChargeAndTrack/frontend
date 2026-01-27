import type { Car } from "./car";

export interface User {
    username: string;
    password: string;
    role: string;
    cars: Car[];
}
