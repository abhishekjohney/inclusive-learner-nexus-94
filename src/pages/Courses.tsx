
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Book, Search, Filter, ArrowUpRight, Clock, User, Calendar } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Introduction to Mathematics",
    description: "Foundational concepts in algebra, geometry, and arithmetic with accessible learning tools.",
    difficulty: "Beginner",
    duration: "8 weeks",
    students: 1240,
    category: "mathematics",
    accessibility: ["Visual aids", "Audio guides", "Sign language videos"]
  },
  {
    id: 2,
    title: "Advanced Physics Concepts",
    description: "Explore mechanics, thermodynamics, and electromagnetism with interactive simulations.",
    difficulty: "Advanced",
    duration: "12 weeks",
    students: 890,
    category: "science",
    accessibility: ["Interactive models", "Video captions", "Voice navigation"]
  },
  {
    id: 3,
    title: "World Literature & Composition",
    description: "Analyze classic and contemporary literature from around the world with adaptive reading tools.",
    difficulty: "Intermediate",
    duration: "10 weeks",
    students: 1450,
    category: "humanities",
    accessibility: ["Text-to-speech", "Adjustable text display", "Audio books"]
  },
  {
    id: 4,
    title: "Computer Science Fundamentals",
    description: "Learn programming basics, algorithms, and problem-solving with accessible coding environments.",
    difficulty: "Beginner",
    duration: "8 weeks",
    students: 2100,
    category: "computer-science",
    accessibility: ["Screen reader compatible", "Color contrast options", "Keyboard navigation"]
  },
  {
    id: 5,
    title: "Environmental Biology",
    description: "Study ecosystems, biodiversity, and conservation with virtual field trips and adaptive content.",
    difficulty: "Intermediate",
    duration: "10 weeks",
    students: 980,
    category: "science",
    accessibility: ["Audio descriptions", "Tactile diagrams", "Simplified navigation"]
  },
  {
    id: 6,
    title: "Business Economics",
    description: "Understand market principles, financial concepts, and economic theories with real-world applications.",
    difficulty: "Intermediate",
    duration: "12 weeks",
    students: 1320,
    category: "business",
    accessibility: ["Voice annotations", "Sign language support", "Customizable interface"]
  },
  {
    id: 7,
    title: "Digital Art & Design",
    description: "Create digital artwork and designs using accessible tools and adaptive techniques.",
    difficulty: "Beginner",
    duration: "8 weeks",
    students: 1560,
    category: "arts",
    accessibility: ["Voice-controlled tools", "Alternative input devices", "Visual aids"]
  },
  {
    id: 8,
    title: "World History: Ancient Civilizations",
    description: "Explore ancient cultures, innovations, and historical events through interactive timelines.",
    difficulty: "Beginner",
    duration: "10 weeks",
    students: 1790,
    category: "humanities",
    accessibility: ["Audio lectures", "Interactive maps", "Transcript downloads"]
  },
  {
    id: 9,
    title: "Mobile App Development",
    description: "Build accessible mobile applications with inclusive design principles and adaptive interfaces.",
    difficulty: "Advanced",
    duration: "14 weeks",
    students: 870,
    category: "computer-science",
    accessibility: ["Code narration", "Keyboard shortcuts", "High contrast mode"]
  }
];

const Courses = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 bg-accent/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-display">
                  Inclusive Learning Courses
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our diverse range of accessible courses designed for students of all abilities.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-8">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search courses..." 
                  className="pl-10 w-full"
                  aria-label="Search courses"
                />
              </div>
              
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid max-w-3xl mx-auto mb-8 grid-cols-3 md:grid-cols-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="mathematics">Mathematics</TabsTrigger>
                <TabsTrigger value="science">Science</TabsTrigger>
                <TabsTrigger value="humanities">Humanities</TabsTrigger>
                <TabsTrigger value="computer-science">Computer Science</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <Card key={course.id} className="glass-card card-hover overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge variant="outline" className="mb-2">
                              {course.difficulty}
                            </Badge>
                            <CardTitle className="text-xl">{course.title}</CardTitle>
                          </div>
                          <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Book className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <CardDescription className="line-clamp-2">
                          {course.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium">Accessibility Features:</h4>
                          <div className="flex flex-wrap gap-2">
                            {course.accessibility.map((feature, index) => (
                              <Badge key={index} variant="secondary" className="bg-primary/5 text-primary text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t border-border/50 pt-4 flex justify-between">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5" />
                            <span>{course.students.toLocaleString()}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1 text-primary">
                          Explore <ArrowUpRight className="h-3.5 w-3.5" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              {["mathematics", "science", "humanities", "computer-science", "business"].map((category) => (
                <TabsContent key={category} value={category} className="animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses
                      .filter((course) => course.category === category)
                      .map((course) => (
                        <Card key={course.id} className="glass-card card-hover overflow-hidden">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <Badge variant="outline" className="mb-2">
                                  {course.difficulty}
                                </Badge>
                                <CardTitle className="text-xl">{course.title}</CardTitle>
                              </div>
                              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Book className="h-5 w-5 text-primary" />
                              </div>
                            </div>
                            <CardDescription className="line-clamp-2">
                              {course.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pb-4">
                            <div className="space-y-3">
                              <h4 className="text-sm font-medium">Accessibility Features:</h4>
                              <div className="flex flex-wrap gap-2">
                                {course.accessibility.map((feature, index) => (
                                  <Badge key={index} variant="secondary" className="bg-primary/5 text-primary text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="border-t border-border/50 pt-4 flex justify-between">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{course.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <User className="h-3.5 w-3.5" />
                                <span>{course.students.toLocaleString()}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="gap-1 text-primary">
                              Explore <ArrowUpRight className="h-3.5 w-3.5" />
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            
            <div className="flex items-center justify-center mt-12">
              <Button size="lg" className="button-hover">
                Browse All Courses
              </Button>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Coming Soon
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-display">
                  Custom Course Creation
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  Create your own inclusive courses with our AI-powered course builder. Add interactive elements, accessibility features, and adaptive content tailored to your educational needs.
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
                    <span>Drag-and-drop course builder</span>
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
                    <span>Automatic accessibility features</span>
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
                    <span>AI-generated learning materials</span>
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
                    <span>Custom assessment creation</span>
                  </div>
                </div>
                <div className="pt-4">
                  <Button className="button-hover">
                    Join Waitlist
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-primary/10 rounded-2xl transform rotate-2"></div>
                <Card className="glass-card relative z-10 overflow-hidden border border-border/80">
                  <CardHeader>
                    <CardTitle>Course Builder Preview</CardTitle>
                    <CardDescription>Coming Spring 2024</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 rounded-md bg-muted/50 border border-border/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-md bg-primary"></div>
                          <span className="text-sm font-medium">Module 1: Introduction</span>
                        </div>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </div>
                      
                      <div className="p-3 rounded-md bg-muted/50 border border-border/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-md bg-primary/80"></div>
                          <span className="text-sm font-medium">Module 2: Core Concepts</span>
                        </div>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </div>
                      
                      <div className="p-3 rounded-md bg-muted/50 border border-border/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-md bg-primary/60"></div>
                          <span className="text-sm font-medium">Module 3: Practical Applications</span>
                        </div>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </div>
                      
                      <div className="p-3 rounded-md bg-muted/50 border border-border/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-md bg-primary/40"></div>
                          <span className="text-sm font-medium">Module 4: Advanced Topics</span>
                        </div>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </div>
                      
                      <div className="p-3 rounded-md border border-dashed border-primary/40 flex items-center justify-center text-primary/70">
                        <span className="text-sm">+ Add New Module</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-border/50 flex justify-between">
                    <Badge variant="outline">AI-Powered</Badge>
                    <Badge variant="outline">Fully Accessible</Badge>
                    <Badge variant="outline">Customizable</Badge>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
