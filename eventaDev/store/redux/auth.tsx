import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Session } from '@supabase/supabase-js';
import { Alert } from 'react-native';
import { supabase } from '../../lib/supabase';

interface AuthState {
    session: Session | null;
}

const initialState: AuthState = {
    session: null
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
            .addCase(signOut.fulfilled, (state, action: PayloadAction<null>) => {
                state.session = action.payload;
            })
    },
});

// Async Functions

export const signIn = createAsyncThunk(
    "auth/signIn",
    // Must pass in parameters as payload object (single parameter)
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


export const { setSession } = authSlice.actions;
export default authSlice.reducer;