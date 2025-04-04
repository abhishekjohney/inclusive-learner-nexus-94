
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain, BookOpen, Award, BarChart3, ChevronRight, Zap, User, Clock, LineChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfileLearningTracks = () => {
  const { toast } = useToast();
  const [selectedLearningStyle, setSelectedLearningStyle] = useState("visual");
  const [selectedDifficulty, setSelectedDifficulty] = useState("intermediate");
  const userRole = localStorage.getItem('userRole') || 'student';
  
  const learningTracks = [
    {
      id: 1,
      title: "Accessibility Fundamentals",
      description: "Learn the basics of digital accessibility and inclusive design",
      progress: 78,
      difficulty: "beginner",
      estimatedTime: "4 weeks",
      completedModules: 7,
      totalModules: 9,
      skills: ["WCAG Guidelines", "Screen Readers", "Keyboard Navigation"]
    },
    {
      id: 2,
      title: "Advanced AI Communication Systems",
      description: "Explore cutting-edge AI techniques for assistive communication technologies",
      progress: 45,
      difficulty: "advanced",
      estimatedTime: "8 weeks",
      completedModules: 3,
      totalModules: 8,
      skills: ["NLP", "Speech Recognition", "Machine Learning Models"] 
    },
    {
      id: 3,
      title: "Inclusive UX Design Patterns",
      description: "Design user experiences that work for everyone regardless of ability",
      progress: 90,
      difficulty: "intermediate",
      estimatedTime: "6 weeks",
      completedModules: 5,
      totalModules: 6,
      skills: ["User Testing", "Accessible Color Theory", "Interaction Design"]
    }
  ];
  
  const handleGeneratePersonalizedTrack = () => {
    toast({
      title: "Generating Personalized Learning Track",
      description: "Our AI is analyzing your learning style and progress to create a customized track."
    });
    
    // Here we would typically make an API call to generate a personalized learning track
    setTimeout(() => {
      toast({
        title: "New Track Created!",
        description: "Your personalized learning track has been created based on your preferences.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {userRole === 'student' && (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <CardTitle>AI-Powered Learning Recommendations</CardTitle>
              </div>
              <CardDescription>
                Personalize your learning experience with our AI-driven recommendation system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Your Learning Profile</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Learning Style Preference</span>
                        <Badge variant="outline">Personalized</Badge>
                      </div>
                      
                      <RadioGroup 
                        value={selectedLearningStyle}
                        onValueChange={setSelectedLearningStyle}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="visual" id="visual" />
                          <Label htmlFor="visual" className="cursor-pointer">Visual</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="auditory" id="auditory" />
                          <Label htmlFor="auditory" className="cursor-pointer">Auditory</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="reading" id="reading" />
                          <Label htmlFor="reading" className="cursor-pointer">Reading/Writing</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="kinesthetic" id="kinesthetic" />
                          <Label htmlFor="kinesthetic" className="cursor-pointer">Kinesthetic</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Preferred Difficulty</span>
                        <Badge variant="outline">Adaptive</Badge>
                      </div>
                      
                      <RadioGroup 
                        value={selectedDifficulty}
                        onValueChange={setSelectedDifficulty}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="beginner" id="beginner" />
                          <Label htmlFor="beginner" className="cursor-pointer">Beginner</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="intermediate" id="intermediate" />
                          <Label htmlFor="intermediate" className="cursor-pointer">Intermediate</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="advanced" id="advanced" />
                          <Label htmlFor="advanced" className="cursor-pointer">Advanced</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Your Learning Analytics</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Content Engagement</span>
                        <span className="font-medium">82%</span>
                      </div>
                      <Progress value={82} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Assessment Performance</span>
                        <span className="font-medium">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Learning Consistency</span>
                        <span className="font-medium">63%</span>
                      </div>
                      <Progress value={63} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="flex flex-col items-center justify-center p-2 bg-muted/40 rounded-md">
                        <Clock className="h-4 w-4 text-primary mb-1" />
                        <p className="text-xs text-muted-foreground">Avg. Study Time</p>
                        <p className="font-medium">42 min/day</p>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center p-2 bg-muted/40 rounded-md">
                        <LineChart className="h-4 w-4 text-primary mb-1" />
                        <p className="text-xs text-muted-foreground">Weekly Growth</p>
                        <p className="font-medium">+12%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleGeneratePersonalizedTrack}>
                <Zap className="h-4 w-4 mr-2" />
                Generate Personalized Track
              </Button>
            </CardFooter>
          </Card>

          <h2 className="text-2xl font-bold mt-8 mb-4">Your Learning Tracks</h2>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningTracks.map(track => (
          <Card key={track.id} className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{track.title}</CardTitle>
                  <CardDescription className="mt-1">{track.description}</CardDescription>
                </div>
                <Badge variant={
                  track.difficulty === "beginner" ? "secondary" : 
                  track.difficulty === "intermediate" ? "outline" : 
                  "destructive"
                }>
                  {track.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{track.progress}%</span>
                  </div>
                  <Progress value={track.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {track.completedModules} of {track.totalModules} modules completed
                  </p>
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  {track.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-primary/10">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Est. {track.estimatedTime}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                {track.progress < 100 ? (
                  <>Continue Learning <ChevronRight className="h-4 w-4 ml-1" /></>
                ) : (
                  <>View Certificate <Award className="h-4 w-4 ml-1" /></>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
        
        {userRole === 'teacher' && (
          <Card className="border-dashed border-2">
            <CardHeader>
              <CardTitle className="text-xl">Create New Learning Track</CardTitle>
              <CardDescription>Design a new learning path for your students</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <p className="text-center text-muted-foreground mb-4">
                Create engaging, accessible content and AI-enhanced learning tracks
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                Create New Track
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
      
      {userRole === 'student' && (
        <Card className="mt-6 bg-muted/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <CardTitle>Skill Development</CardTitle>
            </div>
            <CardDescription>
              Skills you're developing through your current learning tracks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Accessibility Knowledge</span>
                  <span className="font-medium">76%</span>
                </div>
                <Progress value={76} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Technical Implementation</span>
                  <span className="font-medium">62%</span>
                </div>
                <Progress value={62} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Inclusive Design</span>
                  <span className="font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>AI & Machine Learning</span>
                  <span className="font-medium">42%</span>
                </div>
                <Progress value={42} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {userRole === 'teacher' && (
        <Card className="mt-6 bg-muted/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>Student Engagement</CardTitle>
            </div>
            <CardDescription>
              Overview of your students' engagement with your learning tracks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Accessibility Fundamentals</span>
                  <span className="font-medium">83% engagement</span>
                </div>
                <Progress value={83} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Advanced AI Communication Systems</span>
                  <span className="font-medium">71% engagement</span>
                </div>
                <Progress value={71} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Inclusive UX Design Patterns</span>
                  <span className="font-medium">92% engagement</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfileLearningTracks;
