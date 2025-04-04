import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Mic, FileText, Calendar, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UploadContent = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  
  const handleFileUpload = (event: React.FormEvent, type: string) => {
    event.preventDefault();
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      
      toast({
        title: `${type} uploaded successfully!`,
        description: "Your content is now available to students.",
        action: (
          <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-primary" />
          </div>
        ),
      });
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Upload Content</h1>
          <p className="text-muted-foreground">Share educational materials with your students</p>
        </div>
        
        <Tabs defaultValue="video" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span>Video</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Notes</span>
            </TabsTrigger>
            <TabsTrigger value="voice" className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              <span>Voice Notes</span>
            </TabsTrigger>
            <TabsTrigger value="circular" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Circular</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="video">
            <Card>
              <CardHeader>
                <CardTitle>Upload Video Lecture</CardTitle>
                <CardDescription>
                  Upload video lectures for your students. Supported formats: MP4, MOV, AVI.
                </CardDescription>
              </CardHeader>
              <form onSubmit={(e) => handleFileUpload(e, 'Video')}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="video-title">Title</Label>
                    <Input id="video-title" placeholder="Introduction to Physics" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="video-description">Description</Label>
                    <Textarea 
                      id="video-description" 
                      placeholder="Brief description of the video content..." 
                      rows={3} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="math">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="video-file">Video File</Label>
                    <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground mb-2">Drag & drop your video file here</p>
                      <p className="text-xs text-muted-foreground mb-4">OR</p>
                      <Input id="video-file" type="file" className="w-full" required accept="video/*" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Access Options</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select access" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Students</SelectItem>
                        <SelectItem value="specific">Specific Classes</SelectItem>
                        <SelectItem value="individual">Individual Students</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Upload Video"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Upload Notes</CardTitle>
                <CardDescription>
                  Share study notes and documents with your students. Supported formats: PDF, DOCX, TXT.
                </CardDescription>
              </CardHeader>
              <form onSubmit={(e) => handleFileUpload(e, 'Notes')}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="notes-title">Title</Label>
                    <Input id="notes-title" placeholder="Course Notes: Chapter 3" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes-description">Description</Label>
                    <Textarea 
                      id="notes-description" 
                      placeholder="Brief description of the notes..." 
                      rows={3} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes-file">Notes File</Label>
                    <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition">
                      <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground mb-2">Drag & drop your document here</p>
                      <p className="text-xs text-muted-foreground mb-4">OR</p>
                      <Input 
                        id="notes-file" 
                        type="file" 
                        className="w-full" 
                        required 
                        accept=".pdf,.doc,.docx,.txt"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Upload Notes"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="voice">
            <Card>
              <CardHeader>
                <CardTitle>Record Voice Notes</CardTitle>
                <CardDescription>
                  Record or upload voice notes for your students.
                </CardDescription>
              </CardHeader>
              <form onSubmit={(e) => handleFileUpload(e, 'Voice Note')}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="voice-title">Title</Label>
                    <Input id="voice-title" placeholder="Explanation: Solving Quadratic Equations" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="voice-description">Description</Label>
                    <Textarea 
                      id="voice-description" 
                      placeholder="Brief description of the voice note..." 
                      rows={3} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Record or Upload</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-md p-4 text-center hover:bg-muted/50 transition cursor-pointer">
                        <Mic className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="font-medium">Record Now</p>
                        <p className="text-xs text-muted-foreground">Record directly from your browser</p>
                      </div>
                      
                      <div className="border rounded-md p-4 text-center hover:bg-muted/50 transition cursor-pointer">
                        <Upload className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="font-medium">Upload File</p>
                        <p className="text-xs text-muted-foreground">Upload an existing audio file</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4 hidden">
                    <div className="flex justify-center space-x-4">
                      <Button size="icon" variant="outline" className="rounded-full h-12 w-12">
                        <Mic className="h-6 w-6" />
                      </Button>
                    </div>
                    <div className="mt-4">
                      <div className="h-10 bg-muted rounded-md">
                        <div className="bg-primary h-full w-0 rounded-md"></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0:00</span>
                        <span>0:00</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Upload Voice Note"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="circular">
            <Card>
              <CardHeader>
                <CardTitle>Post Circular/Announcement</CardTitle>
                <CardDescription>
                  Share important announcements, circulars, and notices with your students.
                </CardDescription>
              </CardHeader>
              <form onSubmit={(e) => handleFileUpload(e, 'Circular')}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="circular-title">Title</Label>
                    <Input id="circular-title" placeholder="Important: Exam Schedule Update" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="circular-content">Content</Label>
                    <Textarea 
                      id="circular-content" 
                      placeholder="Write your announcement details here..." 
                      rows={6}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High - Urgent</SelectItem>
                        <SelectItem value="medium">Medium - Important</SelectItem>
                        <SelectItem value="low">Low - Informational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Attachments (Optional)</Label>
                    <Input type="file" multiple />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isUploading}>
                    {isUploading ? "Posting..." : "Post Announcement"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default UploadContent;
