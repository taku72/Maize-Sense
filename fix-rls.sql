-- Fix RLS policies to allow user registration and data insertion

-- First, disable RLS temporarily to allow initial setup
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE scans DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_approvals DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_approvals ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
DROP POLICY IF EXISTS "Users can view all scans" ON scans;
DROP POLICY IF EXISTS "Users can insert own scans" ON scans;
DROP POLICY IF EXISTS "Users can update own scans" ON scans;

-- Create simpler policies that allow authenticated users to manage their data
CREATE POLICY "Users can manage own profile" ON users
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can manage own scans" ON scans
  FOR ALL USING (auth.uid() = user_id);

-- Allow admins to manage approvals
CREATE POLICY "Admins can manage approvals" ON admin_approvals
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Allow users to view their own approval requests
CREATE POLICY "Users can view own approvals" ON admin_approvals
  FOR SELECT USING (auth.uid() = user_id);

-- Allow users to create approval requests
CREATE POLICY "Users can create approval requests" ON admin_approvals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Test: Allow anyone to view diseases (public data)
ALTER TABLE diseases ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view diseases" ON diseases;
CREATE POLICY "Public can view diseases" ON diseases FOR SELECT USING (true);

-- Grant necessary permissions
GRANT ALL ON users TO authenticated;
GRANT ALL ON scans TO authenticated;
GRANT ALL ON admin_approvals TO authenticated;
GRANT SELECT ON diseases TO authenticated, anon;
