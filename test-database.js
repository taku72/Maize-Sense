// Test database connection and tables
// Run with: node test-database.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ixehrglsjcjzyjwuwjez.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlleGVocmdsc2pjemp5d3V3amV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMTM0OTMsImV4cCI6MjA3OTY4OTQ5M30.10VVdPvBbZM0fB-f_Y30UyccEdqeojaX_8-m29tL5j8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testDatabase() {
  console.log('🔍 Testing database setup...\n');

  try {
    // Test users table
    console.log('📋 Testing users table...');
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (usersError) {
      console.error('❌ Users table error:', usersError.message);
      console.log('💡 Make sure you ran the schema in Supabase SQL Editor');
    } else {
      console.log('✅ Users table accessible');
    }

    // Test diseases table
    console.log('\n📋 Testing diseases table...');
    const { data: diseasesData, error: diseasesError } = await supabase
      .from('diseases')
      .select('count')
      .limit(1);

    if (diseasesError) {
      console.error('❌ Diseases table error:', diseasesError.message);
    } else {
      console.log('✅ Diseases table accessible');
    }

    // Test scans table
    console.log('\n📋 Testing scans table...');
    const { data: scansData, error: scansError } = await supabase
      .from('scans')
      .select('count')
      .limit(1);

    if (scansError) {
      console.error('❌ Scans table error:', scansError.message);
    } else {
      console.log('✅ Scans table accessible');
    }

    // Test RLS policies by trying to insert a test user
    console.log('\n🔒 Testing RLS policies...');
    const testUserId = '00000000-0000-0000-0000-000000000000';
    const { data: insertData, error: insertError } = await supabase
      .from('users')
      .insert({
        id: testUserId,
        email: 'test@example.com',
        name: 'Test User',
        role: 'farmer'
      })
      .select();

    if (insertError) {
      console.error('❌ Insert test failed:', insertError.message);
      console.log('💡 RLS policies might be blocking inserts');
      
      // Clean up test data
      await supabase.from('users').delete().eq('id', testUserId);
    } else {
      console.log('✅ Insert test passed - RLS policies allow inserts');
      
      // Clean up test data
      await supabase.from('users').delete().eq('id', testUserId);
    }

  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
  }
}

testDatabase();
