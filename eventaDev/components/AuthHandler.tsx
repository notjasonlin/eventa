import { React, useEffect } from "react";
import { supabase } from '../lib/supabase';
import { useRouter, useSegments } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/redux/store";
import { setSession } from "../store/redux/auth";


const AuthHandler = ({ children }: React.ReactNode) => {
    const rootSegment = useSegments()[0];
    const router = useRouter();
    const session = useSelector((state: RootState) => state.authentication.session);
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            dispatch(setSession(session));
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            dispatch(setSession(session));
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
        <>{children}</>
    );
}

export default AuthHandler;