import { createClient } from '@supabase/supabase-js'

// Your actual Supabase credentials
const supabaseUrl = 'https://cedrbmkbynekmvqxyyus.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlZHJibWtieW5la212cXh5eXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NzYyOTUsImV4cCI6MjA2MzQ1MjI5NX0.Dnz2ikHRACKLrqd5KmDJaJ9TJQw801mL0g-Zvs68t74'

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your configuration.')
}

// Create Supabase client with proper email verification settings
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

// Auth helper functions with proper email verification
export const signUp = async (email: string, password: string, fullName?: string) => {
  if (!isSupabaseConfigured()) {
    return { 
      data: null, 
      error: { message: 'Authentication service is not configured. Please contact support.' } 
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
      } else if (error.message.includes('Password should be at least') || error.message.includes('weak_password')) {
        return { 
          data: null, 
          error: { message: 'Password must be at least 6 characters long and contain uppercase, lowercase, and numeric characters.' } 
        }
      } else if (error.message.includes('Password should contain at least one character')) {
        return { 
          data: null, 
          error: { message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number.' } 
        }
      } else if (error.message.includes('Signup is disabled')) {
        return { 
          data: null, 
          error: { message: 'Account creation is temporarily disabled. Please try again later.' } 
        }
      } else if (error.message.includes('Email rate limit exceeded') || error.message.includes('over_email_send_rate_limit')) {
        return { 
          data: null, 
          error: { message: 'Too many emails sent. Please wait a few minutes before trying again.' } 
        }
      } else if (error.message.includes('Error sending confirmation email')) {
        return { 
          data: null, 
          error: { message: 'Account created but email confirmation failed. Please contact support to verify your account.' } 
        }
      } else if (error.message.includes('rate limit') || error.status === 429) {
        return { 
          data: null, 
          error: { message: 'Too many requests. Please wait a few minutes before trying again.' } 
        }
      } else {
        return { 
          data: null, 
          error: { message: error.message || 'Unable to create account. Please try again.' } 
        }
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
    } else if (err.status === 429 || err.message?.includes('rate limit')) {
      return { 
        data: null, 
        error: { message: 'Too many requests. Please wait a few minutes before trying again.' } 
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
      error: { message: 'Authentication service is not configured. Please contact support.' } 
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
      if (error.message.includes('Invalid login credentials') || error.message.includes('invalid_credentials')) {
        return { 
          data: null, 
          error: { message: 'Invalid email or password. Please check your credentials and try again.' } 
        }
      } else if (error.message.includes('Email not confirmed')) {
        return { 
          data: null, 
          error: { message: 'Please check your email and click the verification link before signing in.' } 
        }
      } else if (error.message.includes('Too many requests') || error.status === 429) {
        return { 
          data: null, 
          error: { message: 'Too many login attempts. Please wait 10-15 minutes and try again.' } 
        }
      } else if (error.message.includes('User not found')) {
        return { 
          data: null, 
          error: { message: 'No account found with this email. Please sign up first.' } 
        }
      } else {
        return { 
          data: null, 
          error: { message: error.message || 'Sign in failed. Please try again.' } 
        }
      }
    }
    
    return { data, error }
  } catch (err: any) {
    console.error('SignIn unexpected error:', err)
    if (err.status === 429 || err.message?.includes('rate limit')) {
      return { 
        data: null, 
        error: { message: 'Too many requests. Please wait 10-15 minutes and try again.' } 
      }
    }
    return { 
      data: null, 
      error: { message: err.message || 'Network error. Please check your connection and try again.' } 
    }
  }
}

export const signOut = async () => {
  if (!isSupabaseConfigured()) {
    return { error: { message: 'Authentication service is not configured.' } }
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
    return { user: null, error: { message: 'Authentication service is not configured.' } }
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
      error: { message: 'Authentication service is not configured. Please contact support.' } 
    }
  }

  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    
    if (error && (error.status === 429 || error.message?.includes('rate limit'))) {
      return { 
        data: null, 
        error: { message: 'Too many password reset requests. Please wait 10-15 minutes before trying again.' } 
      }
    }
    
    return { data, error }
  } catch (err: any) {
    console.error('ResetPassword error:', err)
    if (err.status === 429 || err.message?.includes('rate limit')) {
      return { 
        data: null, 
        error: { message: 'Too many requests. Please wait 10-15 minutes before trying again.' } 
      }
    }
    return { 
      data: null, 
      error: { message: err.message || 'Network error. Please try again.' } 
    }
  }
}

// Google OAuth sign in with better error handling
export const signInWithGoogle = async () => {
  if (!isSupabaseConfigured()) {
    return { 
      data: null, 
      error: { message: 'Authentication service is not configured. Please contact support.' } 
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
        },
        skipBrowserRedirect: false
      }
    })
    
    if (error) {
      console.error('Google OAuth error:', error)
      if (error.status === 429 || error.message?.includes('rate limit')) {
        return { 
          data: null, 
          error: { message: 'Too many requests. Please wait 10-15 minutes before trying again.' } 
        }
      }
      return { 
        data: null, 
        error: { message: 'Google sign-in failed. Please try again or use email login.' } 
      }
    }
    
    return { data, error }
  } catch (err: any) {
    console.error('Google SignIn unexpected error:', err)
    if (err.status === 429 || err.message?.includes('rate limit')) {
      return { 
        data: null, 
        error: { message: 'Too many requests. Please wait 10-15 minutes before trying again.' } 
      }
    }
    return { 
      data: null, 
      error: { message: 'Google sign-in failed. Please try again or use email login.' } 
    }
  }
}

// Auth state listener
export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
  return supabase.auth.onAuthStateChange(callback)
}

// Check if user is authenticated
export const isAuthenticated = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    return !!session?.user
  } catch (error) {
    console.error('Error checking auth state:', error)
    return false
  }
}

// Get current session
export const getCurrentSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  } catch (err: any) {
    console.error('GetSession error:', err)
    return { session: null, error: { message: err.message || 'Failed to get session.' } }
  }
}

// Handle OAuth callback
export const handleOAuthCallback = async () => {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.error('OAuth callback error:', error)
      return { user: null, error }
    }
    return { user: data.session?.user || null, error: null }
  } catch (err: any) {
    console.error('OAuth callback unexpected error:', err)
    return { user: null, error: { message: err.message || 'OAuth callback failed.' } }
  }
}

// Resend email verification
export const resendEmailVerification = async (email: string) => {
  if (!isSupabaseConfigured()) {
    return { 
      data: null, 
      error: { message: 'Authentication service is not configured. Please contact support.' } 
    }
  }

  try {
    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: `${window.location.origin}/`
      }
    })
    
    if (error) {
      console.error('Resend verification error:', error)
      if (error.status === 429 || error.message?.includes('rate limit')) {
        return { 
          data: null, 
          error: { message: 'Too many verification emails sent. Please wait a few minutes before trying again.' } 
        }
      }
      return { 
        data: null, 
        error: { message: error.message || 'Failed to resend verification email. Please try again.' } 
      }
    }
    
    return { data, error }
  } catch (err: any) {
    console.error('Resend verification unexpected error:', err)
    return { 
      data: null, 
      error: { message: err.message || 'Network error. Please try again.' } 
    }
  }
}

// Simplified profile functions that don't depend on profiles table
export const getUserProfile = async (userId: string) => {
  // Since profiles table doesn't exist, return user data from auth
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) {
      return { data: null, error }
    }
    
    // Return user metadata as profile
    return {
      data: {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0],
        avatar_url: user.user_metadata?.avatar_url,
        created_at: user.created_at,
        updated_at: user.updated_at
      },
      error: null
    }
  } catch (err: any) {
    console.error('GetUserProfile error:', err)
    return { data: null, error: { message: err.message || 'Failed to fetch user profile.' } }
  }
}

export const updateUserProfile = async (userId: string, updates: { full_name?: string; avatar_url?: string }) => {
  // Update user metadata instead of profiles table
  try {
    const { data, error } = await supabase.auth.updateUser({
      data: updates
    })
    return { data, error }
  } catch (err: any) {
    console.error('UpdateUserProfile error:', err)
    return { data: null, error: { message: err.message || 'Failed to update user profile.' } }
  }
}

// Helper function that doesn't require profiles table
export const ensureProfilesTable = async () => {
  // Since we're not using profiles table, just return success
  return { error: null, profilesTableExists: false }
}

// Test database connection - Fixed query
export const testDatabaseConnection = async () => {
  try {
    // Use a simple query that doesn't require count(*)
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1)
    
    if (error) {
      console.log('Database connection test failed:', error)
      return { connected: false, error }
    }
    
    console.log('Database connection successful')
    return { connected: true, error: null }
  } catch (err: any) {
    console.log('Database connection test error:', err)
    return { connected: false, error: err }
  }
}