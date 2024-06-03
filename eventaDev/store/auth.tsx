import { React, createContext, useState, useEffect, useContext } from "react";
import { Alert } from 'react-native';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { useRouter, useSegments } from "expo-router";

interface AuthContextType {
    session: Session | null;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<any>(null);

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: React.ReactNode) => {
    const rootSegment = useSegments()[0];
    const router = useRouter();
    const [session, setSession] = useState<Session | null>(null)


    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

    }, []);

    useEffect(() => {
        if ((!session || !session.user) && rootSegment !== "(auth)") {
            router.replace("/(auth)/SignIn");
        } else if (session && session.user && rootSegment !== "(app)") {
            router.replace("/");
        }
    }, [session, rootSegment]);

   
    return (
        <AuthContext.Provider
            value={{
                session: session,
                signIn: async (email: string, password: string) => {
                    const { error } = await supabase.auth.signInWithPassword({
                        email: email,
                        password: password,
                    });

                    if (error) Alert.alert(error.message);
                },
                signUp: async (email: string, password: string) => {
                    const { data: { session }, error } = await supabase.auth.signUp({
                        email: email,
                        password: password,
                    });

                    if (error) Alert.alert(error.message);
                    if (!session) Alert.alert('Please check your inbox for email verification!');
                },
                signOut: async () => {
                    const { error } = await supabase.auth.signOut();
                    if (error) Alert.alert(error.message);
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
