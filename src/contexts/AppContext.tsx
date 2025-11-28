'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockAuth } from '@/lib/mock/auth';
import { mockDiseaseAPI, ScanResult } from '@/lib/mock/diseaseData';

interface AppContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  scanHistory: ScanResult[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  submitScan: (file: File) => Promise<ScanResult>;
  switchUser: (email: string) => void;
  getDemoUsers: () => any[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { user } = await mockAuth.getCurrentUser();
        if (user) {
          setUser(user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const loadScanHistory = async () => {
      try {
        const history = await mockDiseaseAPI.getScanHistory();
        setScanHistory(history);
      } catch (error) {
        console.error('Failed to load scan history:', error);
      }
    };

    checkAuth();
    loadScanHistory();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await mockAuth.signInWithEmail(email, password);
      if (error) throw error;
      
      setUser(data.user);
      setIsAuthenticated(true);
      
      // Load user's scan history
      const history = await mockDiseaseAPI.getScanHistory();
      setScanHistory(history);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await mockAuth.signOut();
      setUser(null);
      setIsAuthenticated(false);
      setScanHistory([]);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const submitScan = async (file: File) => {
    try {
      const result = await mockDiseaseAPI.submitScan(file);
      setScanHistory(prev => [result, ...prev]);
      return result;
    } catch (error) {
      console.error('Scan submission failed:', error);
      throw error;
    }
  };

  const switchUser = (email: string) => {
    mockAuth.switchUser(email);
    setUser(mockAuth.getDemoUsers().find(u => u.email === email) || null);
  };

  const getDemoUsers = () => {
    return mockAuth.getDemoUsers();
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        scanHistory,
        login,
        logout,
        submitScan,
        switchUser,
        getDemoUsers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
