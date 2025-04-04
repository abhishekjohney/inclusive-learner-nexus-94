
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
  TrendingUp, 
  Star, 
  Award, 
  Clock 
} from "lucide-react";

export default function PointsDisplay() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['points', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      // Get student points
      const { data: points, error: pointsError } = await supabase
        .from('student_points')
        .select('*')
        .eq('student_id', user.id)
        .single();

      if (pointsError && pointsError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        throw pointsError;
      }

      // Get recent activities to show point history
      const { data: activities, error: activitiesError } = await supabase
        .from('activity_log')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (activitiesError) throw activitiesError;

      return {
        totalPoints: points?.points || 0,
        recentActivities: activities || [],
      };
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" /> Points & Rewards
          </CardTitle>
          <CardDescription>Your learning achievement points</CardDescription>
        </CardHeader>
        <CardContent className="animate-pulse space-y-4">
          <div className="h-12 bg-muted rounded"></div>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-6 bg-muted rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" /> Points & Rewards
          </CardTitle>
          <CardDescription>Your learning achievement points</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-6">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">0</div>
              <p className="text-muted-foreground">
                Complete activities to earn points
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Function to get icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login': return <Clock className="h-4 w-4" />;
      case 'view_content': return <TrendingUp className="h-4 w-4" />;
      case 'complete_content': return <Award className="h-4 w-4" />;
      case 'submit_quiz': return <Star className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" /> Points & Rewards
        </CardTitle>
        <CardDescription>Your learning achievement points</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-6">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">{data.totalPoints}</div>
            <p className="text-muted-foreground">
              Total points earned
            </p>
          </div>
        </div>
        
        {data.recentActivities.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2">Recent Activities</h4>
            <div className="space-y-2">
              {data.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {getActivityIcon(activity.activity_type)}
                    <span>{activity.description}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">+{activity.points_earned}</span>
                    <span className="text-muted-foreground text-xs">
                      {formatDate(activity.created_at)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {data.recentActivities.length === 0 && (
          <div className="text-center text-muted-foreground text-sm mt-4">
            No recent activities. Start engaging with content to earn points!
          </div>
        )}
      </CardContent>
    </Card>
  );
}
