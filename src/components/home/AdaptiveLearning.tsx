
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';

const AdaptiveLearning = () => {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Personalized Education
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-display">
              Adaptive Learning System
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our AI-driven platform adjusts content difficulty based on each student's progress, creating a truly personalized learning experience.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
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
                  className="w-5 h-5 text-primary"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Personalized content difficulty adjustments</span>
              </div>
              <div className="flex items-center gap-2">
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
                  className="w-5 h-5 text-primary"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Customized study schedules based on learning patterns</span>
              </div>
              <div className="flex items-center gap-2">
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
                  className="w-5 h-5 text-primary"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>AI-generated learning pathways for optimal progress</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
              <Button asChild className="button-hover">
                <Link to="/features/adaptive-learning">Learn More</Link>
              </Button>
            </div>
          </div>
          
          <div className="lg:pl-10">
            <Tabs defaultValue="students" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="students">For Students</TabsTrigger>
                <TabsTrigger value="teachers">For Teachers</TabsTrigger>
                <TabsTrigger value="institutes">For Institutes</TabsTrigger>
              </TabsList>
              <div className="relative p-4 rounded-xl glass-panel overflow-hidden space-y-6">
                <TabsContent value="students" className="space-y-4 animate-fade-in">
                  <div className="rounded-lg overflow-hidden border border-border">
                    <img 
                      src="https://images.unsplash.com/photo-1526378787940-576a539ba69d?auto=format&fit=crop&w=800&q=80" 
                      alt="Student using adaptive learning system" 
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Personalized Learning Journey</h3>
                  <p className="text-muted-foreground">
                    The platform adapts to your learning style and pace, presenting concepts in the most effective way for you. Whether you need more visual aids, audio explanations, or tactile learning experiences, the AI customizes your educational journey.
                  </p>
                </TabsContent>
                <TabsContent value="teachers" className="space-y-4 animate-fade-in">
                  <div className="rounded-lg overflow-hidden border border-border">
                    <img 
                      src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80" 
                      alt="Teacher using the platform to monitor student progress" 
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Comprehensive Insights Dashboard</h3>
                  <p className="text-muted-foreground">
                    Teachers gain valuable insights into each student's progress, strengths, and areas needing attention. The platform provides recommendations for teaching approaches tailored to individual student needs, helping you create a truly inclusive classroom.
                  </p>
                </TabsContent>
                <TabsContent value="institutes" className="space-y-4 animate-fade-in">
                  <div className="rounded-lg overflow-hidden border border-border">
                    <img 
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" 
                      alt="Institution implementing the platform" 
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Scalable Inclusive Education</h3>
                  <p className="text-muted-foreground">
                    Educational institutions can easily integrate our platform into existing systems, providing accessibility tools at scale. The system generates detailed analytics on institutional inclusivity metrics and suggested improvements for policy implementation.
                  </p>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdaptiveLearning;
