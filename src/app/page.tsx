'use client';

// src/app/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Shield, Zap, Users, Leaf, Camera, Brain, TrendingUp, Star, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold">MaizeAI</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How It Works</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Testimonials</a>
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Sign in
            </Link>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur">
            <div className="container py-4 space-y-4">
              <nav className="flex flex-col space-y-4">
                <a 
                  href="#features" 
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Features
                </a>
                <a 
                  href="#how-it-works" 
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  How It Works
                </a>
                <a 
                  href="#testimonials" 
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Testimonials
                </a>
              </nav>
              <div className="flex flex-col space-y-2 pt-4">
                <Link 
                  href="/login" 
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Sign in
                </Link>
                <Button asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 pt-20 pb-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full border bg-green-100 px-3 py-1 text-sm">
                  <Shield className="mr-2 h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-800">AI-Powered Disease Detection</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Protect Your Maize Crops with
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                    Smart AI Technology
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-[600px]">
                  Detect maize leaf diseases instantly using advanced computer vision. 
                  Get accurate results and treatment recommendations in seconds, not days.
                </p>
              </div>
              
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="/login">
                    <Camera className="mr-2 h-5 w-5" />
                    Start Scanning
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8" asChild>
                  <Link href="#how-it-works">
                    <Brain className="mr-2 h-5 w-5" />
                    Learn More
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>10,000+ Farmers</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  <span>98% Accuracy</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  <span>Instant Results</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl transform rotate-3 opacity-20"></div>
              <Card className="relative overflow-hidden border-0 shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="mx-auto h-20 w-20 rounded-full bg-green-600 flex items-center justify-center">
                      <Camera className="h-10 w-10 text-white" />
                    </div>
                    <p className="text-lg font-semibold">Upload & Scan</p>
                    <p className="text-sm text-muted-foreground">Get instant disease detection</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Authentication Notice */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <Card className="max-w-4xl mx-auto border-green-200 bg-green-50/50">
            <CardContent className="p-8 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Start Your Disease-Free Journey</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of farmers who trust MaizeAI for early disease detection. 
                Create your free account and start protecting your crops today.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row justify-center">
                <Button size="lg" asChild>
                  <Link href="/login">
                    Sign In to Continue
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/signup">Create Free Account</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Powerful Features for Modern Farming
            </h2>
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
              Everything you need to detect, prevent, and manage maize diseases effectively
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Camera className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Smart Scanning</h3>
                <p className="text-muted-foreground">
                  Upload photos from any device. Our AI analyzes leaf patterns, spots, and discoloration to identify diseases with 98% accuracy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">AI-Powered Analysis</h3>
                <p className="text-muted-foreground">
                  Advanced machine learning models trained on thousands of images provide instant, accurate disease identification.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">Treatment Recommendations</h3>
                <p className="text-muted-foreground">
                  Get personalized treatment suggestions based on disease type, severity, and your local growing conditions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold">Disease Library</h3>
                <p className="text-muted-foreground">
                  Comprehensive information about common maize diseases, symptoms, and prevention methods.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold">Scan History</h3>
                <p className="text-muted-foreground">
                  Track all your scans over time, monitor disease patterns, and improve your crop management strategy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold">Instant Results</h3>
                <p className="text-muted-foreground">
                  No more waiting for lab results. Get disease identification and treatment advice in seconds.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How MaizeAI Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
              Three simple steps to protect your maize crops
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold">Upload Leaf Image</h3>
              <p className="text-muted-foreground">
                Take a clear photo of the maize leaf showing symptoms and upload it to our platform
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our advanced AI analyzes the image, identifying disease patterns with 98% accuracy
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold">Get Results</h3>
              <p className="text-muted-foreground">
                Receive instant diagnosis and personalized treatment recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by Farmers Worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
              See what farmers are saying about MaizeAI
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "MaizeAI helped me identify common rust in my field early enough to save 80% of my crop. 
                  The treatment recommendations were spot on!"
                </p>
                <div>
                  <p className="font-semibold">John Mwangi</p>
                  <p className="text-sm text-muted-foreground">Maize Farmer, Kenya</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "The instant diagnosis feature is amazing. No more waiting for agricultural officers. 
                  I can take action immediately."
                </p>
                <div>
                  <p className="font-semibold">Maria Silva</p>
                  <p className="text-sm text-muted-foreground">Small Farm Owner, Brazil</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "The disease library is incredibly helpful. I've learned so much about prevention 
                  and my yields have improved significantly."
                </p>
                <div>
                  <p className="font-semibold">Raj Patel</p>
                  <p className="text-sm text-muted-foreground">Agricultural Consultant, India</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Protect Your Crops?
          </h2>
          <p className="text-xl max-w-[600px] mx-auto opacity-90">
            Join thousands of farmers who are already using MaizeAI to grow healthier, 
            more productive maize crops.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <Link href="/signup">
                Get Started Free
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-green-600" asChild>
              <Link href="/login">
                Sign In
              </Link>
            </Button>
          </div>
          <p className="text-sm opacity-75">
            No credit card required • Free plan available • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Leaf className="h-6 w-6 text-green-600" />
                <span className="text-lg font-bold">MaizeAI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Protecting maize crops worldwide with AI-powered disease detection.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-primary">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-primary">How It Works</a></li>
                <li><a href="#testimonials" className="hover:text-primary">Testimonials</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Privacy</a></li>
                <li><a href="#" className="hover:text-primary">Terms</a></li>
                <li><a href="#" className="hover:text-primary">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024 MaizeAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}