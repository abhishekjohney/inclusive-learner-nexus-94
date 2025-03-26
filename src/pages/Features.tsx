
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SpeechToText from '@/components/features/SpeechToText';
import TextToSpeech from '@/components/features/TextToSpeech';
import SignLanguage from '@/components/features/SignLanguage';
import AIAssistant from '@/components/features/AIAssistant';
import AdaptiveLearningSystem from '@/components/features/AdaptiveLearningSystem';

const Features = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-accent/50 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 animate-fade-in">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  AI-Powered Accessibility
                </div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl font-display">
                  Breaking Barriers in Education
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our comprehensive suite of AI-powered tools designed to create an inclusive learning environment for all students.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="speech-to-text" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-3xl grid-cols-5">
                  <TabsTrigger value="speech-to-text">Speech to Text</TabsTrigger>
                  <TabsTrigger value="text-to-speech">Text to Speech</TabsTrigger>
                  <TabsTrigger value="sign-language">Sign Language</TabsTrigger>
                  <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
                  <TabsTrigger value="adaptive-learning">Adaptive Learning</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="speech-to-text" className="animate-fade-in">
                <SpeechToText />
              </TabsContent>
              
              <TabsContent value="text-to-speech" className="animate-fade-in">
                <TextToSpeech />
              </TabsContent>
              
              <TabsContent value="sign-language" className="animate-fade-in">
                <SignLanguage />
              </TabsContent>
              
              <TabsContent value="ai-assistant" className="animate-fade-in">
                <AIAssistant />
              </TabsContent>
              
              <TabsContent value="adaptive-learning" className="animate-fade-in">
                <AdaptiveLearningSystem />
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-display">
                  Additional Platform Features
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Beyond our core accessibility tools, we offer a comprehensive suite of features to enhance the learning experience.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="glass-card card-hover">
                <CardHeader>
                  <CardTitle>Multilingual Support</CardTitle>
                  <CardDescription>
                    AI-driven accessibility tools supporting multiple languages for diverse users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our platform supports over 30 languages, ensuring accessibility for students from diverse linguistic backgrounds. All accessibility features, including speech-to-text, text-to-speech, and sign language interpretation, work seamlessly across supported languages.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card card-hover">
                <CardHeader>
                  <CardTitle>Offline Mode</CardTitle>
                  <CardDescription>
                    Core functionalities available without an internet connection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Students can download lessons, interactive materials, and accessibility tools for offline use, ensuring learning can continue regardless of internet availability. Sync happens automatically when reconnected.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card card-hover">
                <CardHeader>
                  <CardTitle>Voice-Controlled Navigation</CardTitle>
                  <CardDescription>
                    Navigate the platform using voice commands for mobility-impaired students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our advanced voice recognition system allows students to navigate the entire platform, access content, submit assignments, and participate in discussions using only voice commands.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card card-hover">
                <CardHeader>
                  <CardTitle>Collaboration Tools</CardTitle>
                  <CardDescription>
                    Inclusive group work and peer learning features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our inclusive collaboration environment enables students with different abilities to work together seamlessly, with real-time accessibility tools integrated into shared workspaces, discussions, and group projects.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card card-hover">
                <CardHeader>
                  <CardTitle>Progress Analytics</CardTitle>
                  <CardDescription>
                    Detailed insights for students and educators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Comprehensive analytics dashboards provide students, educators, and institutions with detailed insights into learning progress, engagement, strengths, and areas for improvement, all presented in accessible formats.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card card-hover">
                <CardHeader>
                  <CardTitle>Customizable Interface</CardTitle>
                  <CardDescription>
                    Personalize the learning environment to individual needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Students can customize color schemes, contrast, text size, spacing, and layout to create a learning environment that best suits their individual accessibility needs and preferences.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex items-center justify-center mt-12">
              <Button size="lg" className="button-hover">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
