
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="w-full py-12 md:py-24 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
      <div className="absolute top-0 left-0 -z-10 overflow-hidden w-[40%] h-[40%] opacity-30">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-3xl"></div>
      </div>
      
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center text-center space-y-4 p-4">
          <div className="space-y-2 max-w-[800px]">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-display">
              Join the Inclusive Education Revolution
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed">
              Experience a learning environment where barriers are eliminated and every student has equal opportunities to succeed.
            </p>
          </div>
          
          <div className="w-full max-w-md space-y-2 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Button asChild size="lg" className="w-full button-hover">
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full button-hover">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              No credit card required. Start with our free plan today.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="glass-panel p-6 rounded-xl space-y-3 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
                <path d="M17 6.1H3"></path>
                <path d="M21 12.1H3"></path>
                <path d="M15.1 18H3"></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium">For Students</h3>
            <p className="text-sm text-muted-foreground">Access personalized learning materials that adapt to your needs and learning style.</p>
          </div>
          
          <div className="glass-panel p-6 rounded-xl space-y-3 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
                <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-2"></path>
                <path d="M12 19v-9"></path>
                <path d="m9 16 3 3 3-3"></path>
                <path d="M22 12H12"></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium">For Educators</h3>
            <p className="text-sm text-muted-foreground">Create inclusive classrooms with tools designed to support all students, regardless of abilities.</p>
          </div>
          
          <div className="glass-panel p-6 rounded-xl space-y-3 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M7 7h.01"></path>
                <path d="M11 7h.01"></path>
                <path d="M7 11h.01"></path>
                <path d="M11 11h.01"></path>
                <path d="M7 15h.01"></path>
                <path d="M11 15h.01"></path>
                <path d="m15 11-.01.01"></path>
                <path d="M15 15h.01"></path>
                <path d="M15 7h.01"></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium">For Institutions</h3>
            <p className="text-sm text-muted-foreground">Implement comprehensive accessibility solutions at scale with detailed analytics and insights.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
