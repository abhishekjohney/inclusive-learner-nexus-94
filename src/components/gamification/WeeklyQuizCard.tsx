
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Bookmark, 
  CalendarDays, 
  Award,
  Star as StarIcon  // Import the Star icon from Lucide
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

export default function WeeklyQuizCard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the latest weekly quiz
  const { data: weeklyQuiz, isLoading: quizLoading } = useQuery({
    queryKey: ['weeklyQuiz'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .eq('is_weekly', true)
        .order('publish_date', { ascending: false })
        .limit(1)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Check if the student has already taken this quiz
  const { data: quizSubmission } = useQuery({
    queryKey: ['quizSubmission', user?.id, weeklyQuiz?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('student_quiz_submissions')
        .select('*')
        .eq('student_id', user?.id)
        .eq('quiz_id', weeklyQuiz?.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user && !!weeklyQuiz?.id,
  });

  const handleStartQuiz = () => {
    setIsLoading(true);
    // In a real app, navigate to the quiz page
    // navigate(`/quizzes/${weeklyQuiz.id}`);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  if (!weeklyQuiz) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5" />
            Weekly Quiz
          </CardTitle>
          <CardDescription>Test your knowledge and earn points</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-6">
            <p className="text-muted-foreground">No weekly quiz available right now.</p>
            <p className="text-xs text-muted-foreground mt-2">Check back soon!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Award className="mr-2 h-5 w-5" />
          Weekly Quiz
        </CardTitle>
        <CardDescription>Test your knowledge and earn points</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium">{weeklyQuiz.title}</h3>
          <p className="text-sm text-muted-foreground">{weeklyQuiz.description}</p>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-muted-foreground">
            <Bookmark className="mr-1 h-4 w-4" />
            <span>{weeklyQuiz.subject || 'General'}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <CalendarDays className="mr-1 h-4 w-4" />
            <span>Due: {new Date(weeklyQuiz.due_date || Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="flex items-center text-amber-500">
            <StarIcon className="h-5 w-5" />
            <span className="ml-1 font-medium">{weeklyQuiz.points} points</span>
          </div>
          {quizSubmission?.is_completed && (
            <Badge variant="outline" className="ml-auto">
              Completed
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {quizSubmission?.is_completed ? (
          <Button variant="outline" className="w-full" disabled>
            Already Completed
          </Button>
        ) : (
          <Button 
            className="w-full" 
            onClick={handleStartQuiz}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Start Quiz'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
