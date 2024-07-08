import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Session } from '@supabase/supabase-js';
import { Alert } from 'react-native';
import { supabase } from '../../lib/supabase';

interface AuthState {
    session: Session | null;
    profile: {
        firstName: string;
        lastName: string;
        email: string;
        gender: string;
    } | null;
}

const initialState: AuthState = {
    session: null,
    profile: null,
};

const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        setSession(state, action: PayloadAction<Session | null>) {
            state.session = action.payload;
        },
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
            .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<AuthState['profile']>) => {
                state.profile = action.payload;
            })
            .addCase(updateProfile.fulfilled, (state, action: PayloadAction<AuthState['profile']>) => {
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
    async (userId: string) => {
        const { data, error } = await supabase
            .from('profile')
            .select('firstName, lastName, email, gender')
            .eq('id', userId)
            .single();

        if (error) {
            Alert.alert(error.message);
            return null;
        }

        return data;
    }
);

export const updateProfile = createAsyncThunk(
    "auth/updateProfile",
    async (profile: { firstName: string, lastName: string, email: string, gender: string }) => {
        const { error } = await supabase
            .from('profile')
            .update(profile);

        if (error) {
            Alert.alert(error.message);
            return null;
        }

        return profile;
    }
);

export const { setSession } = authSlice.actions;
export default authSlice.reducer;