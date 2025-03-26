
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute inset-0 -z-10 noise-bg"></div>
      <div className="absolute top-0 right-0 -z-10 overflow-hidden w-[40%] h-[40%] opacity-30">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 -z-10 overflow-hidden w-[40%] h-[40%] opacity-30">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-primary/20 to-primary/5 blur-3xl"></div>
      </div>
      
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Accessible Education for All
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl font-display">
                <span className="reveal-text">Breaking Barriers in Education</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our AI-powered platform creates an inclusive learning environment for specially-abled students, ensuring equal educational opportunities through adaptive technologies.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="button-hover">
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="button-hover">
                <Link to="/features">Explore Features</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
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
                <span>Speech-to-Text</span>
              </div>
              <div className="flex items-center gap-1">
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
                <span>Text-to-Speech</span>
              </div>
              <div className="flex items-center gap-1">
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
                <span>Sign Language AI</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-full h-full absolute -z-10 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl blur-xl transform -rotate-3"></div>
              <div className="glass-card rounded-2xl shadow-lg overflow-hidden border border-border/50 animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80" 
                  alt="Students learning with technology" 
                  className="w-full h-64 object-cover" 
                  loading="lazy"
                />
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold tracking-tight">AI-Powered Adaptive Learning</h3>
                  <p className="text-sm/relaxed text-muted-foreground">
                    Our system personalizes content difficulty and pace based on individual learning patterns, ensuring every student succeeds at their own pace.
                  </p>
                  <div className="pt-4 flex items-center justify-between">
                    <div className="text-sm font-medium">Start your journey today</div>
                    <Button variant="outline" size="sm" className="rounded-full">
                      Learn more
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
