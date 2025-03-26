
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Book, LineChart, ArrowRight, ArrowUpRight, Bell, Calendar as CalendarIcon } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-muted/20">
        <section className="w-full py-8 md:py-12 bg-background border-b border-border/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 border-2 border-primary/10">
                  <AvatarImage src="" alt="Profile" />
                  <AvatarFallback className="bg-primary/10 text-primary">JS</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Welcome back, Jamie!</h1>
                  <p className="text-muted-foreground">Track your progress and continue learning</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-1">
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Notifications</span>
                  <Badge variant="secondary" className="ml-1 bg-primary/10 text-primary">3</Badge>
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Calendar</span>
                </Button>
                <Button size="sm" className="gap-1">
                  <span>Resume Learning</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-6">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Learning Progress</CardTitle>
                  <CardDescription>This week's activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Course Completion</span>
                        <span className="font-medium">68%</span>
                      </div>
                      <Progress value={68} className="h-2" aria-label="Course completion progress" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Weekly Goals</span>
                        <span className="font-medium">5/7 days</span>
                      </div>
                      <Progress value={71} className="h-2" aria-label="Weekly goals progress" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Study Streak</span>
                        <span className="font-medium">12 days</span>
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {[100, 100, 100, 100, 80, 60, 0].map((value, index) => (
                          <div key={index} className="h-8 rounded-md bg-primary/10 relative overflow-hidden">
                            <div 
                              className="absolute bottom-0 left-0 right-0 bg-primary" 
                              style={{ height: `${value}%` }}
                            ></div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Today's Tasks</CardTitle>
                  <CardDescription>Recommended by AI based on your schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-md bg-primary/5 border border-primary/10">
                      <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Book className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Complete Physics Quiz</h3>
                        <p className="text-xs text-muted-foreground">Chapter 4: Waves and Optics</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">Due Today</Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> 20 min
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 rounded-md bg-muted/40">
                      <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Literature Study Session</h3>
                        <p className="text-xs text-muted-foreground">American Poetry Analysis</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">Scheduled</Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> 45 min
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 rounded-md bg-muted/40">
                      <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <LineChart className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Math Practice Problems</h3>
                        <p className="text-xs text-muted-foreground">Calculus: Integration Techniques</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">Recommended</Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> 30 min
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="w-full justify-center gap-1 mt-2">
                      View All Tasks <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Learning Insights</CardTitle>
                  <CardDescription>Personalized analytics and recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-md bg-muted/40 space-y-2">
                      <h3 className="text-sm font-medium">Strengths</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-green-500/10 text-green-600 text-xs">
                          Data Analysis
                        </Badge>
                        <Badge variant="secondary" className="bg-green-500/10 text-green-600 text-xs">
                          Creative Writing
                        </Badge>
                        <Badge variant="secondary" className="bg-green-500/10 text-green-600 text-xs">
                          Historical Context
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-md bg-muted/40 space-y-2">
                      <h3 className="text-sm font-medium">Focus Areas</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 text-xs">
                          Chemical Equations
                        </Badge>
                        <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 text-xs">
                          Geometry Proofs
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-md bg-primary/5 border border-primary/10 space-y-2">
                      <h3 className="text-sm font-medium">AI Recommendations</h3>
                      <p className="text-xs text-muted-foreground">
                        Based on your learning patterns, we recommend:
                      </p>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li className="flex items-center gap-1">
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
                            className="w-3 h-3 text-primary"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Try visual learning aids for chemical equations
                        </li>
                        <li className="flex items-center gap-1">
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
                            className="w-3 h-3 text-primary"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Schedule shorter, more frequent geometry sessions
                        </li>
                        <li className="flex items-center gap-1">
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
                            className="w-3 h-3 text-primary"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Explore the new interactive Physics simulations
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <section className="w-full py-6">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight">Your Courses</h2>
              <Button variant="outline" size="sm" className="gap-1">
                Browse All Courses <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
            
            <Tabs defaultValue="in-progress" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
              </TabsList>
              
              <TabsContent value="in-progress" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Physics: Mechanics & Dynamics",
                      progress: 78,
                      image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=300&q=80",
                      lastActivity: "Yesterday",
                      nextLesson: "Newton's Laws of Motion"
                    },
                    {
                      title: "Advanced Literature Analysis",
                      progress: 42,
                      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80",
                      lastActivity: "3 days ago",
                      nextLesson: "Poetry and Symbolism"
                    },
                    {
                      title: "Calculus Fundamentals",
                      progress: 65,
                      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=300&q=80",
                      lastActivity: "Today",
                      nextLesson: "Integration Techniques"
                    }
                  ].map((course, index) => (
                    <Card key={index} className="glass-card overflow-hidden card-hover">
                      <div className="aspect-video w-full overflow-hidden">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription>
                          <div className="flex justify-between items-center">
                            <span>Progress: {course.progress}%</span>
                            <span className="text-xs">Last activity: {course.lastActivity}</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <Progress value={course.progress} className="h-2 mb-4" aria-label={`${course.title} progress`} />
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-primary/5 text-primary text-xs">
                            Next: {course.nextLesson}
                          </Badge>
                        </div>
                      </CardContent>
                      <div className="px-6 pb-6">
                        <Button className="w-full button-hover">Continue Learning</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="completed" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Intro to Computer Science",
                      completedDate: "May 15, 2023",
                      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=300&q=80",
                      grade: "A",
                      certificate: true
                    },
                    {
                      title: "World History: Ancient Civilizations",
                      completedDate: "March 2, 2023",
                      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=300&q=80",
                      grade: "A-",
                      certificate: true
                    }
                  ].map((course, index) => (
                    <Card key={index} className="glass-card overflow-hidden card-hover">
                      <div className="aspect-video w-full overflow-hidden">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl">{course.title}</CardTitle>
                          <Badge className="bg-green-500 text-white">Completed</Badge>
                        </div>
                        <CardDescription>
                          Completed on {course.completedDate}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Final Grade:</span>
                            <Badge variant="outline" className="bg-primary/5 text-primary">
                              {course.grade}
                            </Badge>
                          </div>
                          {course.certificate && (
                            <Badge variant="outline">Certificate Available</Badge>
                          )}
                        </div>
                      </CardContent>
                      <div className="px-6 pb-6 flex gap-2">
                        <Button variant="outline" className="flex-1">Review</Button>
                        {course.certificate && (
                          <Button className="flex-1">View Certificate</Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="recommended" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Advanced Chemistry",
                      description: "Organic compounds, reactions, and laboratory techniques",
                      image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=300&q=80",
                      match: "95%",
                      accessibility: ["Audio descriptions", "Text-to-speech"]
                    },
                    {
                      title: "Introduction to Psychology",
                      description: "Understanding human behavior and mental processes",
                      image: "https://images.unsplash.com/photo-1606326608690-4e0281b1e588?auto=format&fit=crop&w=300&q=80",
                      match: "87%",
                      accessibility: ["Visual aids", "Sign language videos"]
                    },
                    {
                      title: "Business Economics",
                      description: "Market principles, financial concepts, and economic theories",
                      image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=300&q=80",
                      match: "82%",
                      accessibility: ["Simplified interface", "Voice navigation"]
                    }
                  ].map((course, index) => (
                    <Card key={index} className="glass-card overflow-hidden card-hover">
                      <div className="aspect-video w-full overflow-hidden">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl">{course.title}</CardTitle>
                          <Badge className="bg-primary text-white">
                            {course.match} Match
                          </Badge>
                        </div>
                        <CardDescription>
                          {course.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Accessibility Features:</h4>
                          <div className="flex flex-wrap gap-2">
                            {course.accessibility.map((feature, i) => (
                              <Badge key={i} variant="secondary" className="bg-primary/5 text-primary text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <div className="px-6 pb-6">
                        <Button className="w-full button-hover">Enroll Now</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
