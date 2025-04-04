
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import UploadContent from "./pages/UploadContent";
import Messages from "./pages/Messages";
import SpeechToTextPage from "./pages/SpeechToTextPage";
import SignLanguageTranslatorPage from "./pages/SignLanguageTranslatorPage";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Check authentication status on load is now handled by AuthProvider useEffect 

  const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }
    
    return children;
  };

  const StudentRoute = ({ children }: { children: JSX.Element }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }
    
    if (userRole !== 'student') {
      return <Navigate to="/dashboard" />;
    }
    
    return children;
  };

  const TeacherRoute = ({ children }: { children: JSX.Element }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }
    
    if (userRole !== 'teacher') {
      return <Navigate to="/dashboard" />;
    }
    
    return children;
  };

  const DashboardRedirect = () => {
    const userRole = localStorage.getItem('userRole');
    
    if (userRole === 'teacher') {
      return <UploadContent />; // Teacher sees the upload content page as their dashboard
    }
    
    return <StudentDashboard />; // Students see the student dashboard
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<RequireAuth><DashboardRedirect /></RequireAuth>} />
              
              {/* Teacher-specific routes */}
              <Route path="/upload" element={<TeacherRoute><UploadContent /></TeacherRoute>} />
              
              {/* Student-specific routes */}
              <Route path="/speech-to-text" element={<StudentRoute><SpeechToTextPage /></StudentRoute>} />
              <Route path="/sign-language" element={<StudentRoute><SignLanguageTranslatorPage /></StudentRoute>} />
              
              {/* Shared routes */}
              <Route path="/messages" element={<RequireAuth><Messages /></RequireAuth>} />
              <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
