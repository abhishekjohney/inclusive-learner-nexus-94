import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Video, FileText, Mic, Calendar, Book, User, MessageSquare, Star, Clock, Download } from "lucide-react";

const StudentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data
  const recentContent = [
    {
      id: '1',
      type: 'video',
      title: 'Introduction to Cell Biology',
      teacher: 'Dr. Sarah Williams',
      subject: 'Biology',
      date: '2 hours ago',
      duration: '45 minutes',
      icon: Video,
    },
    {
      id: '2',
      type: 'notes',
      title: 'Quadratic Equations Practice Problems',
      teacher: 'Mr. James Peterson',
      subject: 'Mathematics',
      date: '1 day ago',
      pages: 12,
      icon: FileText,
    },
    {
      id: '3',
      type: 'voice',
      title: 'Understanding Literary Devices',
      teacher: 'Ms. Emily Chen',
      subject: 'English Literature',
      date: '2 days ago',
      duration: '15 minutes',
      icon: Mic,
    },
    {
      id: '4',
      type: 'circular',
      title: 'Midterm Exam Schedule Update',
      teacher: 'Principal',
      subject: 'Announcement',
      date: 'Yesterday',
      priority: 'High',
      icon: Calendar,
    },
  ];
  
  const upcomingContent = [
    {
      id: '5',
      type: 'assignment',
      title: 'Physics Lab Report',
      dueDate: 'Tomorrow',
      subject: 'Physics',
    },
    {
      id: '6',
      type: 'quiz',
      title: 'Chapter 4 Quiz',
      dueDate: 'In 2 days',
      subject: 'History',
    },
    {
      id: '7',
      type: 'exam',
      title: 'Mid-term Examination',
      dueDate: 'Next week',
      subject: 'Multiple',
    },
  ];
  
  const teachers = [
    {
      id: '1',
      name: 'Dr. Sarah Williams',
      subject: 'Biology',
      avatar: '',
      unreadMessages: 0,
    },
    {
      id: '2',
      name: 'Mr. James Peterson',
      subject: 'Mathematics',
      avatar: '',
      unreadMessages: 2,
    },
    {
      id: '3',
      name: 'Ms. Emily Chen',
      subject: 'English Literature',
      avatar: '',
      unreadMessages: 1,
    },
  ];
  
  const filteredContent = recentContent.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <p className="text-muted-foreground">Access your learning materials and tools</p>
          </div>
          
          <div className="w-full sm:w-auto">
            <Input 
              placeholder="Search content..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-[250px]"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Upcoming Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingContent.map(item => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {item.type === 'assignment' && <FileText className="h-5 w-5 text-primary" />}
                    {item.type === 'quiz' && <Book className="h-5 w-5 text-primary" />}
                    {item.type === 'exam' && <Star className="h-5 w-5 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{item.subject}</span>
                      <span className="font-medium text-primary">{item.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full" size="sm">
                View All Tasks
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                My Teachers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {teachers.map(teacher => (
                <div key={teacher.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {teacher.avatar ? (
                        <img src={teacher.avatar} alt={teacher.name} className="w-full h-full rounded-full" />
                      ) : (
                        <span className="font-medium text-primary">{teacher.name.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{teacher.name}</h3>
                      <p className="text-xs text-muted-foreground">{teacher.subject}</p>
                    </div>
                  </div>
                  
                  <Button size="sm" variant="ghost" className="relative">
                    <MessageSquare className="h-5 w-5" />
                    {teacher.unreadMessages > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-xs text-primary-foreground rounded-full flex items-center justify-center">
                        {teacher.unreadMessages}
                      </span>
                    )}
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full" size="sm">
                Message All
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5 text-primary" />
                Accessibility Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = '/speech-to-text'}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="text-primary"
                    >
                      <path d="M9 6a3 3 0 0 1 6 0v8a3 3 0 0 1-6 0V6z"></path>
                      <path d="M16 8a4 4 0 0 1 0 8"></path>
                      <path d="M4 8a4 4 0 0 0 0 8"></path>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Live Captions</h3>
                    <p className="text-xs text-muted-foreground">Convert speech to text</p>
                  </div>
                </div>
              </Button>
              
              <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = '/sign-language'}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="text-primary"
                    >
                      <path d="M12 22v-5"></path>
                      <path d="M9 7V2"></path>
                      <path d="M15 2v5"></path>
                      <path d="M12 17v-5"></path>
                      <path d="M5 17v-5"></path>
                      <path d="M5 12H2"></path>
                      <path d="M19 12h3"></path>
                      <path d="M5 7h14"></path>
                      <path d="M9 12h6"></path>
                      <path d="M9 17h6"></path>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Sign Language</h3>
                    <p className="text-xs text-muted-foreground">Translate signs to text</p>
                  </div>
                </div>
              </Button>
              
              <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = '/messages'}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Message Teachers</h3>
                    <p className="text-xs text-muted-foreground">Get help when needed</p>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">Recent Learning Materials</h2>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="voice">Voice Notes</TabsTrigger>
              <TabsTrigger value="circulars">Circulars</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredContent.length > 0 ? (
                  filteredContent.map(item => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="bg-primary/10 h-2">
                        <div className="bg-primary h-full w-1/3"></div>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <item.icon className="h-4 w-4 text-primary" />
                            <p className="text-xs font-medium uppercase text-muted-foreground">
                              {item.type}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="Download">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>
                          by {item.teacher} · {item.subject}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="text-sm text-muted-foreground">
                          {item.duration && <p>Duration: {item.duration}</p>}
                          {item.pages && <p>Pages: {item.pages}</p>}
                          {item.priority && <p>Priority: {item.priority}</p>}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pb-4">
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                        <Button size="sm">View</Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full py-8 text-center">
                    <p className="text-muted-foreground">No content found matching your search criteria</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="videos" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredContent.filter(item => item.type === 'video').length > 0 ? (
                  filteredContent
                    .filter(item => item.type === 'video')
                    .map(item => (
                      <Card key={item.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2 mb-2">
                            <item.icon className="h-4 w-4 text-primary" />
                            <p className="text-xs font-medium uppercase text-muted-foreground">
                              {item.type}
                            </p>
                          </div>
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription>
                            by {item.teacher} · {item.subject}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-sm text-muted-foreground">Duration: {item.duration}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between pb-4">
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                          <Button size="sm">Watch</Button>
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                  <div className="col-span-full py-8 text-center">
                    <p className="text-muted-foreground">No videos found</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="notes" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredContent.filter(item => item.type === 'notes').length > 0 ? (
                  filteredContent
                    .filter(item => item.type === 'notes')
                    .map(item => (
                      <Card key={item.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2 mb-2">
                            <item.icon className="h-4 w-4 text-primary" />
                            <p className="text-xs font-medium uppercase text-muted-foreground">
                              {item.type}
                            </p>
                          </div>
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription>
                            by {item.teacher} · {item.subject}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-sm text-muted-foreground">Pages: {item.pages}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between pb-4">
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                          <Button size="sm">Read</Button>
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                  <div className="col-span-full py-8 text-center">
                    <p className="text-muted-foreground">No notes found</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="voice" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredContent.filter(item => item.type === 'voice').length > 0 ? (
                  filteredContent
                    .filter(item => item.type === 'voice')
                    .map(item => (
                      <Card key={item.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2 mb-2">
                            <item.icon className="h-4 w-4 text-primary" />
                            <p className="text-xs font-medium uppercase text-muted-foreground">
                              {item.type}
                            </p>
                          </div>
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription>
                            by {item.teacher} · {item.subject}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-sm text-muted-foreground">Duration: {item.duration}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between pb-4">
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                          <Button size="sm">Listen</Button>
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                  <div className="col-span-full py-8 text-center">
                    <p className="text-muted-foreground">No voice notes found</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="circulars" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredContent.filter(item => item.type === 'circular').length > 0 ? (
                  filteredContent
                    .filter(item => item.type === 'circular')
                    .map(item => (
                      <Card key={item.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2 mb-2">
                            <item.icon className="h-4 w-4 text-primary" />
                            <p className="text-xs font-medium uppercase text-muted-foreground">
                              {item.type}
                            </p>
                          </div>
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription>
                            by {item.teacher} · {item.subject}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-sm text-muted-foreground">Priority: {item.priority}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between pb-4">
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                          <Button size="sm">View</Button>
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                  <div className="col-span-full py-8 text-center">
                    <p className="text-muted-foreground">No circulars found</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
