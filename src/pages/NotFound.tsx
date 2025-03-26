
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="relative">
              <div className="text-9xl font-bold text-primary/10">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-4xl font-bold tracking-tight font-display">Page Not Found</h1>
              </div>
            </div>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
              Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="button-hover">
                <Link to="/">Return to Home</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="button-hover">
                <Link to="/courses">Explore Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
