
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Send, 
  Search, 
  User, 
  MessageSquare, 
  CheckCheck, 
  Edit, 
  Loader2 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  recipient: z.string().min(1, {
    message: "Please select a recipient",
  }),
  message: z.string().min(1, {
    message: "Message cannot be empty",
  }),
});

const Messages = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  // Form for new message
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipient: "",
      message: "",
    },
  });

  // Fetch all users for new message form
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', user.id);  // Don't include the current user
        
      if (error) throw error;
      
      return data || [];
    },
    enabled: !!user,
  });
  
  // Fetch conversations (unique users the current user has messaged with)
  const { data: conversations, isLoading: conversationsLoading } = useQuery({
    queryKey: ['conversations', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      // Get all messages sent or received by the user
      const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Extract unique user IDs
      const contactIds = new Set<string>();
      messages?.forEach(message => {
        if (message.sender_id !== user.id) contactIds.add(message.sender_id);
        if (message.recipient_id !== user.id) contactIds.add(message.recipient_id);
      });
      
      // Get user profiles for all contacts
      const contactProfiles: Record<string, any> = {};
      
      if (contactIds.size > 0) {
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .in('id', Array.from(contactIds));
          
        if (profilesError) throw profilesError;
        
        // Create a map of profiles by ID
        profiles?.forEach(profile => {
          contactProfiles[profile.id] = profile;
        });
      }
      
      // Group messages by contact
      const conversationMap: Record<string, any> = {};
      messages?.forEach(message => {
        const contactId = message.sender_id === user.id 
          ? message.recipient_id 
          : message.sender_id;
          
        if (!conversationMap[contactId]) {
          conversationMap[contactId] = {
            contactId,
            contact: contactProfiles[contactId],
            lastMessage: message,
            unreadCount: message.recipient_id === user.id && !message.read ? 1 : 0
          };
        } else if (message.recipient_id === user.id && !message.read) {
          conversationMap[contactId].unreadCount++;
        }
      });
      
      return Object.values(conversationMap);
    },
    enabled: !!user,
  });

  // Fetch active conversation messages
  const { data: activeConversation, isLoading: messagesLoading } = useQuery({
    queryKey: ['conversation', user?.id, activeContactId],
    queryFn: async () => {
      if (!user || !activeContactId) return null;
      
      // Get messages between the current user and the active contact
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${user.id},recipient_id.eq.${activeContactId}),and(sender_id.eq.${activeContactId},recipient_id.eq.${user.id})`)
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      
      // Mark unread messages as read
      const unreadMessageIds = data
        ?.filter(msg => msg.recipient_id === user.id && !msg.read)
        .map(msg => msg.id);
        
      if (unreadMessageIds?.length) {
        await supabase
          .from('messages')
          .update({ read: true })
          .in('id', unreadMessageIds);
          
        // Invalidate conversations query to update unread counts
        queryClient.invalidateQueries({ queryKey: ['conversations'] });
      }
      
      return data || [];
    },
    enabled: !!user && !!activeContactId,
  });

  // Get current user profile
  const { data: currentUserProfile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) throw error;
      
      return data;
    },
    enabled: !!user,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async ({ recipientId, content }: { recipientId: string, content: string }) => {
      if (!user) throw new Error('You must be logged in to send messages');
      
      const { data, error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          recipient_id: recipientId,
          content,
          read: false,
        })
        .select();
        
      if (error) throw error;

      // Log activity
      await supabase
        .from('activity_log')
        .insert({
          user_id: user.id,
          activity_type: 'message_sent',
          description: 'Sent a message',
          points_earned: 1
        });
        
      return data;
    },
    onSuccess: () => {
      // Invalidate relevant queries to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      if (activeContactId) {
        queryClient.invalidateQueries({ queryKey: ['conversation', user?.id, activeContactId] });
      }
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Failed to send message',
        description: error.message,
      });
    }
  });

  // New message submission handler
  const onSubmitNewMessage = (values: z.infer<typeof formSchema>) => {
    sendMessageMutation.mutate({
      recipientId: values.recipient,
      content: values.message
    });
    
    // Reset form and close sheet
    form.reset();
    setIsSheetOpen(false);
  };
  
  // Handle sending a message in active conversation
  const [newMessage, setNewMessage] = useState('');
  const sendActiveMessage = () => {
    if (!newMessage.trim() || !activeContactId) return;
    
    sendMessageMutation.mutate({
      recipientId: activeContactId,
      content: newMessage.trim()
    });
    
    setNewMessage('');
  };

  // Format timestamp
  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get contact name
  const getContactName = (contact: any) => {
    if (!contact) return 'Unknown User';
    return `${contact.first_name || ''} ${contact.last_name || ''}`.trim() || 'User';
  };

  // Filter conversations by search term
  const filteredConversations = conversations?.filter(convo => {
    if (!search.trim()) return true;
    const contactName = getContactName(convo.contact);
    return contactName.toLowerCase().includes(search.toLowerCase());
  });

  // Set up realtime subscription for messages
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('messages-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `recipient_id=eq.${user.id}`,
        },
        (payload) => {
          // Invalidate queries to refresh data
          queryClient.invalidateQueries({ queryKey: ['conversations', user.id] });
          
          if (activeContactId && 
             (payload.new.sender_id === activeContactId || 
              payload.new.recipient_id === activeContactId)) {
            queryClient.invalidateQueries({ queryKey: ['conversation', user.id, activeContactId] });
          }
          
          // Show toast notification for new messages
          if (payload.eventType === 'INSERT' && payload.new.sender_id !== user.id) {
            const senderName = 'New message'; // This could be improved by fetching sender name
            toast({
              title: senderName,
              description: payload.new.content.length > 30 
                ? payload.new.content.substring(0, 30) + '...'
                : payload.new.content,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, activeContactId, queryClient]);

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col">
        <div className="p-4 md:p-6 border-b">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold">Messages</h1>
            
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button>
                  <Edit className="mr-2 h-4 w-4" />
                  New Message
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>New Message</SheetTitle>
                  <SheetDescription>
                    Send a message to a student or teacher
                  </SheetDescription>
                </SheetHeader>
                
                <div className="py-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitNewMessage)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="recipient"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Recipient</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select recipient" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {usersLoading ? (
                                  <div className="flex items-center justify-center p-4">
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    <span>Loading users...</span>
                                  </div>
                                ) : users && users.length > 0 ? (
                                  users.map((user) => (
                                    <SelectItem key={user.id} value={user.id}>
                                      {`${user.first_name || ''} ${user.last_name || ''}`.trim() || 'User'} ({user.role})
                                    </SelectItem>
                                  ))
                                ) : (
                                  <div className="p-4 text-center text-muted-foreground">No users found</div>
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Type your message here" 
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={sendMessageMutation.isPending}
                      >
                        {sendMessageMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Send Message
                      </Button>
                    </form>
                  </Form>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Conversations List */}
          <div className="w-full md:w-1/3 lg:w-1/4 border-r flex flex-col overflow-hidden">
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search conversations" 
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversationsLoading ? (
                <div className="p-4 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  <p className="text-sm text-muted-foreground mt-2">Loading conversations...</p>
                </div>
              ) : filteredConversations && filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <div 
                    key={conversation.contactId}
                    onClick={() => setActiveContactId(conversation.contactId)}
                    className={cn(
                      "p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors",
                      activeContactId === conversation.contactId ? "bg-muted" : ""
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {getContactName(conversation.contact)}
                            <span className="ml-2 text-xs text-muted-foreground">
                              ({conversation.contact?.role || 'user'})
                            </span>
                          </h3>
                          <p className="text-sm text-muted-foreground truncate max-w-[160px]">
                            {conversation.lastMessage.sender_id === user?.id ? 'You: ' : ''}
                            {conversation.lastMessage.content}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-muted-foreground">
                          {formatMessageTime(conversation.lastMessage.created_at)}
                        </span>
                        {conversation.unreadCount > 0 && (
                          <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center mt-1">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center">
                  <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <h3 className="font-medium mb-1">No conversations yet</h3>
                  <p className="text-sm text-muted-foreground">
                    {search ? "No results found" : "Start a new conversation to begin messaging"}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Messages Area */}
          <div className="hidden md:flex md:w-2/3 lg:w-3/4 flex-col">
            {activeContactId ? (
              <>
                {/* Conversation Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      {conversations?.find(c => c.contactId === activeContactId)?.contact && (
                        <h2 className="font-medium">
                          {getContactName(conversations.find(c => c.contactId === activeContactId)?.contact)}
                        </h2>
                      )}
                      {conversations?.find(c => c.contactId === activeContactId)?.contact?.role && (
                        <p className="text-sm text-muted-foreground">
                          {conversations.find(c => c.contactId === activeContactId)?.contact.role}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messagesLoading ? (
                    <div className="text-center py-10">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                      <p className="text-sm text-muted-foreground mt-2">Loading messages...</p>
                    </div>
                  ) : activeConversation && activeConversation.length > 0 ? (
                    activeConversation.map((message) => (
                      <div key={message.id} className={cn(
                        "flex",
                        message.sender_id === user?.id ? "justify-end" : "justify-start"
                      )}>
                        <div className={cn(
                          "max-w-[70%] rounded-lg p-3",
                          message.sender_id === user?.id 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted"
                        )}>
                          <p>{message.content}</p>
                          <div className={cn(
                            "text-xs mt-1 flex items-center gap-1",
                            message.sender_id === user?.id 
                              ? "text-primary-foreground/70 justify-end" 
                              : "text-muted-foreground"
                          )}>
                            {formatMessageTime(message.created_at)}
                            {message.sender_id === user?.id && (
                              <CheckCheck className="h-3 w-3" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <h3 className="font-medium mb-1">No messages yet</h3>
                      <p className="text-sm text-muted-foreground">
                        Send a message to start the conversation
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Type a message..." 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendActiveMessage();
                        }
                      }}
                    />
                    <Button 
                      onClick={sendActiveMessage}
                      disabled={!newMessage.trim() || sendMessageMutation.isPending}
                    >
                      {sendMessageMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <Card className="w-[80%] max-w-md">
                  <CardHeader>
                    <CardTitle>Welcome to Messages</CardTitle>
                    <CardDescription>
                      Select a conversation or start a new one
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      This is where you can communicate with students and teachers
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={() => setIsSheetOpen(true)}
                    >
                      Start New Conversation
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
