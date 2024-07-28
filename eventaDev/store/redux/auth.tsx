import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Session } from '@supabase/supabase-js';
import { Alert } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Profile } from "../../interfaces/profileInterface";

interface AuthState {
    session: Session | null;
    profile: Profile | null;
    expoPushToken: string | null;
}

const initialState: AuthState = {
    session: null,
    profile: null,
    expoPushToken: null,
};

const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        setSession(state, action: PayloadAction<Session | null>) {
            state.session = action.payload;
        },
        setExpoPushToken(state, action: PayloadAction<string | null>) {
            state.expoPushToken = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.fulfilled, (state, action: PayloadAction<Session | null>) => {
                state.session = action.payload;
            })
            .addCase(signUp.fulfilled, (state, action: PayloadAction<Session | null>) => {
                state.session = action.payload;
            })
            .addCase(signOut.fulfilled, (state) => {
                state.session = null;
                state.profile = null;
            })
            .addCase(signInWithPhone.fulfilled, (state, action: PayloadAction<Session | null>) => {
                state.session = action.payload;
            })
            .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<Session | null>) => {
                state.session = action.payload;
            })
            .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<Profile | null>) => {
                state.profile = action.payload;
            })
            .addCase(updateProfile.fulfilled, (state, action: PayloadAction<Profile | null>) => {
                state.profile = action.payload;
            });
    },
});

// Async Functions

export const signIn = createAsyncThunk(
    "auth/signIn",
    async ({ email, password }: { email: string, password: string }) => {
        const { data: { session }, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message);
        return session;
    }
);

export const signUp = createAsyncThunk(
    "auth/signUp",
    async ({ email, password }: { email: string, password: string }) => {
        const { data: { session }, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message);
        if (!session) Alert.alert('Please check your inbox for email verification!');
        return session;
    }
)

export const signOut = createAsyncThunk(
    "auth/signOut",
    async () => {
        const { error } = await supabase.auth.signOut();
        if (error) Alert.alert(error.message);
        return null;
    }
)

export const signInWithPhone = createAsyncThunk(
    "auth/signInWithPhone",
    async ({ phone }: { phone: string }) => {
        const { error } = await supabase.auth.signInWithOtp({
            phone,
        });

        if (error) Alert.alert(error.message);
        return null; // Return null as session will be set after OTP verification
    }
)

export const verifyOtp = createAsyncThunk(
    "auth/verifyOtp",
    async ({ phone, otp }: { phone: string, otp: string }) => {
        const { data: { session }, error } = await supabase.auth.verifyOtp({
            phone,
            token: otp,
            type: 'sms'
        });

        if (error) Alert.alert(error.message);
        return session;
    }
)

export const fetchProfile = createAsyncThunk(
    "auth/fetchProfile",
    async (id: string) => {
        //console.log(`Fetching profile for user ID: ${id}`);
        const { data, error } = await supabase
            .from('profile')
            .select('id, firstName, lastName, email, gender, dob, phone, created_at, expo_push_token')
            .eq('id', id)
            .single();

        if (error) {
            console.error(`Error fetching profile for user ID: ${id}`, error.message);
            Alert.alert(error.message);
            return null;
        }

        //console.log(`Fetched profile data:`, data);
        return data;
    }
);

export const updateProfile = createAsyncThunk(
    "auth/updateProfile",
    async (profile: { id: string, firstName: string, lastName: string, email: string, gender: string, dob: string | null, phone: number | null }) => {
        const { id, firstName, lastName, email, gender, dob, phone } = profile;
        //console.log(`Upserting profile for user ID: ${id}`);
        
        const updates = {
            id,
            firstName,
            lastName,
            email,
            gender,
            dob,
            phone,
        };

        //console.log("Profile data to upsert:", updates);

        const { data, error } = await supabase
            .from('profile')
            .upsert(updates)
            .select(); // Make sure to select the updated record

        if (error) {
            console.error(`Error upserting profile for user ID: ${id}`, error.message);
            Alert.alert(error.message);
            return null;
        }

        //console.log(`Profile upserted successfully for user ID: ${id}`, data);
        return { id, firstName, lastName, email, gender, dob, phone, created_at: data[0].created_at };
    }
);

export const { setSession, setExpoPushToken } = authSlice.actions;
export default authSlice.reducer;
