'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function NetworkCheck() {
  const [isOnline, setIsOnline] = useState(true);
  const [supabaseConnection, setSupabaseConnection] = useState<'checking' | 'connected' | 'failed'>('checking');

  useEffect(() => {
    const checkOnline = () => setIsOnline(navigator.onLine);
    const checkSupabase = async () => {
      try {
        const { error } = await supabase.auth.getSession();
        setSupabaseConnection(error ? 'failed' : 'connected');
      } catch {
        setSupabaseConnection('failed');
      }
    };

    checkOnline();
    checkSupabase();

    window.addEventListener('online', checkOnline);
    window.addEventListener('offline', checkOnline);

    return () => {
      window.removeEventListener('online', checkOnline);
      window.removeEventListener('offline', checkOnline);
    };
  }, []);

  if (isOnline && supabaseConnection === 'connected') return null;

  return (
    <div className="fixed top-4 right-4 max-w-sm p-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-lg z-50">
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-sm font-medium">
          {!isOnline ? 'Offline' : supabaseConnection === 'failed' ? 'Supabase Connection Failed' : 'Checking...'}
        </span>
      </div>
      {!isOnline && (
        <p className="text-xs text-gray-600 mt-1">
          Please check your internet connection
        </p>
      )}
      {isOnline && supabaseConnection === 'failed' && (
        <p className="text-xs text-gray-600 mt-1">
          Unable to connect to authentication service. Try refreshing the page.
        </p>
      )}
    </div>
  );
}
