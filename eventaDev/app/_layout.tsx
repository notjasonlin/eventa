import React from "react";
import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Auth from './Auth';
import { Session } from '@supabase/supabase-js'
import Nav from "./Nav";

const RootLayout = () => {

  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, []);

  return session && session.user ?  <Nav /> : <Auth />;
  
};

export default RootLayout;
