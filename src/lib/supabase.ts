// MongoDB-based authentication system
// This file maintains the same interface as the original Supabase file
// but uses MongoDB as the backend instead

export {
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  resetPassword,
  signInWithGoogle,
  onAuthStateChange,
  isAuthenticated,
  getCurrentSession,
  handleOAuthCallback,
  resendEmailVerification,
  getUserProfile,
  updateUserProfile,
  ensureProfilesTable,
  testDatabaseConnection,
  isSupabaseConfigured
} from './auth';

// For backward compatibility, export the MongoDB connection as 'supabase'
import { connectToDatabase } from './mongodb';

export const supabase = {
  auth: {
    signUp,
    signInWithPassword: signIn,
    signOut,
    getUser: getCurrentUser,
    getSession: getCurrentSession,
    onAuthStateChange,
    signInWithOAuth: signInWithGoogle,
    resetPasswordForEmail: resetPassword,
    resend: resendEmailVerification,
    updateUser: updateUserProfile
  },
  from: (table: string) => ({
    select: (columns: string) => ({
      limit: (count: number) => ({
        // This is a placeholder for database queries
        // In a real implementation, you'd query MongoDB here
        then: (callback: any) => callback({ data: [], error: null })
      })
    })
  })
};

// Re-export everything from auth for direct imports
export * from './auth';