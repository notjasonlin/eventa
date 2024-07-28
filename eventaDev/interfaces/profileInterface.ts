export interface Profile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    dob: string | null;
    phone: number | null;
    created_at: string;
    // expo_push_token: string | null;
}