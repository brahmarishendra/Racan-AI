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
          name: fullName || email.split('@')[0],
          email: email
        }
      }
    })
    
    if (error) {
      console.error('SignUp error details:', error)
      
      // Handle specific error cases with more user-friendly messages
      if (error.message.includes('User already registered')) {
        return { 
          data: null, 
          error: { message: 'An account with this email already exists. Please sign in instead.' } 
        }
      } else if (error.message.includes('Database error') || error.message.includes('duplicate key')) {
        return { 
          data: null, 
          error: { message: 'An account with this email already exists. Please try signing in instead.' } 
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
      } else if (error.message.includes('Signup is disabled')) {
        return { 
          data: null, 
          error: { message: 'Account creation is temporarily disabled. Please try again later.' } 
        }
      } else if (error.message.includes('Email rate limit exceeded')) {
        return { 
          data: null, 
          error: { message: 'Too many signup attempts. Please wait a moment and try again.' } 
        }
      } else {
        // For any other database or server errors, provide a generic message
        return { 
          data: null, 
          error: { message: 'Unable to create account at this time. Please try again in a few minutes.' } 
        }
      }
    }
    
    // If signup was successful but user needs email confirmation
    if (data?.user && !data.user.email_confirmed_at && !data.session) {
      return { 
        data, 
        error: null,
        message: 'Please check your email and click the verification link to complete your account setup.'
      }
    }
    
    return { data, error }
  } catch (err: any) {
    console.error('SignUp unexpected error:', err)
    
    // Handle network and other unexpected errors
    if (err.message?.includes('fetch')) {
      return { 
        data: null, 
        error: { message: 'Network error. Please check your internet connection and try again.' } 
      }
    } else if (err.message?.includes('timeout')) {
      return { 
        data: null, 
        error: { message: 'Request timed out. Please try again.' } 
      }
    } else {
      return { 
        data: null, 
        error: { message: 'An unexpected error occurred. Please try again in a moment.' } 
      }
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
      } else if (error.message.includes('User not found')) {
        return { 
          data: null, 
          error: { message: 'No account found with this email. Please sign up first.' } 
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

// Get user profile - with graceful handling if profiles table doesn't exist
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
    
    // If profiles table doesn't exist, return null data without error
    if (error && error.message.includes('relation "public.profiles" does not exist')) {
      console.warn('Profiles table does not exist. User profiles are not available.')
      return { data: null, error: null }
    }
    
    return { data, error }
  } catch (err: any) {
    console.error('GetUserProfile error:', err)
    return { data: null, error: { message: err.message || 'Failed to fetch user profile.' } }
  }
}

// Update user profile - with graceful handling if profiles table doesn't exist
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
    
    // If profiles table doesn't exist, return gracefully
    if (error && error.message.includes('relation "public.profiles" does not exist')) {
      console.warn('Profiles table does not exist. Profile updates are not available.')
      return { data: null, error: { message: 'User profiles are not set up yet.' } }
    }
    
    return { data, error }
  } catch (err: any) {
    console.error('UpdateUserProfile error:', err)
    return { data: null, error: { message: err.message || 'Failed to update user profile.' } }
  }
}

// Helper function to check if profiles table exists - now returns gracefully without throwing errors
export const ensureProfilesTable = async () => {
  if (!isSupabaseConfigured()) {
    return { error: { message: 'Supabase is not configured.' } }
  }

  try {
    // Try to query the profiles table to see if it exists
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1)
    
    if (error && error.message.includes('relation "public.profiles" does not exist')) {
      console.warn('Profiles table does not exist. This is expected if the database migration has not been run yet.')
      return { error: null, profilesTableExists: false }
    }
    
    return { data, error: null, profilesTableExists: true }
  } catch (err: any) {
    console.error('Error checking profiles table:', err)
    return { error: { message: 'Database connection error.' }, profilesTableExists: false }
  }
}