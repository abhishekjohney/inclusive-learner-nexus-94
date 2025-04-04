
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Pencil, Save, BookOpen, Award, Clock, BarChart3, Brain, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProfileLearningTracks from '@/components/profile/ProfileLearningTracks';
import { Loader2 } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    bio: '',
    notificationsEnabled: true,
    darkModeEnabled: false
  });

  // Fetch user profile data from Supabase
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }
      
      return data;
    },
    enabled: !!user?.id,
  });

  // Update local state when profile data is fetched
  useEffect(() => {
    if (profile) {
      setProfileData({
        firstName: profile.first_name || '',
        lastName: profile.last_name || '',
        email: user?.email || '',
        role: profile.role || '',
        bio: profile.bio || '',
        notificationsEnabled: true, // These could be stored in the profiles table
        darkModeEnabled: false
      });
    }
  }, [profile, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setProfileData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSaveProfile = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          bio: profileData.bio,
          // We don't update role here as it should generally be managed elsewhere
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      setEditMode(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: 'destructive',
        title: "Update Failed",
        description: "There was an error updating your profile.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch progress statistics for students
  const { data: progressStats } = useQuery({
    queryKey: ['progress', user?.id],
    queryFn: async () => {
      if (!user?.id || profileData.role !== 'student') return null;
      
      const { data, error } = await supabase
        .from('progress_tracking')
        .select('*, learning_content(*)')
        .eq('student_id', user.id);
        
      if (error) throw error;
      
      return data;
    },
    enabled: !!user?.id && profileData.role === 'student',
  });

  // Calculate progress metrics
  const completedContent = progressStats?.filter(item => item.is_completed).length || 0;
  const totalContent = progressStats?.length || 0;
  const completionPercentage = totalContent ? Math.round((completedContent / totalContent) * 100) : 0;
  
  // Calculate hours studied (mock data)
  const hoursStudied = progressStats?.reduce((total, item) => {
    const content = item.learning_content;
    return total + (content?.duration || 0);
  }, 0) || 0;

  if (isLoadingProfile) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <Button 
            variant={editMode ? "default" : "outline"} 
            onClick={() => editMode ? handleSaveProfile() : setEditMode(true)}
            disabled={isLoading}
          >
            {editMode ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="learning">Learning Tracks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile Information */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your personal details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${profileData.firstName} ${profileData.lastName}`} alt={`${profileData.firstName} ${profileData.lastName}`} />
                      <AvatarFallback>{profileData.firstName?.[0]}{profileData.lastName?.[0]}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h3 className="text-xl font-semibold">{profileData.firstName} {profileData.lastName}</h3>
                      <p className="text-muted-foreground">{profileData.email}</p>
                      <Badge variant="outline" className="mt-1 capitalize">{profileData.role}</Badge>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                        disabled={!editMode}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                        disabled={!editMode}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={true} // Email is managed by auth system, not editable here
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input 
                      id="bio" 
                      name="bio"
                      className="h-24"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Manage your app settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive notifications about updates</p>
                    </div>
                    <Switch 
                      checked={profileData.notificationsEnabled}
                      onCheckedChange={(checked) => handleSwitchChange('notificationsEnabled', checked)}
                      disabled={!editMode}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Dark Mode</h4>
                      <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
                    </div>
                    <Switch 
                      checked={profileData.darkModeEnabled}
                      onCheckedChange={(checked) => handleSwitchChange('darkModeEnabled', checked)}
                      disabled={!editMode}
                    />
                  </div>

                  {profileData.role === 'student' && (
                    <>
                      <Separator />
                      <div className="space-y-3">
                        <h4 className="font-medium">Learning Statistics</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Total Content Completed</span>
                            <span className="font-medium">{completionPercentage}%</span>
                          </div>
                          <Progress value={completionPercentage} className="h-2" />
                        </div>
                        
                        <div className="pt-2 grid grid-cols-2 gap-2">
                          <div className="bg-muted/40 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <Clock className="h-4 w-4 text-primary" />
                              <span className="text-xs font-medium">Hours Studied</span>
                            </div>
                            <p className="text-xl font-semibold">{hoursStudied}</p>
                          </div>
                          
                          <div className="bg-muted/40 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <BookOpen className="h-4 w-4 text-primary" />
                              <span className="text-xs font-medium">Courses</span>
                            </div>
                            <p className="text-xl font-semibold">{totalContent}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {profileData.role === 'teacher' && (
                    <>
                      <Separator />
                      <div className="space-y-3">
                        <h4 className="font-medium">Teaching Statistics</h4>
                        <div className="pt-2 grid grid-cols-2 gap-2">
                          <div className="bg-muted/40 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <BookOpen className="h-4 w-4 text-primary" />
                              <span className="text-xs font-medium">Courses</span>
                            </div>
                            <p className="text-xl font-semibold">8</p>
                          </div>
                          
                          <div className="bg-muted/40 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <BarChart3 className="h-4 w-4 text-primary" />
                              <span className="text-xs font-medium">Students</span>
                            </div>
                            <p className="text-xl font-semibold">156</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="learning">
            <ProfileLearningTracks />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
