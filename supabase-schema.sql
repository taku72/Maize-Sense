-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'farmer', 'admin')),
  avatar_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Diseases table
CREATE TABLE diseases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  scientific_name VARCHAR(255),
  description TEXT,
  risk_level VARCHAR(20) CHECK (risk_level IN ('low', 'medium', 'high')),
  symptoms TEXT[],
  treatment TEXT[],
  prevention TEXT[],
  images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scans table
CREATE TABLE scans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  disease_id UUID REFERENCES diseases(id) ON DELETE SET NULL,
  confidence DECIMAL(3,2) CHECK (confidence >= 0 AND confidence <= 1),
  location VARCHAR(255),
  notes TEXT,
  status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin approvals table
CREATE TABLE admin_approvals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  requested_role VARCHAR(50) NOT NULL,
  reason TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample diseases
INSERT INTO diseases (name, scientific_name, description, risk_level, symptoms, treatment, prevention) VALUES
(
  'Northern Leaf Blight',
  'Exserohilum turcicum',
  'A fungal disease that causes long, elliptical, gray-green or tan lesions on leaves.',
  'high',
  ARRAY['Elliptical, gray-green lesions on leaves', 'Lesions turn tan or brown with age', 'Lesions may have dark borders', 'Severe infections can cause complete leaf death'],
  ARRAY['Apply fungicides containing strobilurin or triazole', 'Remove and destroy infected plant debris', 'Rotate crops to non-host plants'],
  ARRAY['Plant resistant varieties', 'Practice crop rotation', 'Ensure proper plant spacing for air circulation', 'Avoid overhead irrigation']
),
(
  'Gray Leaf Spot',
  'Cercospora zeae-maydis',
  'A fungal disease that causes rectangular, yellow to tan lesions on leaves.',
  'medium',
  ARRAY['Small, yellow to tan spots on leaves', 'Spots develop into rectangular lesions', 'Lesions may have a yellow halo', 'Severe infections can cause premature death of leaves'],
  ARRAY['Apply foliar fungicides', 'Remove and destroy infected crop residue'],
  ARRAY['Use resistant hybrids', 'Practice crop rotation', 'Avoid excessive nitrogen fertilization', 'Use proper plant spacing']
),
(
  'Common Rust',
  'Puccinia sorghi',
  'A fungal disease characterized by small, circular to elongate pustules on leaves.',
  'low',
  ARRAY['Small, circular to elongate pustules', 'Pustules are reddish-brown to dark brown', 'May appear on both leaf surfaces', 'Severe infections can cause leaf yellowing and death'],
  ARRAY['Apply fungicides if necessary', 'Remove volunteer corn plants'],
  ARRAY['Plant resistant hybrids', 'Avoid late planting', 'Maintain proper plant nutrition']
);

-- Create indexes for better performance
CREATE INDEX idx_scans_user_id ON scans(user_id);
CREATE INDEX idx_scans_created_at ON scans(created_at DESC);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_admin_approvals_status ON admin_approvals(status);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_approvals ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Users can view all scans (for demo purposes, adjust as needed)
CREATE POLICY "Users can view all scans" ON scans
  FOR SELECT USING (true);

-- Users can insert their own scans
CREATE POLICY "Users can insert own scans" ON scans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own scans
CREATE POLICY "Users can update own scans" ON scans
  FOR UPDATE USING (auth.uid() = user_id);

-- Admins can view all approvals
CREATE POLICY "Admins can view all approvals" ON admin_approvals
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Users can view their own approval requests
CREATE POLICY "Users can view own approvals" ON admin_approvals
  FOR SELECT USING (auth.uid() = user_id);

-- Users can create approval requests
CREATE POLICY "Users can create approval requests" ON admin_approvals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can update approval requests
CREATE POLICY "Admins can update approvals" ON admin_approvals
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
