import { createClient } from '@supabase/supabase-js'

// Your actual Supabase credentials
const supabaseUrl = 'https://cedrbmkbynekmvqxyyus.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlZHJibWtieW5la212cXh5eXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NzYyOTUsImV4cCI6MjA2MzQ1MjI5NX0.Dnz2ikHRACKLrqd5KmDJaJ9TJQw801mL0g-Zvs68t74'

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.')
}

// Create Supabase client with error handling
export const supabase = createClient(
  supabaseUrl, 
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
)

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl && supabaseAnonKey && 
         supabaseUrl !== 'https://your-project-id.supabase.co' && 
         supabaseAnonKey !== 'your-anon-key-here'
}

// Auth helper functions with better error handling
export const signUp = async (email: string, password: string) => {
  if (!isSupabaseConfigured()) {
    return { 
      data: null, 
      error: { message: 'Supabase is not configured. Please set up your environment variables.' } 
    }
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`
      }
    })
    return { data, error }
  } catch (err: any) {
    console.error('SignUp error:', err)
    return { 
      data: null, 
      error: { message: err.message || 'Network error. Please check your connection and try again.' } 
    }
  }
}

export const signIn = async (email: string, password: string) => {
  if (!isSupabaseConfigured()) {
    return { 
      data: null, 
      error: { message: 'Supabase is not configured. Please set up your environment variables.' } 
    }
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  } catch (err: any) {
    console.error('SignIn error:', err)
    return { 
      data: null, 
      error: { message: err.message || 'Network error. Please check your connection and try again.' } 
    }
  }
}

export const signOut = async () => {
  if (!isSupabaseConfigured()) {
    return { error: { message: 'Supabase is not configured.' } }
  }

  try {
    const { error } = await supabase.auth.signOut()
    return { error }
  } catch (err: any) {
    console.error('SignOut error:', err)
    return { error: { message: err.message || 'Network error. Please try again.' } }
  }
}

export const getCurrentUser = async () => {
  if (!isSupabaseConfigured()) {
    return { user: null, error: { message: 'Supabase is not configured.' } }
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  } catch (err: any) {
    console.error('GetUser error:', err)
    return { user: null, error: { message: err.message || 'Network error. Please try again.' } }
  }
}

export const resetPassword = async (email: string) => {
  if (!isSupabaseConfigured()) {
    return { 
      data: null, 
      error: { message: 'Supabase is not configured. Please set up your environment variables.' } 
    }
  }

  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    return { data, error }
  } catch (err: any) {
    console.error('ResetPassword error:', err)
    return { 
      data: null, 
      error: { message: err.message || 'Network error. Please try again.' } 
    }
  }
}

// Google OAuth sign in
export const signInWithGoogle = async () => {
  if (!isSupabaseConfigured()) {
    return { 
      data: null, 
      error: { message: 'Supabase is not configured. Please set up your environment variables.' } 
    }
  }

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    })
    return { data, error }
  } catch (err: any) {
    console.error('Google SignIn error:', err)
    return { 
      data: null, 
      error: { message: err.message || 'Google sign-in failed. Please try again.' } 
    }
  }
}
