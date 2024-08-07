import { Profile } from "./profileInterface";

export interface Contact {
    phoneNumber: string,
    firstName: string,
    lastName: string,
    countryCode: string,
    inDB: boolean,
    profile: Profile | null,
}