
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, ArrowRight, Book, UserCheck, LineChart, PieChart } from "lucide-react";
import { ScrollArea } from '@/components/ui/scroll-area';

const AdaptiveLearningSystem = () => {
  const [selectedSubject, setSelectedSubject] = useState("math");
  
  return (
    <div className="space-y-6">
      <Card className="glass-card overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl">AI-driven Adaptive Learning</CardTitle>
          <CardDescription>
            Personalized learning experiences that adjust to individual student needs and progress
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-muted/30 border-border/50 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md col-span-1">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Book className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Personalized Content</CardTitle>
                <CardDescription>Content adapts to your learning pace and style</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Difficulty Level</span>
                      <span className="font-medium">Intermediate</span>
                    </div>
                    <Progress value={65} className="h-2" aria-label="Difficulty level progress" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Learning Style Match</span>
                      <span className="font-medium">Visual (87%)</span>
                    </div>
                    <Progress value={87} className="h-2" aria-label="Learning style match progress" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Content Mastery</span>
                      <span className="font-medium">73%</span>
                    </div>
                    <Progress value={73} className="h-2" aria-label="Content mastery progress" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/30 border-border/50 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md col-span-1">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Study Planner</CardTitle>
                <CardDescription>AI-generated study schedules based on your patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Today's Focus</h4>
                      <p className="text-xs text-muted-foreground">Based on your learning patterns</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1 text-xs">
                      View All <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 p-2 rounded-md bg-background/80">
                      <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Cell Biology (30 min)</h3>
                        <p className="text-xs text-muted-foreground">Recommended: 3:00 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-2 rounded-md bg-background/80">
                      <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Book className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Algebra Practice (45 min)</h3>
                        <p className="text-xs text-muted-foreground">Recommended: 5:00 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-2 rounded-md bg-background/80">
                      <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <UserCheck className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">History Quiz Review (20 min)</h3>
                        <p className="text-xs text-muted-foreground">Recommended: 7:30 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/30 border-border/50 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md col-span-1">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <LineChart className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Progress Insights</CardTitle>
                <CardDescription>Track growth and identify improvement areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Performance by Subject</h4>
                    <div className="flex items-center space-x-1">
                      <TabsList className="h-7 p-1">
                        <TabsTrigger 
                          value="math" 
                          className="text-xs h-5 px-2"
                          onClick={() => setSelectedSubject("math")}
                          data-state={selectedSubject === "math" ? "active" : ""}
                        >
                          Math
                        </TabsTrigger>
                        <TabsTrigger 
                          value="science" 
                          className="text-xs h-5 px-2"
                          onClick={() => setSelectedSubject("science")}
                          data-state={selectedSubject === "science" ? "active" : ""}
                        >
                          Science
                        </TabsTrigger>
                        <TabsTrigger 
                          value="english" 
                          className="text-xs h-5 px-2"
                          onClick={() => setSelectedSubject("english")}
                          data-state={selectedSubject === "english" ? "active" : ""}
                        >
                          English
                        </TabsTrigger>
                      </TabsList>
                    </div>
                  </div>
                  
                  {selectedSubject === "math" && (
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Algebra</span>
                          <span className="font-medium">92%</span>
                        </div>
                        <Progress value={92} className="h-1.5" aria-label="Algebra progress" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Geometry</span>
                          <span className="font-medium">78%</span>
                        </div>
                        <Progress value={78} className="h-1.5" aria-label="Geometry progress" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Statistics</span>
                          <span className="font-medium">65%</span>
                        </div>
                        <Progress value={65} className="h-1.5" aria-label="Statistics progress" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Calculus</span>
                          <span className="font-medium">45%</span>
                        </div>
                        <Progress value={45} className="h-1.5" aria-label="Calculus progress" />
                      </div>
                    </div>
                  )}
                  
                  {selectedSubject === "science" && (
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Biology</span>
                          <span className="font-medium">85%</span>
                        </div>
                        <Progress value={85} className="h-1.5" aria-label="Biology progress" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Chemistry</span>
                          <span className="font-medium">72%</span>
                        </div>
                        <Progress value={72} className="h-1.5" aria-label="Chemistry progress" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Physics</span>
                          <span className="font-medium">68%</span>
                        </div>
                        <Progress value={68} className="h-1.5" aria-label="Physics progress" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Earth Science</span>
                          <span className="font-medium">91%</span>
                        </div>
                        <Progress value={91} className="h-1.5" aria-label="Earth Science progress" />
                      </div>
                    </div>
                  )}
                  
                  {selectedSubject === "english" && (
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Reading Comprehension</span>
                          <span className="font-medium">88%</span>
                        </div>
                        <Progress value={88} className="h-1.5" aria-label="Reading Comprehension progress" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Writing</span>
                          <span className="font-medium">76%</span>
                        </div>
                        <Progress value={76} className="h-1.5" aria-label="Writing progress" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Grammar</span>
                          <span className="font-medium">94%</span>
                        </div>
                        <Progress value={94} className="h-1.5" aria-label="Grammar progress" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Literature Analysis</span>
                          <span className="font-medium">82%</span>
                        </div>
                        <Progress value={82} className="h-1.5" aria-label="Literature Analysis progress" />
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground">
                      Suggested focus: {selectedSubject === "math" ? "Calculus" : selectedSubject === "science" ? "Physics" : "Writing"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="personalization" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="personalization">Learning Personalization</TabsTrigger>
          <TabsTrigger value="ai">AI Algorithms</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
        </TabsList>
        
        <Card className="glass-card">
          <TabsContent value="personalization" className="p-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">How Our System Adapts to You</h3>
                <p className="text-muted-foreground">
                  Our AI-powered adaptive learning system continuously analyzes your performance, preferences, and learning patterns to create a truly personalized educational experience.
                </p>
                
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-primary">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Initial Assessment</h4>
                      <p className="text-sm text-muted-foreground">The system begins by evaluating your current knowledge, identifying strengths and areas for improvement.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-primary">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Learning Style Detection</h4>
                      <p className="text-sm text-muted-foreground">Through ongoing interactions, the AI identifies your optimal learning style—whether visual, auditory, reading/writing, or kinesthetic.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-primary">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Dynamic Content Adjustment</h4>
                      <p className="text-sm text-muted-foreground">Content difficulty, complexity, and presentation style automatically adjust based on your performance and feedback.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-primary">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Progress Monitoring</h4>
                      <p className="text-sm text-muted-foreground">The system continuously tracks your progress, identifying concepts that need reinforcement before moving forward.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden border border-border">
                <img 
                  src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80" 
                  alt="Student using adaptive learning system" 
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-4 space-y-3 bg-background/60 backdrop-blur-sm">
                  <h4 className="font-medium">Personalization in Action</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Content Format Preference</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Visual</span>
                        <span className="text-xs bg-muted px-2 py-0.5 rounded-full">Audio</span>
                        <span className="text-xs bg-muted px-2 py-0.5 rounded-full">Text</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Optimal Study Time</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Evenings (6-9pm)</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pace Preference</span>
                      <div className="flex items-center gap-0.5">
                        <div className="w-6 h-1.5 rounded-full bg-primary"></div>
                        <div className="w-6 h-1.5 rounded-full bg-primary"></div>
                        <div className="w-6 h-1.5 rounded-full bg-primary/60"></div>
                        <div className="w-6 h-1.5 rounded-full bg-muted"></div>
                        <div className="w-6 h-1.5 rounded-full bg-muted"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ai" className="p-6 animate-fade-in">
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">The AI Behind Personalized Learning</h3>
                  <p className="text-muted-foreground mb-4">
                    Our platform uses sophisticated machine learning algorithms to create truly personalized learning experiences that evolve with each student.
                  </p>
                  
                  <Card className="bg-muted/30 border-border/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Core AI Technologies</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-2">
                        <PieChart className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-sm font-medium">Natural Language Processing</h4>
                          <p className="text-xs text-muted-foreground">Understands student responses and generates personalized feedback</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <LineChart className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-sm font-medium">Predictive Analytics</h4>
                          <p className="text-xs text-muted-foreground">Forecasts learning outcomes and identifies potential challenges</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <svg 
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="text-primary mt-0.5 flex-shrink-0"
                        >
                          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                        </svg>
                        <div>
                          <h4 className="text-sm font-medium">Reinforcement Learning</h4>
                          <p className="text-xs text-muted-foreground">Optimizes learning paths based on student interactions and outcomes</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold mb-2">How Our Algorithms Work</h3>
                  
                  <ScrollArea className="h-[300px] rounded-md border p-4">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium">Data Collection</h4>
                        <p className="text-sm text-muted-foreground">
                          The system collects data on multiple dimensions of your learning experience:
                        </p>
                        <ul className="space-y-1 text-sm pl-5 list-disc text-muted-foreground">
                          <li>Time spent on different types of content</li>
                          <li>Accuracy rates on assessments</li>
                          <li>Engagement patterns with different media formats</li>
                          <li>Response times to questions</li>
                          <li>Navigation behavior within the platform</li>
                          <li>Self-reported preferences and feedback</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium">Pattern Recognition</h4>
                        <p className="text-sm text-muted-foreground">
                          Machine learning algorithms identify patterns in your learning data:
                        </p>
                        <ul className="space-y-1 text-sm pl-5 list-disc text-muted-foreground">
                          <li>Concept connections and knowledge gaps</li>
                          <li>Optimal times of day for different types of learning</li>
                          <li>Formats that lead to best knowledge retention</li>
                          <li>Learning pace for different subject areas</li>
                          <li>Misconceptions and error patterns</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium">Adaptive Content Delivery</h4>
                        <p className="text-sm text-muted-foreground">
                          Based on the recognized patterns, the AI makes real-time decisions:
                        </p>
                        <ul className="space-y-1 text-sm pl-5 list-disc text-muted-foreground">
                          <li>Selecting optimal content difficulty</li>
                          <li>Determining when to review concepts</li>
                          <li>Choosing the most effective presentation format</li>
                          <li>Generating personalized examples</li>
                          <li>Creating custom practice activities</li>
                          <li>Suggesting optimal study schedules</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium">Continuous Improvement</h4>
                        <p className="text-sm text-muted-foreground">
                          The system continuously refines its understanding:
                        </p>
                        <ul className="space-y-1 text-sm pl-5 list-disc text-muted-foreground">
                          <li>Updating student models with each interaction</li>
                          <li>Testing new approaches and measuring outcomes</li>
                          <li>Incorporating feedback from explicit user ratings</li>
                          <li>Comparing performance against expected outcomes</li>
                          <li>Optimizing recommendations based on success metrics</li>
                        </ul>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="benefits" className="p-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-muted/30 border-border/50 col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">For Students</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
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
                    <span>Personalized learning pace</span>
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
                    <span>Content matched to abilities</span>
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
                    <span>Reduced frustration</span>
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
                    <span>Targeted reinforcement</span>
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
                    <span>Greater engagement</span>
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
                    <span>Optimized study time</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/30 border-border/50 col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">For Educators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
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
                    <span>Detailed student insights</span>
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
                    <span>Early intervention alerts</span>
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
                    <span>Automated differentiation</span>
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
                    <span>Time-saving automation</span>
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
                    <span>Progress monitoring</span>
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
                    <span>Teaching recommendations</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/30 border-border/50 col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">For Institutions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
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
                    <span>Higher success rates</span>
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
                    <span>Comprehensive analytics</span>
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
                    <span>Improved retention</span>
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
                    <span>Scalable accessibility</span>
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
                    <span>Equity in education</span>
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
                    <span>Data-driven improvements</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/30 border-border/50 md:col-span-3">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Research-Backed Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-primary">87%</div>
                      <p className="text-sm text-muted-foreground">
                        of students using our adaptive learning system show significant improvement in comprehension and retention compared to traditional learning methods.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-primary">42%</div>
                      <p className="text-sm text-muted-foreground">
                        reduction in time required to achieve mastery of new concepts when using personalized learning paths compared to standardized approaches.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-primary">94%</div>
                      <p className="text-sm text-muted-foreground">
                        of educators report that the AI-generated insights help them provide more effective and targeted support to students with diverse learning needs.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default AdaptiveLearningSystem;
