
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
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  Clock, 
  BookOpen 
} from "lucide-react";

export default function ProgressStats() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['progressStats', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      // Get counts of completed and total content
      const { data: contentProgress, error: progressError } = await supabase
        .from('progress_tracking')
        .select('*, learning_content!inner(*)')
        .eq('student_id', user.id);

      if (progressError) throw progressError;

      const totalContent = contentProgress?.length || 0;
      const completedContent = contentProgress?.filter(item => item.is_completed).length || 0;
      const completionRate = totalContent > 0 ? Math.round((completedContent / totalContent) * 100) : 0;
      
      // Get video stats
      const videoContent = contentProgress?.filter(item => 
        item.learning_content.content_type === 'video'
      );
      const totalVideos = videoContent?.length || 0;
      const watchedVideos = videoContent?.filter(item => item.is_completed).length || 0;
      const totalVideoMinutes = videoContent?.reduce((sum, item) => 
        sum + (item.learning_content.duration || 0), 0) || 0;

      return {
        totalContent,
        completedContent,
        completionRate,
        totalVideos,
        watchedVideos,
        totalVideoMinutes
      };
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-6 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </CardHeader>
            <CardContent>
              <div className="h-12 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-muted-foreground" /> Content Progress
            </CardTitle>
            <CardDescription>Overall learning completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">0%</div>
            <Progress value={0} />
            <p className="text-sm text-muted-foreground mt-2">No content available yet</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-muted-foreground" /> Completed Resources
            </CardTitle>
            <CardDescription>Materials you've finished</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0 / 0</div>
            <p className="text-sm text-muted-foreground mt-2">Start exploring content</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" /> Video Time
            </CardTitle>
            <CardDescription>Minutes of video content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0 mins</div>
            <p className="text-sm text-muted-foreground mt-2">No videos watched yet</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" /> Content Progress
          </CardTitle>
          <CardDescription>Overall learning completion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">{data.completionRate}%</div>
          <Progress value={data.completionRate} />
          <p className="text-sm text-muted-foreground mt-2">
            Keep going to increase your completion rate!
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" /> Completed Resources
          </CardTitle>
          <CardDescription>Materials you've finished</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{data.completedContent} / {data.totalContent}</div>
          <p className="text-sm text-muted-foreground mt-2">
            {data.totalContent > 0 
              ? `You've completed ${Math.round((data.completedContent / data.totalContent) * 100)}% of available content`
              : 'No content available yet'}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" /> Video Progress
          </CardTitle>
          <CardDescription>Video learning stats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{data.watchedVideos} / {data.totalVideos}</div>
          <p className="text-sm text-muted-foreground mt-2">
            {data.totalVideoMinutes > 0 
              ? `${data.totalVideoMinutes} total minutes of video content`
              : 'No video content available yet'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
