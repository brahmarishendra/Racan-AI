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
      detectSessionInUrl: true,
      flowType: 'pkce'
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
export const signUp = async (email: string, password: string, fullName?: string) => {
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
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          full_name: fullName || email.split('@')[0],
          name: fullName || email.split('@')[0]
        }
      }
    })
    
    if (error) {
      console.error('SignUp error details:', error)
      
      // Handle specific error cases
      if (error.message.includes('User already registered')) {
        return { 
          data: null, 
          error: { message: 'An account with this email already exists. Please sign in instead.' } 
        }
      } else if (error.message.includes('Database error')) {
        return { 
          data: null, 
          error: { message: 'There was a problem creating your account. Please try again in a moment.' } 
        }
      } else if (error.message.includes('Invalid email')) {
        return { 
          data: null, 
          error: { message: 'Please enter a valid email address.' } 
        }
      } else if (error.message.includes('Password should be at least')) {
        return { 
          data: null, 
          error: { message: 'Password must be at least 6 characters long.' } 
        }
      }
    }
    
    return { data, error }
  } catch (err: any) {
    console.error('SignUp unexpected error:', err)
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
    
    if (error) {
      console.error('SignIn error details:', error)
      
      // Handle specific error cases
      if (error.message.includes('Invalid login credentials')) {
        return { 
          data: null, 
          error: { message: 'Invalid email or password. Please check your credentials and try again.' } 
        }
      } else if (error.message.includes('Email not confirmed')) {
        return { 
          data: null, 
          error: { message: 'Please check your email and click the verification link before signing in.' } 
        }
      } else if (error.message.includes('Too many requests')) {
        return { 
          data: null, 
          error: { message: 'Too many login attempts. Please wait a moment and try again.' } 
        }
      }
    }
    
    return { data, error }
  } catch (err: any) {
    console.error('SignIn unexpected error:', err)
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
        redirectTo: `${window.location.origin}/`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
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

// Get user profile
export const getUserProfile = async (userId: string) => {
  if (!isSupabaseConfigured()) {
    return { data: null, error: { message: 'Supabase is not configured.' } }
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    return { data, error }
  } catch (err: any) {
    console.error('GetUserProfile error:', err)
    return { data: null, error: { message: err.message || 'Failed to fetch user profile.' } }
  }
}

// Update user profile
export const updateUserProfile = async (userId: string, updates: { full_name?: string; avatar_url?: string }) => {
  if (!isSupabaseConfigured()) {
    return { data: null, error: { message: 'Supabase is not configured.' } }
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single()
    
    return { data, error }
  } catch (err: any) {
    console.error('UpdateUserProfile error:', err)
    return { data: null, error: { message: err.message || 'Failed to update user profile.' } }
  }
}