
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accessibility, Book, Calendar, Search, Settings, Speech } from "lucide-react";
import { Link } from 'react-router-dom';

type FeatureCardProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
  className?: string;
};

const FeatureCard = ({ icon: Icon, title, description, link, className }: FeatureCardProps) => (
  <Card className={`glass-card card-hover overflow-hidden ${className}`}>
    <CardHeader className="pb-2">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="text-sm text-muted-foreground">
      <p>Designed with accessibility at its core, ensuring every student has equal learning opportunities.</p>
    </CardContent>
    <CardFooter>
      <Button variant="ghost" asChild className="p-0 h-auto gap-1 text-primary">
        <Link to={link}>
          Learn more
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
            className="w-4 h-4"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

const FeatureHighlights = () => {
  return (
    <section className="w-full py-12 md:py-24 bg-accent/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Key Features
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-display">
              AI-Powered Accessibility Tools
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform combines cutting-edge AI technologies to break down barriers in education.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <FeatureCard
            icon={Speech}
            title="Speech-to-Text AI"
            description="Real-time captions for hearing-impaired students during lectures and discussions."
            link="/features/speech-to-text"
            className="md:translate-y-4"
          />
          <FeatureCard
            icon={Book}
            title="Text-to-Speech AI"
            description="Reads digital textbooks and materials for visually impaired students."
            link="/features/text-to-speech"
            className="lg:translate-y-8"
          />
          <FeatureCard
            icon={Accessibility}
            title="Sign Language Interpreter"
            description="AI-powered sign language animations for deaf students."
            link="/features/sign-language"
            className="md:translate-y-4"
          />
          <FeatureCard
            icon={Search}
            title="Smart AI Assistant"
            description="Voice-recognition chatbot providing 24/7 learning support."
            link="/features/assistant"
            className="lg:translate-y-8"
          />
          <FeatureCard
            icon={Calendar}
            title="Personalized Study Planner"
            description="AI-generated customized learning plans based on individual pace."
            link="/features/study-planner"
            className="md:translate-y-4"
          />
          <FeatureCard
            icon={Settings}
            title="Voice-Controlled Navigation"
            description="Navigate the platform using voice commands for mobility-impaired students."
            link="/features/voice-control"
            className="lg:translate-y-8"
          />
        </div>
        
        <div className="flex items-center justify-center mt-12">
          <Button asChild size="lg" className="button-hover">
            <Link to="/features">Explore All Features</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
