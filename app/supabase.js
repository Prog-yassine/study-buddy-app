import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yalmhjjptrpgypgouujm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhbG1oampwdHJwZ3lwZ291dWptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4ODEwNTMsImV4cCI6MjA2MTQ1NzA1M30.qWrY4YTSJ7OiP6Uqzr2sVeO8JzSJ4cngkYeVyjmDOLk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});