// Debug script to test Supabase connection
// Run this with: node debug-supabase.js

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Testing Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Anon Key exists:', !!supabaseAnonKey);
console.log('Service Key exists:', !!supabaseServiceKey);

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
  console.error('Missing environment variables!');
  process.exit(1);
}

// Test basic connection
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function testConnection() {
  try {
    // Test basic connection
    const { data, error } = await supabase.from('diseases').select('count');
    if (error) {
      console.error('Basic connection failed:', error);
    } else {
      console.log('✅ Basic connection works');
    }

    // Test admin connection
    const { data: adminData, error: adminError } = await supabaseAdmin.from('diseases').select('count');
    if (adminError) {
      console.error('Admin connection failed:', adminError);
    } else {
      console.log('✅ Admin connection works');
    }

    // Test if users table exists
    const { data: usersData, error: usersError } = await supabaseAdmin.from('users').select('count');
    if (usersError) {
      console.error('Users table error:', usersError);
      console.log('⚠️ Make sure you ran the schema in Supabase SQL Editor');
    } else {
      console.log('✅ Users table accessible');
    }

  } catch (err) {
    console.error('Connection test failed:', err);
  }
}

testConnection();
