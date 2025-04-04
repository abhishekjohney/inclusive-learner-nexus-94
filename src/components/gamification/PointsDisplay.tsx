
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  GemIcon,
  TrendingUp,
  Award,
  Trophy,
} from "lucide-react";

export default function PointsDisplay() {
  const { user } = useAuth();

  // Get student points
  const { data: pointsData, isLoading: pointsLoading } = useQuery({
    queryKey: ['studentPoints', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('student_points')
        .select('*')
        .eq('student_id', user.id)
        .maybeSingle();

      if (error) throw error;
      
      return data || { points: 0 };
    },
    enabled: !!user,
  });

  // Get recent activities to display
  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ['recentActivities', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('activity_log')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      
      return data || [];
    },
    enabled: !!user,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <GemIcon className="mr-2 h-5 w-5 text-primary" />
          Your Points
        </CardTitle>
        <CardDescription>Track your progress and rewards</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-4xl font-bold">{pointsData?.points || 0}</p>
            <p className="text-sm text-muted-foreground">Total points earned</p>
          </div>
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Trophy className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Recent Activities</h3>
          {activitiesLoading ? (
            <div className="animate-pulse space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-6 bg-muted rounded-lg" />
              ))}
            </div>
          ) : activities && activities.length > 0 ? (
            <div className="space-y-2">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    {activity.activity_type === 'login' && <Award className="mr-2 h-4 w-4 text-blue-500" />}
                    {activity.activity_type === 'complete_content' && <TrendingUp className="mr-2 h-4 w-4 text-green-500" />}
                    {activity.activity_type === 'submit_quiz' && <Trophy className="mr-2 h-4 w-4 text-amber-500" />}
                    <span className="text-muted-foreground">{activity.description}</span>
                  </div>
                  <span className="font-medium">+{activity.points_earned || 0}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No recent activity</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
