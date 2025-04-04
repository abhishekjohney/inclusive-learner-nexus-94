
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, CheckCircle2, Clock } from "lucide-react";

export default function WeeklyQuizCard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: weeklyQuizzes, isLoading } = useQuery({
    queryKey: ['weeklyQuizzes'],
    queryFn: async () => {
      if (!user) return [];
      
      const today = new Date();
      
      // Get weekly quizzes 
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .eq('is_weekly', true)
        .gt('due_date', today.toISOString())
        .order('due_date', { ascending: true });

      if (error) throw error;
      
      // Check if user has already completed these quizzes
      if (data.length > 0) {
        const quizIds = data.map(quiz => quiz.id);
        
        const { data: submissions, error: submissionsError } = await supabase
          .from('student_quiz_submissions')
          .select('quiz_id, is_completed')
          .eq('student_id', user.id)
          .in('quiz_id', quizIds);
          
        if (submissionsError) throw submissionsError;
        
        // Map completion status to quizzes
        return data.map(quiz => {
          const submission = submissions?.find(sub => sub.quiz_id === quiz.id);
          return {
            ...quiz,
            isCompleted: submission?.is_completed || false
          };
        });
      }
      
      return data || [];
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </CardHeader>
        <CardContent>
          <div className="h-20 bg-muted rounded"></div>
        </CardContent>
      </Card>
    );
  }

  // Formatted due date
  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Return different card content if no quizzes available
  if (!weeklyQuizzes?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" /> Weekly Challenges
          </CardTitle>
          <CardDescription>Test your knowledge</CardDescription>
        </CardHeader>
        <CardContent className="pt-4 pb-6">
          <div className="flex flex-col items-center justify-center text-center p-6">
            <Brain className="h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium mb-2">No Weekly Quiz Available</h3>
            <p className="text-muted-foreground mb-3">
              New challenges will be posted soon. Check back later!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // The first available quiz
  const activeQuiz = weeklyQuizzes[0];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" /> Weekly Challenge
        </CardTitle>
        <CardDescription>Test your knowledge and earn points</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">{activeQuiz.title}</h3>
          {activeQuiz.description && (
            <p className="text-muted-foreground">{activeQuiz.description}</p>
          )}
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Due: {formatDueDate(activeQuiz.due_date)}</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-sm">
              <Star className="h-4 w-4 text-amber-500" />
              <span>{activeQuiz.points} points</span>
            </div>
            
            {activeQuiz.isCompleted && (
              <div className="flex items-center gap-1.5 text-sm text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                <span>Completed</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant={activeQuiz.isCompleted ? "outline" : "default"} 
          className="w-full"
          onClick={() => navigate(`/quiz/${activeQuiz.id}`)}
          disabled={activeQuiz.isCompleted}
        >
          {activeQuiz.isCompleted ? "View Results" : "Take Quiz"}
        </Button>
      </CardFooter>
    </Card>
  );
}
