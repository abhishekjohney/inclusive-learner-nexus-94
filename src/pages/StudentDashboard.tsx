
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProgressStats from '@/components/gamification/ProgressStats';
import BadgesDisplay from '@/components/gamification/BadgesDisplay';
import PointsDisplay from '@/components/gamification/PointsDisplay';
import WeeklyQuizCard from '@/components/gamification/WeeklyQuizCard';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  // Handle login activity and award badge when dashboard loads
  useEffect(() => {
    const recordLoginActivity = async () => {
      if (user) {
        try {
          // Record activity
          await supabase
            .from('activity_log')
            .insert({
              user_id: user.id,
              activity_type: 'login',
              description: 'Logged into the platform',
              points_earned: 1
            });

          // Award points and check for badges
          await supabase.rpc('award_points_and_check_badges', {
            p_student_id: user.id,
            p_points: 1,
            p_action: 'login'
          });
        } catch (error) {
          console.error('Error recording login activity:', error);
        }
      }
    };

    recordLoginActivity();
  }, [user]);

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Student Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Track your progress and achievements
            </p>
          </div>
        </div>

        {/* Progress Stats Section */}
        <ProgressStats />

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Badges Display */}
            <BadgesDisplay />

            {/* Recent Learning Content Section */}
            {/* This would be implemented as a separate component */}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Points Display */}
            <PointsDisplay />
            
            {/* Weekly Quiz */}
            <WeeklyQuizCard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
