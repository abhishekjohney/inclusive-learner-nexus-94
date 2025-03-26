
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Clock, Pause, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SignLanguage = () => {
  const [text, setText] = useState("Welcome to our inclusive learning platform");
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();
  
  const handlePlay = () => {
    if (text.trim() === "") {
      toast({
        title: "No text to interpret",
        description: "Please enter some text before starting",
        variant: "destructive",
      });
      return;
    }
    
    setIsPlaying(!isPlaying);
    
    if (!isPlaying) {
      toast({
        title: "Sign language interpretation started",
        description: "Interpreting text into sign language",
      });
      
      // Simulate stopping after a few seconds
      setTimeout(() => {
        setIsPlaying(false);
        toast({
          title: "Interpretation complete",
          description: "Sign language animation finished",
        });
      }, 10000);
    } else {
      toast({
        title: "Interpretation paused",
        description: "Sign language animation paused",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl">AI Sign Language Interpreter</CardTitle>
          <CardDescription>
            Convert text or speech into sign language animations for deaf and hard-of-hearing students
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Textarea 
                value={text} 
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to convert to sign language..."
                className="min-h-[120px] resize-y"
                aria-label="Text to convert to sign language"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button 
                    onClick={handlePlay} 
                    variant={isPlaying ? "outline" : "default"}
                    className={`${isPlaying ? 'bg-primary/10 hover:bg-primary/20 text-primary' : ''}`}
                    aria-label={isPlaying ? "Pause animation" : "Start animation"}
                  >
                    {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                    {isPlaying ? "Pause" : "Start Animation"}
                  </Button>
                  
                  <Button variant="ghost" size="icon" className="text-muted-foreground" aria-label="Speed control">
                    <Clock className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button variant="outline" size="sm" className="gap-1" aria-label="Save animation">
                  Save <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <div className="bg-muted/30 rounded-lg border border-border/50 flex items-center justify-center p-4 min-h-[200px]">
              {isPlaying ? (
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg 
                      width="48" 
                      height="48" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="text-primary animate-pulse"
                    >
                      <path d="M6 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2"></path>
                      <path d="M6 12H4a2 2 0 1 0 0 4h16a2 2 0 1 0 0-4h-2"></path>
                      <path d="M10 12V4.5a2.5 2.5 0 0 1 5 0V12"></path>
                    </svg>
                  </div>
                  <p className="text-sm text-muted-foreground">Sign language animation playing...</p>
                  <div className="w-full bg-muted/50 h-1 mt-3 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full w-1/3 animate-[progressBar_10s_linear]"></div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-4">
                  <svg 
                    width="64" 
                    height="64" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="mx-auto text-muted-foreground/60"
                  >
                    <path d="M6 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2"></path>
                    <path d="M6 12H4a2 2 0 1 0 0 4h16a2 2 0 1 0 0-4h-2"></path>
                    <path d="M10 12V4.5a2.5 2.5 0 0 1 5 0V12"></path>
                  </svg>
                  <p className="text-muted-foreground mt-4">Enter text and press "Start Animation" to see sign language interpretation</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="features">Key Features</TabsTrigger>
          <TabsTrigger value="how">How It Works</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>
        
        <Card className="glass-card">
          <TabsContent value="features" className="p-6 space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="text-primary"
                    >
                      <path d="M18 8v2a6 6 0 0 1-12 0V8"></path>
                      <path d="M2 8h20"></path>
                      <path d="M12 2v1"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Multiple Sign Languages</h3>
                    <p className="text-sm text-muted-foreground">Support for American (ASL), British (BSL), and other regional sign languages</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="text-primary"
                    >
                      <circle cx="12" cy="12" r="2"></circle>
                      <path d="M12 19c-4.2 0-7-1.6-7-5 0-1 .3-2 1-3l-1-1a4 4 0 0 1 6-6l.5.5a10 10 0 0 1 4.5-.5c3.6.4 6 2.4 6 5 0 2.8-2.2 5-5 5-.8 0-1.5-.2-2-.5"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Natural Gestures</h3>
                    <p className="text-sm text-muted-foreground">Realistic animations capturing the nuances and grammar of sign languages</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="text-primary"
                    >
                      <path d="M12 22a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"></path>
                      <path d="M12 7v6l3 3"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Speed Controls</h3>
                    <p className="text-sm text-muted-foreground">Adjust animation speed for better comprehension and learning</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="text-primary"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                      <path d="M7 7h10v10H7z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Real-time Interpretation</h3>
                    <p className="text-sm text-muted-foreground">Convert live speech or text into sign language during classes or discussions</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="text-primary"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" x2="12" y1="15" y2="3"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Export Capabilities</h3>
                    <p className="text-sm text-muted-foreground">Save animations as videos for sharing or later reference</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="text-primary"
                    >
                      <path d="M19 11V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h7"></path>
                      <path d="m12 12 4 10 1.7-4.3L22 16Z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Educational Content Library</h3>
                    <p className="text-sm text-muted-foreground">Access pre-made sign language videos for common educational concepts</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="how" className="p-6 animate-fade-in">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-primary">1</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">Natural Language Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    The system analyzes the input text, understanding context, meaning, and grammatical structures. This is crucial because sign languages have different grammar than spoken languages.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-primary">2</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">Translation to Sign Language Grammar</h3>
                  <p className="text-sm text-muted-foreground">
                    The AI converts the processed text into the appropriate sign language grammar, which often uses a different sentence structure and relies heavily on facial expressions and body positioning.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-primary">3</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">3D Animation Generation</h3>
                  <p className="text-sm text-muted-foreground">
                    A 3D character model performs the signs with accurate hand shapes, movements, facial expressions, and body language. The animations are rendered in real-time, creating fluid and natural-looking sign language.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-primary">4</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">Continuous Learning</h3>
                  <p className="text-sm text-muted-foreground">
                    The system uses machine learning to continuously improve its translations and animations based on feedback from native sign language users, becoming more accurate and natural over time.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="applications" className="p-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="bg-muted/30 border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Classroom Lectures</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Real-time sign language interpretation of teacher presentations, allowing deaf students to follow along without delay.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/30 border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Digital Textbooks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Interactive textbooks with embedded sign language videos for key concepts and terminology.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/30 border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Group Discussions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Facilitate participation in class discussions by translating peer contributions into sign language.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/30 border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Video Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Add sign language interpretation to educational videos, making multimedia content accessible.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/30 border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Learning Sign Language</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Help students and teachers learn sign language through interactive tutorials and practice exercises.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/30 border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Remote Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Ensure accessibility in virtual classrooms and online educational platforms with integrated sign language.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default SignLanguage;
