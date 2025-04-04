
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Book, 
  Headphones, 
  LogOut, 
  Menu, 
  MessageSquare, 
  Settings, 
  Upload, 
  User, 
  Users, 
  Video,
  Captions,
  Languages
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (!isLoggedIn || !role) {
      navigate('/login');
      return;
    }
    
    setUserRole(role);
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    navigate('/login');
  };

  const navigationItems = userRole === 'teacher' 
    ? [
        { name: 'Dashboard', icon: <Users size={20} />, path: '/dashboard' },
        { name: 'Upload Content', icon: <Upload size={20} />, path: '/upload' },
        { name: 'My Content', icon: <Book size={20} />, path: '/my-content' },
        { name: 'Messages', icon: <MessageSquare size={20} />, path: '/messages' },
        { name: 'Profile', icon: <User size={20} />, path: '/profile' },
      ]
    : [
        { name: 'Dashboard', icon: <Book size={20} />, path: '/dashboard' },
        { name: 'Learning Materials', icon: <Video size={20} />, path: '/materials' },
        { name: 'Live Captions', icon: <Captions size={20} />, path: '/speech-to-text' },
        { name: 'Sign Language', icon: <Languages size={20} />, path: '/sign-language' },
        { name: 'Messages', icon: <MessageSquare size={20} />, path: '/messages' },
        { name: 'Profile', icon: <User size={20} />, path: '/profile' },
      ];

  if (!userRole) return null;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside 
        className={`bg-white dark:bg-gray-900 border-r border-border transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-0 -ml-64 md:w-16 md:ml-0'
        }`}
      >
        <div className="h-full px-3 py-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-6 px-2">
              {isSidebarOpen && (
                <h2 className="text-xl font-bold text-primary">EduAccess</h2>
              )}
            </div>
            
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={`w-full justify-start ${
                    isSidebarOpen ? 'px-3' : 'px-0 justify-center'
                  }`}
                  onClick={() => navigate(item.path)}
                  title={!isSidebarOpen ? item.name : undefined}
                  aria-label={item.name}
                >
                  <div className="flex items-center">
                    <span className="mr-2">{item.icon}</span>
                    {isSidebarOpen && <span>{item.name}</span>}
                  </div>
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-1">
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                isSidebarOpen ? 'px-3' : 'px-0 justify-center'
              }`}
              onClick={() => navigate('/settings')}
              title={!isSidebarOpen ? 'Settings' : undefined}
              aria-label="Settings"
            >
              <div className="flex items-center">
                <span className="mr-2">
                  <Settings size={20} />
                </span>
                {isSidebarOpen && <span>Settings</span>}
              </div>
            </Button>
            
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                isSidebarOpen ? 'px-3' : 'px-0 justify-center'
              }`}
              onClick={handleLogout}
              title={!isSidebarOpen ? 'Logout' : undefined}
              aria-label="Logout"
            >
              <div className="flex items-center">
                <span className="mr-2">
                  <LogOut size={20} />
                </span>
                {isSidebarOpen && <span>Logout</span>}
              </div>
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white dark:bg-gray-900 border-b border-border">
          <div className="h-16 px-4 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <Menu size={20} />
            </Button>
            
            <div className="flex items-center space-x-2">
              <div>
                <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white rounded-full text-xs flex items-center justify-center">
                    3
                  </span>
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  {userRole === 'teacher' ? 'T' : 'S'}
                </div>
                {isSidebarOpen && (
                  <div className="hidden md:block text-sm">
                    <p className="font-medium">{userRole === 'teacher' ? 'Teacher' : 'Student'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
