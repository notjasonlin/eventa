import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://meehvdwhjxszsdgpeljs.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lZWh2ZHdoanhzenNkZ3BlbGpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0ODI2MzEsImV4cCI6MjAzMjA1ODYzMX0.lrkM5B3SNndgoeGG2KZQfrPuazs0_N-Nm4xKHHKGHvQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  realtime: {
    // Optional: customize the realtime config if needed
  },
})
