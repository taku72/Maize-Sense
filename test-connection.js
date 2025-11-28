// Test Supabase connection
// Run with: node test-connection.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ixehrglsjcjzyjwuwjez.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpeGVocmdsc2pjemp5d3V3amV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMTM0OTMsImV4cCI6MjA3OTY4OTQ5M30.10VVdPvBbZM0fB-f_Y30UyccEdqeojaX_8-m29tL5j8';

console.log('Testing Supabase connection...');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    // Test basic connection by trying to access the auth service
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
    } else {
      console.log('✅ Supabase connection successful!');
      console.log('✅ Auth service is accessible');
    }

    // Test if we can access the database
    const { data: dbData, error: dbError } = await supabase
      .from('diseases')
      .select('count')
      .limit(1);

    if (dbError) {
      console.log('⚠️ Database access failed (this is expected if schema not run):', dbError.message);
      console.log('💡 Make sure you ran the SQL schema in Supabase SQL Editor');
    } else {
      console.log('✅ Database connection successful!');
    }

  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
  }
}

testConnection();
