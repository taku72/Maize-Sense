# How to Fix Supabase Connection Error

## Problem:
The Supabase URL `https://ixehrglsjcjzyjwuwjez.supabase.co` is not accessible (DNS resolution failed).

## Solution Steps:

### 1. Get Your Correct Supabase Details
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to Settings → API
4. Copy the **Project URL** and **anon public** key

### 2. Update Environment Variables
Create or update `.env.local` in your project root:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Restart Your Development Server
```bash
npm run dev
# or
yarn dev
```

### 4. Test the Connection
Run the test script again:
```bash
node test-supabase-connection.js
```

## Common Issues:
- ❌ Wrong project URL (check for typos)
- ❌ Project is paused/deleted in Supabase
- ❌ Network/firewall blocking access
- ❌ Invalid anon key

## What I Fixed:
- ✅ Added retry logic to signup function
- ✅ Added better error messages for network issues
- ✅ Added network connectivity checker component
- ✅ Created connection test script

The main issue is the incorrect Supabase URL. Once you update it with the correct values, signup should work properly.
