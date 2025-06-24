# Database Setup Instructions

Your Supabase authentication is working, but the `profiles` table needs to be created in your database.

## Quick Setup (Recommended)

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `cedrbmkbynekmvqxyyus`
3. Navigate to **SQL Editor** in the left sidebar
4. Copy and paste the SQL code below into the editor
5. Click **Run** to execute the migration

## SQL Migration Code

```sql
/*
# Setup Authentication Schema and User Profiles

1. New Tables
   - `profiles` table for storing user profile information
   - Linked to Supabase auth.users via foreign key

2. Security
   - Enable RLS on profiles table
   - Add policies for authenticated users to manage their own profiles
   - Add trigger to automatically create profile when user signs up

3. Functions
   - Auto-create profile function triggered on user signup
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1))
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email);
CREATE INDEX IF NOT EXISTS profiles_created_at_idx ON public.profiles(created_at);
```

## After Running the Migration

1. The `profiles` table will be created
2. User signup and login will work properly
3. User profiles will be automatically created when users sign up
4. You can delete this `DATABASE_SETUP.md` file once setup is complete

## Verification

To verify the setup worked:
1. Go to **Table Editor** in your Supabase dashboard
2. You should see a `profiles` table
3. Try signing up with a new account - it should work without errors

## Need Help?

If you encounter any issues:
1. Check the Supabase logs in your dashboard
2. Ensure you're running the SQL in the correct project
3. Make sure you have the necessary permissions in your Supabase project