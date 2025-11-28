'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface AppUser {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'farmer' | 'admin';
  avatar_url?: string;
}

interface Disease {
  id: string;
  name: string;
  scientific_name?: string;
  description?: string;
  risk_level: 'low' | 'medium' | 'high';
  symptoms: string[];
  treatment: string[];
  prevention: string[];
  images?: string[];
}

interface ScanResult {
  id: string;
  user_id: string;
  image_url: string;
  disease?: Disease | null;
  confidence?: number;
  location?: string;
  notes?: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

interface SupabaseContextType {
  user: AppUser | null;
  supabaseUser: SupabaseUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  scanHistory: ScanResult[];
  diseases: Disease[];
  login: (email: string, password: string) => Promise<{ error?: string; success?: boolean }>;
  signup: (email: string, password: string, name: string) => Promise<{ error?: string; success?: boolean }>;
  logout: () => Promise<void>;
  submitScan: (file: File, location?: string, notes?: string) => Promise<ScanResult>;
  updateProfile: (data: Partial<AppUser>) => Promise<{ error?: string; success?: boolean }>;
  requestAdminRole: (reason: string) => Promise<{ error?: string; success?: boolean }>;
  getAdminApprovals: () => Promise<any[]>;
  updateApprovalStatus: (approvalId: string, status: 'approved' | 'rejected') => Promise<{ error?: string; success?: boolean }>;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const SupabaseProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const [diseases, setDiseases] = useState<Disease[]>([]);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setSupabaseUser(session.user);
          await fetchUserProfile(session.user.id);
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: any, session: any) => {
        if (session?.user) {
          setSupabaseUser(session.user);
          await fetchUserProfile(session.user.id);
        } else {
          setUser(null);
          setSupabaseUser(null);
          setIsAuthenticated(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Load diseases
  useEffect(() => {
    loadDiseases();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
        throw error;
      }
      
      if (data) {
        setUser(data);
        setIsAuthenticated(true);
      } else {
        // User profile doesn't exist, create a basic one
        const { data: newProfile, error: createError } = await supabase
          .from('users')
          .insert({
            id: userId,
            email: 'unknown@example.com',
            name: 'User',
            role: 'farmer',
          })
          .select()
          .single();

        if (createError) {
          console.error('Failed to create user profile:', createError);
          // Still set basic user info for authentication
          setUser({
            id: userId,
            email: 'unknown@example.com',
            name: 'User',
            role: 'farmer'
          });
          setIsAuthenticated(true);
        } else {
          setUser(newProfile);
          setIsAuthenticated(true);
        }
      }
      
      await loadScanHistory(userId);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const loadScanHistory = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('scans')
        .select(`
          *,
          disease:diseases(*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setScanHistory(data || []);
    } catch (error) {
      console.error('Failed to load scan history:', error);
    }
  };

  const loadDiseases = async () => {
    try {
      const { data, error } = await supabase
        .from('diseases')
        .select('*')
        .order('risk_level', { ascending: false });

      if (error) throw error;
      setDiseases(data || []);
    } catch (error) {
      console.error('Failed to load diseases:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        await fetchUserProfile(data.user.id);
        return { success: true };
      }

      return { error: 'Login failed' };
    } catch (error: any) {
      return { error: error.message || 'Login failed' };
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      console.log('🔍 Starting signup process...');
      console.log('🌐 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ixehrglsjcjzyjwuwjez.supabase.co');
      
      // Create auth user with retry logic
      let authData, authError;
      let retryCount = 0;
      const maxRetries = 3;
      
      while (retryCount < maxRetries) {
        try {
          const result = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                name: name,
                role: 'farmer'
              }
            }
          });
          
          authData = result.data;
          authError = result.error;
          
          if (!authError) break;
          
          console.log(`🔄 Retry ${retryCount + 1}/${maxRetries}`);
          await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
          retryCount++;
        } catch (fetchError) {
          console.error(`🔥 Fetch error on attempt ${retryCount + 1}:`, fetchError);
          authError = fetchError;
          retryCount++;
          if (retryCount >= maxRetries) break;
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
        }
      }

      console.log('📧 Auth result:', { authData, authError });

      if (authError) {
        console.error('❌ Auth error:', authError);
        // Check if it's a network/fetch error
        if (authError.message?.includes('fetch') || authError.message?.includes('network')) {
          return { error: 'Network connection error. Please check your internet connection and try again.' };
        }
        throw authError;
      }

      if (authData.user) {
        console.log('✅ User created in auth, ID:', authData.user.id);
        
        // Wait a moment for auth to propagate
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Try to create user profile
        try {
          const { data: profileData, error: profileError } = await supabase
            .from('users')
            .insert({
              id: authData.user.id,
              email,
              name,
              role: 'farmer',
            })
            .select()
            .single();

          console.log('👤 Profile result:', { profileData, profileError });

          if (profileError) {
            console.error('❌ Profile creation error:', profileError);
            
            // Try a different approach - update instead of insert
            const { data: updateData, error: updateError } = await supabase
              .from('users')
              .upsert({
                id: authData.user.id,
                email,
                name,
                role: 'farmer',
              })
              .select()
              .single();

            if (updateError) {
              console.error('❌ Profile upsert also failed:', updateError);
              console.log('⚠️ User auth created but profile failed - user can still login');
            } else {
              console.log('✅ Profile created with upsert');
            }
          } else {
            console.log('✅ Profile created successfully');
          }
        } catch (profileErr) {
          console.error('❌ Profile creation failed completely:', profileErr);
        }

        return { success: true };
      }

      return { error: 'Signup failed - no user created' };
    } catch (error: any) {
      console.error('❌ Signup error:', error);
      return { error: error.message || 'Signup failed' };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSupabaseUser(null);
      setIsAuthenticated(false);
      setScanHistory([]);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const submitScan = async (file: File, location?: string, notes?: string): Promise<ScanResult> => {
    try {
      // Upload image to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `scans/${supabaseUser?.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('scan-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('scan-images')
        .getPublicUrl(filePath);

      // Simulate disease detection (replace with actual AI service)
      const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
      const hasDisease = Math.random() > 0.3; // 70% chance of disease

      // Create scan record
      const { data, error } = await supabase
        .from('scans')
        .insert({
          user_id: supabaseUser?.id!,
          image_url: publicUrl,
          disease_id: hasDisease ? randomDisease?.id : null,
          confidence: hasDisease ? 0.7 + Math.random() * 0.3 : 0,
          location: location || null,
          notes: notes || null,
          status: 'completed',
        })
        .select(`
          *,
          disease:diseases(*)
        `)
        .single();

      if (error) throw error;

      // Update scan history
      await loadScanHistory(supabaseUser?.id!);

      return data;
    } catch (error) {
      console.error('Scan submission failed:', error);
      throw error;
    }
  };

  const updateProfile = async (data: Partial<AppUser>) => {
    try {
      const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', user?.id);

      if (error) throw error;

      // Refresh user data
      if (supabaseUser) {
        await fetchUserProfile(supabaseUser.id);
      }

      return { success: true };
    } catch (error: any) {
      return { error: error.message || 'Profile update failed' };
    }
  };

  const requestAdminRole = async (reason: string) => {
    try {
      const { error } = await supabase
        .from('admin_approvals')
        .insert({
          user_id: user?.id!,
          requested_role: 'admin',
          reason,
        });

      if (error) throw error;

      return { success: true };
    } catch (error: any) {
      return { error: error.message || 'Request failed' };
    }
  };

  const getAdminApprovals = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_approvals')
        .select(`
          *,
          user:users(id, email, name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to fetch admin approvals:', error);
      return [];
    }
  };

  const updateApprovalStatus = async (approvalId: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('admin_approvals')
        .update({
          status,
          approved_by: user?.id,
          approved_at: new Date().toISOString(),
        })
        .eq('id', approvalId);

      if (error) throw error;

      // If approved, update user role
      if (status === 'approved') {
        const { data: approval } = await supabase
          .from('admin_approvals')
          .select('user_id')
          .eq('id', approvalId)
          .single();

        if (approval) {
          await supabase
            .from('users')
            .update({ role: 'admin' })
            .eq('id', approval.user_id);
        }
      }

      return { success: true };
    } catch (error: any) {
      return { error: error.message || 'Update failed' };
    }
  };

  const value: SupabaseContextType = {
    user,
    supabaseUser,
    isAuthenticated,
    isLoading,
    scanHistory,
    diseases,
    login,
    signup,
    logout,
    submitScan,
    updateProfile,
    requestAdminRole,
    getAdminApprovals,
    updateApprovalStatus,
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};
