import { supabase } from '@/integrations/supabase/client';

// Types
export interface LearningContent {
  id: string;
  title: string;
  description: string | null;
  content_type: string;
  file_url: string | null;
  subject: string | null;
  teacher_id: string;
  duration: number | null;
  pages: number | null;
  priority: string | null;
  created_at: string;
  updated_at: string;
}

// Auth Service
export const authService = {
  getCurrentSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },
  
  getCurrentUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  },
  
  getUserProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  updateUserProfile: async (userId: string, updates: any) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Content Service
export const contentService = {
  getAllContent: async () => {
    const { data, error } = await supabase
      .from('learning_content')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as LearningContent[];
  },
  
  getContentById: async (id: string) => {
    const { data, error } = await supabase
      .from('learning_content')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as LearningContent;
  },
  
  getContentByType: async (contentType: string) => {
    const { data, error } = await supabase
      .from('learning_content')
      .select('*')
      .eq('content_type', contentType)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as LearningContent[];
  },
  
  uploadContent: async (content: Omit<LearningContent, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      console.log("Attempting to upload content:", content);
      
      const { data, error } = await supabase
        .from('learning_content')
        .insert([content])
        .select();
      
      if (error) {
        console.error("Error uploading content:", error);
        throw error;
      }
      
      console.log("Content uploaded successfully:", data);
      return data[0] as LearningContent;
    } catch (err) {
      console.error("Upload content error:", err);
      throw err;
    }
  }
};

// Progress Service
export const progressService = {
  getStudentProgress: async (studentId: string) => {
    const { data, error } = await supabase
      .from('progress_tracking')
      .select('*, learning_content(*)')
      .eq('student_id', studentId);
    
    if (error) throw error;
    return data;
  },
  
  updateProgress: async (studentId: string, contentId: string, progress: number, isCompleted: boolean) => {
    // Check if entry exists
    const { data: existing } = await supabase
      .from('progress_tracking')
      .select('*')
      .eq('student_id', studentId)
      .eq('content_id', contentId)
      .maybeSingle();
    
    if (existing) {
      // Update existing entry
      const { data, error } = await supabase
        .from('progress_tracking')
        .update({
          progress_percentage: progress,
          is_completed: isCompleted,
          last_accessed: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('student_id', studentId)
        .eq('content_id', contentId)
        .select();
      
      if (error) throw error;
      return data;
    } else {
      // Create new entry
      const { data, error } = await supabase
        .from('progress_tracking')
        .insert({
          student_id: studentId,
          content_id: contentId,
          progress_percentage: progress,
          is_completed: isCompleted,
          last_accessed: new Date().toISOString()
        })
        .select();
      
      if (error) throw error;
      return data;
    }
  }
};

// Quiz Service
export const quizService = {
  getQuizzes: async () => {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .order('publish_date', { ascending: false });
    
    if (error) throw error;
    return data;
  },
  
  getQuizById: async (quizId: string) => {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*, quiz_questions(*)')
      .eq('id', quizId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  submitQuizResponse: async (studentId: string, quizId: string, answers: any, score: number) => {
    const { data, error } = await supabase
      .from('student_quiz_submissions')
      .insert({
        student_id: studentId,
        quiz_id: quizId,
        answers,
        score,
        is_completed: true,
        submitted_at: new Date().toISOString()
      })
      .select();
    
    if (error) throw error;
    
    // Award points and check for badges
    if (score === 100) {
      await supabase.rpc('award_points_and_check_badges', {
        p_student_id: studentId,
        p_points: 20,
        p_action: 'perfect_quiz'
      });
    } else {
      // Award points for completing a quiz
      await supabase
        .from('activity_log')
        .insert({
          user_id: studentId,
          activity_type: 'submit_quiz',
          description: `Completed a quiz with score ${score}%`,
          points_earned: 10
        });
    }
    
    return data;
  }
};

// Messaging Service
export const messagingService = {
  getConversations: async (userId: string) => {
    // Get all messages sent or received by the user
    const { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    // Get all unique user IDs
    const userIds = new Set<string>();
    messages.forEach(message => {
      if (message.sender_id !== userId) userIds.add(message.sender_id);
      if (message.recipient_id !== userId) userIds.add(message.recipient_id);
    });
    
    // Get profiles for these users
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .in('id', Array.from(userIds));
      
    if (profilesError) throw profilesError;
    
    // Map profiles
    const profilesMap: Record<string, any> = {};
    profiles.forEach(profile => {
      profilesMap[profile.id] = profile;
    });
    
    // Group by conversation
    const conversations: Record<string, any> = {};
    messages.forEach(message => {
      const otherUserId = message.sender_id === userId ? message.recipient_id : message.sender_id;
      
      if (!conversations[otherUserId]) {
        conversations[otherUserId] = {
          id: otherUserId,
          user: profilesMap[otherUserId],
          messages: [message],
          unreadCount: message.recipient_id === userId && !message.read ? 1 : 0,
          lastMessage: message
        };
      } else {
        conversations[otherUserId].messages.push(message);
        if (message.recipient_id === userId && !message.read) {
          conversations[otherUserId].unreadCount++;
        }
        
        // Update last message if this one is newer
        if (new Date(message.created_at) > new Date(conversations[otherUserId].lastMessage.created_at)) {
          conversations[otherUserId].lastMessage = message;
        }
      }
    });
    
    return Object.values(conversations);
  },
  
  getConversation: async (userId: string, otherUserId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`and(sender_id.eq.${userId},recipient_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},recipient_id.eq.${userId})`)
      .order('created_at', { ascending: true });
      
    if (error) throw error;
    
    // Mark messages as read
    const unreadIds = data
      .filter(msg => msg.recipient_id === userId && !msg.read)
      .map(msg => msg.id);
      
    if (unreadIds.length > 0) {
      await supabase
        .from('messages')
        .update({ read: true })
        .in('id', unreadIds);
    }
    
    return data;
  },
  
  sendMessage: async (senderId: string, recipientId: string, content: string) => {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        sender_id: senderId,
        recipient_id: recipientId,
        content,
        read: false
      })
      .select();
      
    if (error) throw error;
    
    // Log activity
    await supabase
      .from('activity_log')
      .insert({
        user_id: senderId,
        activity_type: 'message_sent',
        description: 'Sent a message',
        points_earned: 1
      });
      
    return data[0];
  }
};

// Gamification Service
export const gamificationService = {
  getStudentPoints: async (studentId: string) => {
    const { data, error } = await supabase
      .from('student_points')
      .select('*')
      .eq('student_id', studentId)
      .maybeSingle();
      
    if (error) throw error;
    return data;
  },
  
  getStudentBadges: async (studentId: string) => {
    const { data, error } = await supabase
      .from('student_badges')
      .select('*, badges(*)')
      .eq('student_id', studentId);
      
    if (error) throw error;
    return data;
  },
  
  getActivityLog: async (userId: string) => {
    const { data, error } = await supabase
      .from('activity_log')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20);
      
    if (error) throw error;
    return data;
  },
  
  recordActivity: async (
    userId: string, 
    activityType: 'login' | 'view_content' | 'complete_content' | 'submit_quiz' | 'receive_badge' | 'message_sent',
    description: string,
    points: number,
    action?: string
  ) => {
    // Log activity
    const { data, error } = await supabase
      .from('activity_log')
      .insert({
        user_id: userId,
        activity_type: activityType,
        description,
        points_earned: points
      })
      .select();
      
    if (error) throw error;
    
    // Award points and check badges
    if (action) {
      await supabase.rpc('award_points_and_check_badges', {
        p_student_id: userId,
        p_points: points,
        p_action: action
      });
    }
    
    return data[0];
  }
};

export default {
  authService,
  contentService,
  progressService,
  quizService,
  messagingService,
  gamificationService
};
