
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Book,
  Upload,
  MessageSquare,
  Mic,
  Languages,
  User,
  LogOut,
  Menu,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { signOut, userRole } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  
  // Define navigation links based on user role
  const getNavLinks = () => {
    const commonLinks = [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: <Home className="h-5 w-5" />
      },
      {
        title: 'Messages',
        href: '/messages',
        icon: <MessageSquare className="h-5 w-5" />
      },
      {
        title: 'Profile',
        href: '/profile',
        icon: <User className="h-5 w-5" />
      }
    ];
    
    const teacherLinks = [
      {
        title: 'Upload Content',
        href: '/upload',
        icon: <Upload className="h-5 w-5" />
      }
    ];
    
    const studentLinks = [
      {
        title: 'Learning Material',
        href: '/content',
        icon: <Book className="h-5 w-5" />
      },
      {
        title: 'Speech to Text',
        href: '/speech-to-text',
        icon: <Mic className="h-5 w-5" />
      },
      {
        title: 'Sign Language',
        href: '/sign-language',
        icon: <Languages className="h-5 w-5" />
      }
    ];
    
    return userRole === 'teacher' 
      ? [...commonLinks, ...teacherLinks]
      : [...commonLinks, ...studentLinks];
  };

  const handleNavigation = (href: string) => {
    navigate(href);
    setOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile Header */}
      <div className="md:hidden border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary">EduAccess</span>
          </div>
          
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] p-0">
              <div className="border-b p-4">
                <span className="font-bold text-primary">EduAccess</span>
              </div>
              <nav className="flex flex-col p-2">
                {getNavLinks().map((link, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    className="justify-start mb-1"
                    onClick={() => handleNavigation(link.href)}
                  >
                    {link.icon}
                    <span className="ml-2">{link.title}</span>
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  onClick={signOut}
                  className="justify-start text-red-500 hover:text-red-500 hover:bg-red-50 mt-4"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="ml-2">Sign out</span>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop only */}
        <div className="hidden md:flex w-64 flex-col border-r">
          <div className="border-b p-4">
            <span className="font-bold text-xl text-primary">EduAccess</span>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {getNavLinks().map((link, i) => (
              <Button
                key={i}
                variant={location.pathname === link.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  location.pathname === link.href && "bg-primary/10"
                )}
                onClick={() => navigate(link.href)}
              >
                {link.icon}
                <span className="ml-2">{link.title}</span>
              </Button>
            ))}
          </nav>
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              onClick={signOut}
              className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-2">Sign out</span>
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
