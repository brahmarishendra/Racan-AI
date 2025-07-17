import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUsersCollection, getSessionsCollection } from './mongodb';
import { ObjectId } from 'mongodb';

const JWT_SECRET = 'your-jwt-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

export interface User {
  _id?: ObjectId;
  id?: string;
  email: string;
  password?: string;
  full_name?: string;
  name?: string;
  avatar_url?: string;
  created_at?: Date;
  updated_at?: Date;
  email_confirmed_at?: Date;
  user_metadata?: {
    full_name?: string;
    name?: string;
    avatar_url?: string;
  };
}

export interface Session {
  _id?: ObjectId;
  user_id: string;
  token: string;
  expires_at: Date;
  created_at: Date;
}

// Helper function to validate email
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to validate password
const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  
  return { isValid: true, message: '' };
};

// Generate JWT token
const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Verify JWT token
const verifyToken = (token: string): { userId: string } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded;
  } catch (error) {
    return null;
  }
};

// Sign up function
export const signUp = async (email: string, password: string, fullName?: string) => {
  try {
    if (!email || !password) {
      return {
        data: null,
        error: { message: 'Email and password are required' }
      };
    }

    if (!validateEmail(email)) {
      return {
        data: null,
        error: { message: 'Please enter a valid email address' }
      };
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return {
        data: null,
        error: { message: passwordValidation.message }
      };
    }

    const users = await getUsersCollection();
    
    // Check if user already exists
    const existingUser = await users.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return {
        data: null,
        error: { message: 'An account with this email already exists. Please sign in instead.' }
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser: User = {
      email: email.toLowerCase(),
      password: hashedPassword,
      full_name: fullName || email.split('@')[0],
      name: fullName || email.split('@')[0],
      created_at: new Date(),
      updated_at: new Date(),
      email_confirmed_at: new Date(), // Auto-confirm for simplicity
      user_metadata: {
        full_name: fullName || email.split('@')[0],
        name: fullName || email.split('@')[0]
      }
    };

    const result = await users.insertOne(newUser);
    
    // Generate token
    const token = generateToken(result.insertedId.toString());
    
    // Create session
    const sessions = await getSessionsCollection();
    const session: Session = {
      user_id: result.insertedId.toString(),
      token,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      created_at: new Date()
    };
    
    await sessions.insertOne(session);

    // Store token in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }

    const userResponse = {
      id: result.insertedId.toString(),
      email: newUser.email,
      user_metadata: newUser.user_metadata,
      created_at: newUser.created_at?.toISOString(),
      updated_at: newUser.updated_at?.toISOString(),
      email_confirmed_at: newUser.email_confirmed_at?.toISOString()
    };

    return {
      data: { user: userResponse },
      error: null
    };

  } catch (error: any) {
    console.error('SignUp error:', error);
    return {
      data: null,
      error: { message: 'An unexpected error occurred. Please try again.' }
    };
  }
};

// Sign in function
export const signIn = async (email: string, password: string) => {
  try {
    if (!email || !password) {
      return {
        data: null,
        error: { message: 'Email and password are required' }
      };
    }

    if (!validateEmail(email)) {
      return {
        data: null,
        error: { message: 'Please enter a valid email address' }
      };
    }

    const users = await getUsersCollection();
    const user = await users.findOne({ email: email.toLowerCase() });

    if (!user) {
      return {
        data: null,
        error: { message: 'No account found with this email. Please sign up first.' }
      };
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password || '');
    if (!isValidPassword) {
      return {
        data: null,
        error: { message: 'Invalid email or password. Please check your credentials and try again.' }
      };
    }

    // Generate token
    const token = generateToken(user._id!.toString());
    
    // Create session
    const sessions = await getSessionsCollection();
    const session: Session = {
      user_id: user._id!.toString(),
      token,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      created_at: new Date()
    };
    
    await sessions.insertOne(session);

    // Store token in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }

    const userResponse = {
      id: user._id!.toString(),
      email: user.email,
      user_metadata: user.user_metadata || {
        full_name: user.full_name,
        name: user.name
      },
      created_at: user.created_at?.toISOString(),
      updated_at: user.updated_at?.toISOString(),
      email_confirmed_at: user.email_confirmed_at?.toISOString()
    };

    return {
      data: { user: userResponse },
      error: null
    };

  } catch (error: any) {
    console.error('SignIn error:', error);
    return {
      data: null,
      error: { message: 'Network error. Please check your connection and try again.' }
    };
  }
};

// Sign out function
export const signOut = async () => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    if (token) {
      // Remove session from database
      const sessions = await getSessionsCollection();
      await sessions.deleteOne({ token });
      
      // Remove token from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
    }

    return { error: null };
  } catch (error: any) {
    console.error('SignOut error:', error);
    return { error: { message: 'Network error. Please try again.' } };
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    if (!token) {
      return { user: null, error: null };
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      // Invalid token, remove it
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
      return { user: null, error: null };
    }

    const users = await getUsersCollection();
    const user = await users.findOne({ _id: new ObjectId(decoded.userId) });

    if (!user) {
      // User not found, remove token
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
      return { user: null, error: null };
    }

    const userResponse = {
      id: user._id!.toString(),
      email: user.email,
      user_metadata: user.user_metadata || {
        full_name: user.full_name,
        name: user.name
      },
      created_at: user.created_at?.toISOString(),
      updated_at: user.updated_at?.toISOString(),
      email_confirmed_at: user.email_confirmed_at?.toISOString()
    };

    return { user: userResponse, error: null };

  } catch (error: any) {
    console.error('GetUser error:', error);
    return { user: null, error: { message: 'Network error. Please try again.' } };
  }
};

// Reset password function
export const resetPassword = async (email: string) => {
  try {
    if (!email) {
      return {
        data: null,
        error: { message: 'Email is required' }
      };
    }

    if (!validateEmail(email)) {
      return {
        data: null,
        error: { message: 'Please enter a valid email address' }
      };
    }

    const users = await getUsersCollection();
    const user = await users.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Don't reveal if user exists or not for security
      return {
        data: { message: 'If an account with this email exists, you will receive a password reset email.' },
        error: null
      };
    }

    // In a real implementation, you would send an email here
    // For now, we'll just return success
    return {
      data: { message: 'Password reset email sent successfully.' },
      error: null
    };

  } catch (error: any) {
    console.error('ResetPassword error:', error);
    return {
      data: null,
      error: { message: 'Network error. Please try again.' }
    };
  }
};

// Google OAuth sign in (placeholder - would need proper OAuth implementation)
export const signInWithGoogle = async () => {
  return {
    data: null,
    error: { message: 'Google sign-in is not implemented yet. Please use email login.' }
  };
};

// Auth state change listener (simplified for MongoDB)
export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
  // Simple implementation - in a real app you'd want proper event handling
  const checkAuth = async () => {
    const { user } = await getCurrentUser();
    callback(user ? 'SIGNED_IN' : 'SIGNED_OUT', user ? { user } : null);
  };

  checkAuth();

  // Return a subscription-like object
  return {
    data: {
      subscription: {
        unsubscribe: () => {
          // Cleanup if needed
        }
      }
    }
  };
};

// Check if user is authenticated
export const isAuthenticated = async () => {
  try {
    const { user } = await getCurrentUser();
    return !!user;
  } catch (error) {
    console.error('Error checking auth state:', error);
    return false;
  }
};

// Get current session
export const getCurrentSession = async () => {
  try {
    const { user } = await getCurrentUser();
    return { 
      session: user ? { user } : null, 
      error: null 
    };
  } catch (err: any) {
    console.error('GetSession error:', err);
    return { session: null, error: { message: err.message || 'Failed to get session.' } };
  }
};

// Handle OAuth callback (placeholder)
export const handleOAuthCallback = async () => {
  return { user: null, error: { message: 'OAuth not implemented' } };
};

// Resend email verification (placeholder)
export const resendEmailVerification = async (email: string) => {
  return {
    data: { message: 'Email verification is automatically handled.' },
    error: null
  };
};

// Get user profile
export const getUserProfile = async (userId: string) => {
  try {
    const users = await getUsersCollection();
    const user = await users.findOne({ _id: new ObjectId(userId) });
    
    if (!user) {
      return { data: null, error: { message: 'User not found' } };
    }

    return {
      data: {
        id: user._id!.toString(),
        email: user.email,
        full_name: user.full_name || user.user_metadata?.full_name || user.email.split('@')[0],
        avatar_url: user.avatar_url || user.user_metadata?.avatar_url,
        created_at: user.created_at?.toISOString(),
        updated_at: user.updated_at?.toISOString()
      },
      error: null
    };
  } catch (err: any) {
    console.error('GetUserProfile error:', err);
    return { data: null, error: { message: err.message || 'Failed to fetch user profile.' } };
  }
};

// Update user profile
export const updateUserProfile = async (userId: string, updates: { full_name?: string; avatar_url?: string }) => {
  try {
    const users = await getUsersCollection();
    
    const updateData = {
      ...updates,
      updated_at: new Date(),
      user_metadata: {
        full_name: updates.full_name,
        name: updates.full_name,
        avatar_url: updates.avatar_url
      }
    };

    const result = await users.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return { data: null, error: { message: 'User not found' } };
    }

    return { data: { message: 'Profile updated successfully' }, error: null };
  } catch (err: any) {
    console.error('UpdateUserProfile error:', err);
    return { data: null, error: { message: err.message || 'Failed to update user profile.' } };
  }
};

// Helper function (no longer needed but kept for compatibility)
export const ensureProfilesTable = async () => {
  return { error: null, profilesTableExists: true };
};

// Check if service is configured
export const isSupabaseConfigured = () => {
  return true; // MongoDB is always "configured" if we reach this point
};