// Mock user data
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'farmer' | 'user';
}

// Demo accounts
const demoUsers: User[] = [
  {
    id: 'demo1',
    email: 'admin@demo.com',
    name: 'Demo Admin',
    avatar: 'https://i.pravatar.cc/150?u=admin@demo.com',
    role: 'admin'
  },
  {
    id: 'demo2',
    email: 'farmer@demo.com',
    name: 'Demo Farmer',
    avatar: 'https://i.pravatar.cc/150?u=farmer@demo.com',
    role: 'farmer'
  },
  {
    id: 'demo3',
    email: 'user@demo.com',
    name: 'Demo User',
    avatar: 'https://i.pravatar.cc/150?u=user@demo.com',
    role: 'user'
  }
];

// Mock authentication state
let currentUser: User | null = null;

// Mock auth functions
export const mockAuth = {
  // Sign in with email and password (demo mode - accepts any credentials)
  async signInWithEmail(email: string, password: string) {
    // Find user by email or default to first demo user
    currentUser = demoUsers.find(u => u.email === email) || demoUsers[0];
    return {
      data: { user: currentUser },
      error: null
    };
  },

  // Get current user
  async getCurrentUser() {
    return {
      user: currentUser
    };
  },

  // Sign out
  async signOut() {
    currentUser = null;
    return { error: null };
  },

  // Sign up (not functional in demo)
  async signUpWithEmail(email: string, password: string, userData: any) {
    // In demo mode, just sign in with demo account
    return this.signInWithEmail(email, password);
  },

  // Get all demo users (for demo purposes)
  getDemoUsers() {
    return demoUsers;
  },

  // Switch user (demo only)
  switchUser(email: string) {
    const user = demoUsers.find(u => u.email === email);
    if (user) {
      currentUser = user;
      return { error: null };
    }
    return { error: { message: 'User not found' } };
  }
};

export default mockAuth;
