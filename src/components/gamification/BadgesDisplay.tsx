
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
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Video,
  Check,
  Calendar,
  Compass
} from "lucide-react";

// Map badge names to icons
const badgeIcons: Record<string, React.ReactNode> = {
  'First Login': <Award className="h-6 w-6" />,
  'Video Master': <Video className="h-6 w-6" />,
  'Perfect Score': <Check className="h-6 w-6" />,
  'Weekly Streak': <Calendar className="h-6 w-6" />,
  'Material Explorer': <Compass className="h-6 w-6" />
};

export default function BadgesDisplay() {
  const { user } = useAuth();

  const { data: earnedBadges, isLoading } = useQuery({
    queryKey: ['earnedBadges', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('student_badges')
        .select('*, badges(*)')
        .eq('student_id', user.id);

      if (error) throw error;
      
      return data || [];
    },
    enabled: !!user,
  });

  const { data: allBadges } = useQuery({
    queryKey: ['allBadges'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('badges')
        .select('*');

      if (error) throw error;
      
      return data || [];
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Achievements</CardTitle>
          <CardDescription>Badges and rewards you've earned</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 animate-pulse">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 w-24 rounded-lg bg-muted"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const earnedBadgeIds = earnedBadges?.map(badge => badge.badge_id) || [];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Achievements</CardTitle>
        <CardDescription>Badges and rewards you've earned</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {allBadges?.map((badge) => {
            const isEarned = earnedBadgeIds.includes(badge.id);
            
            return (
              <div 
                key={badge.id} 
                className={`flex flex-col items-center justify-center p-3 rounded-lg border h-32 w-32 text-center ${
                  isEarned 
                    ? 'bg-primary/10 border-primary' 
                    : 'bg-muted/30 border-muted text-muted-foreground opacity-50'
                }`}
              >
                <div className={`mb-2 ${isEarned ? 'text-primary' : 'text-muted-foreground'}`}>
                  {badgeIcons[badge.name] || <Award className="h-6 w-6" />}
                </div>
                <div className="font-medium">{badge.name}</div>
                {isEarned ? (
                  <Badge variant="secondary" className="mt-1">Earned</Badge>
                ) : (
                  <div className="text-xs mt-1 max-w-[100px] overflow-hidden text-ellipsis">
                    {badge.criteria}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
