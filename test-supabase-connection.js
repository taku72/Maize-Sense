// Test Supabase connection and signup
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ixehrglsjcjzyjwuwjez.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlleGVocmdsc2pqemp5d3V3amV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMTM0OTMsImV4cCI6MjA3OTY4OTQ5M30.10VVdPvBbZM0fB-f_Y30UyccEdqeojaX_8-m29tL5j8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('🔍 Testing Supabase connection...');
  
  try {
    // Test basic connection
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    console.log('✅ Basic connection successful');
    
    // Test signup with a random email
    const testEmail = `test${Date.now()}@example.com`;
    const testPassword = 'TestPassword123!';
    
    console.log('📧 Testing signup...');
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          name: 'Test User',
          role: 'farmer'
        }
      }
    });
    
    if (signUpError) {
      console.error('❌ Signup failed:', signUpError.message);
    } else {
      console.log('✅ Signup successful');
      console.log('User ID:', signUpData.user?.id);
    }
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection();
