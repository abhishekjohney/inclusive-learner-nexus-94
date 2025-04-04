
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Video, FileText, Mic, Calendar, Captions, Translate, MessageSquare } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);
  
  const goToDashboard = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 z-10 bg-background">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">EduAccess</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-4 sm:gap-6">
            <a href="#features" className="text-sm font-medium underline-offset-4 hover:underline">Features</a>
            <a href="#accessibility" className="text-sm font-medium underline-offset-4 hover:underline">Accessibility</a>
            <a href="#roles" className="text-sm font-medium underline-offset-4 hover:underline">For Students & Teachers</a>
          </nav>
          
          <Button onClick={() => navigate(isLoggedIn ? '/dashboard' : '/login')}>
            {isLoggedIn ? 'Go to Dashboard' : 'Login / Sign Up'}
          </Button>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/30 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Making Education Accessible for Everyone
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    An inclusive learning platform with accessibility tools for students with different abilities. 
                    Connect, learn, and grow together.
                  </p>
                </div>
                
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" onClick={goToDashboard} className="gap-1">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                    Learn More
                  </Button>
                </div>
              </div>
              
              <div className="hidden lg:block">
                <div className="rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
                    alt="Students learning"
                    className="w-full object-cover h-[400px]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <section id="features" className="py-12 md:py-24 bg-white dark:bg-background">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                Comprehensive Learning Tools
              </h2>
              <p className="max-w-[85%] text-muted-foreground sm:text-lg">
                Our platform provides a range of features to enhance teaching and learning experiences
              </p>
            </div>
            
            <div className="mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start justify-center pt-12">
              <div className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-lg transition-all">
                <div className="flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <Video className="h-6 w-6 text-primary" />
                    <h3 className="font-bold">Video Lectures</h3>
                    <p className="text-muted-foreground text-sm">
                      Teachers can upload video lectures that students can access anytime
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-lg transition-all">
                <div className="flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <FileText className="h-6 w-6 text-primary" />
                    <h3 className="font-bold">Study Notes</h3>
                    <p className="text-muted-foreground text-sm">
                      Share digital notes and documents for student reference
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-lg transition-all">
                <div className="flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <Mic className="h-6 w-6 text-primary" />
                    <h3 className="font-bold">Voice Notes</h3>
                    <p className="text-muted-foreground text-sm">
                      Record and share audio explanations of complex topics
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-lg transition-all">
                <div className="flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <Calendar className="h-6 w-6 text-primary" />
                    <h3 className="font-bold">Announcements</h3>
                    <p className="text-muted-foreground text-sm">
                      Share important notices and updates with students
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Accessibility section */}
        <section id="accessibility" className="py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                Accessibility Features
              </h2>
              <p className="max-w-[85%] text-muted-foreground sm:text-lg">
                Designed to support students with different abilities
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 pt-12">
              <div className="rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1582481725274-d63bdf929a90?auto=format&fit=crop&w=800&q=80" 
                  alt="Student using accessibility features"
                  className="w-full object-cover h-[350px]"
                  loading="lazy"
                />
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Captions className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Speech-to-Text</h3>
                  <p className="text-muted-foreground">
                    Real-time captions for lectures and discussions, helping students with hearing impairments
                  </p>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Translate className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Sign Language</h3>
                  <p className="text-muted-foreground">
                    Sign language translation tool for improved communication between deaf and hearing individuals
                  </p>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Direct Communication</h3>
                  <p className="text-muted-foreground">
                    Accessible messaging system between students and teachers with support for different input methods
                  </p>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="text-primary"
                    >
                      <path d="M14 5a2 2 0 0 1 3.995.5h.01a2 2 0 1 1-1.125 3.5H14v1h2.004a2 2 0 1 1 0 4H14v1h1.005a2 2 0 0 1 .005 3.995v.005a2 2 0 1 1-4.01 0H11m-5.6-12a2 2 0 0 0-1.4 3.4l4 4L4.6 20"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Adaptive Learning</h3>
                  <p className="text-muted-foreground">
                    Personalized learning paths adjusted to individual needs and abilities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Roles section */}
        <section id="roles" className="py-12 md:py-24 bg-white dark:bg-background">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                For Students & Teachers
              </h2>
              <p className="max-w-[85%] text-muted-foreground sm:text-lg">
                Specialized features designed for different roles
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 pt-12">
              <div className="rounded-lg border p-8 bg-background">
                <div className="mb-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border">
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="text-primary"
                    >
                      <path d="M12 12.5a23 23 0 0 1 5-1c2 0 3 1.03 3 3.03S19 17 17 17a7.5 7.5 0 0 1-5-2"></path>
                      <path d="M12 12.5a23 23 0 0 0-5-1c-2 0-3 1.03-3 3.03S4 17 6 17a7.5 7.5 0 0 0 5-2"></path>
                      <path d="m8 13 4 2 4-2"></path>
                      <path d="M12 22v-7"></path>
                      <path d="m21 15-3.576-3.576a2 2 0 0 0-2.828 0L12 14.016l-2.596-2.592a2 2 0 0 0-2.828 0L3 15"></path>
                      <path d="M22 9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v12c0 .552.448 1 1 1h18c.552 0 1-.448 1-1z"></path>
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold">For Students</h3>
                <p className="mb-6 text-muted-foreground mt-2">
                  Access learning materials with tools designed to accommodate various learning needs
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Access video lectures, notes, and voice recordings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Use speech-to-text for live captions during lectures</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Communicate with teachers using sign language translation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Save generated captions as lecture notes for review</span>
                  </li>
                </ul>
                <Button onClick={() => navigate('/login')} className="w-full">
                  Student Sign Up
                </Button>
              </div>
              
              <div className="rounded-lg border p-8 bg-background">
                <div className="mb-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border">
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="text-primary"
                    >
                      <path d="M19.2 5H4.8a1 1 0 0 0-.8 1v3.586a1 1 0 0 0 .293.707l7.5 7.5a1 1 0 0 0 1.414 0l7.5-7.5a1 1 0 0 0 .293-.707V6a1 1 0 0 0-.8-1"></path>
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold">For Teachers</h3>
                <p className="mb-6 text-muted-foreground mt-2">
                  Create and share educational content with enhanced accessibility features
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Upload videos, notes, voice recordings, and circulars</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Manage student access to learning materials</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Receive and respond to student messages with accessibility tools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Track student engagement and progress within the platform</span>
                  </li>
                </ul>
                <Button onClick={() => navigate('/login')} className="w-full">
                  Teacher Sign Up
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-12 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold">Ready to transform your learning experience?</h2>
              <p className="max-w-[600px] text-muted">
                Join EduAccess today and experience education that's designed for everyone.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90" 
                onClick={() => navigate('/login')}
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-6 md:py-10">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 text-center">
          <div className="text-xl font-bold">EduAccess</div>
          <p className="text-sm text-muted-foreground">
            © 2025 EduAccess. All rights reserved.
          </p>
          <div className="flex gap-4 text-muted-foreground">
            <a href="#" className="text-sm hover:underline">Privacy Policy</a>
            <a href="#" className="text-sm hover:underline">Terms of Service</a>
            <a href="#" className="text-sm hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
