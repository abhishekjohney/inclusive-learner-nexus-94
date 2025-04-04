
import React, { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendHorizonal, Paperclip, Mic, MicOff, Translate } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Messages = () => {
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [useSignLanguage, setUseSignLanguage] = useState(false);
  const [conversations, setConversations] = useState([
    {
      id: '1',
      name: 'Dr. Sarah Williams',
      role: 'Teacher',
      avatar: '',
      lastMessage: 'Hello! How can I help you today?',
      unread: 0,
      active: true,
    },
    {
      id: '2',
      name: 'Mr. James Peterson',
      role: 'Teacher',
      avatar: '',
      lastMessage: 'Your assignment has been graded.',
      unread: 2,
      active: false,
    },
    {
      id: '3',
      name: 'Ms. Emily Chen',
      role: 'Teacher',
      avatar: '',
      lastMessage: 'Don\'t forget about tomorrow\'s quiz!',
      unread: 1,
      active: false,
    }
  ]);
  
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'teacher',
      content: 'Hello! How can I help you today?',
      time: '10:00 AM',
    },
    {
      id: '2',
      sender: 'student',
      content: 'Hi Dr. Williams! I had a question about today\'s lecture.',
      time: '10:05 AM',
    },
    {
      id: '3',
      sender: 'teacher',
      content: 'Of course! What would you like me to clarify?',
      time: '10:07 AM',
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // For auto-scrolling when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add new message
    const newMessage = {
      id: Date.now().toString(),
      sender: 'student',
      content: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    setInputValue('');
    
    // Simulate teacher's response after a delay
    setTimeout(() => {
      const teacherResponse = {
        id: Date.now().toString(),
        sender: 'teacher',
        content: 'I understand your question. Let me explain that concept in more detail.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages(prevMessages => [...prevMessages, teacherResponse]);
    }, 3000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage();
    }
  };
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      toast({
        title: "Voice recording started",
        description: "Recording your message...",
      });
    } else {
      toast({
        title: "Voice recording stopped",
        description: "Message ready to send",
      });
      setInputValue("Voice message recorded and ready to send");
    }
  };
  
  const toggleSignLanguage = () => {
    setUseSignLanguage(!useSignLanguage);
    
    toast({
      title: useSignLanguage ? "Sign language mode off" : "Sign language mode on",
      description: useSignLanguage 
        ? "Regular text input mode activated" 
        : "Sign language translation mode activated",
    });
  };
  
  const handleConversationClick = (id: string) => {
    setConversations(prevConversations => 
      prevConversations.map(conv => ({
        ...conv,
        active: conv.id === id,
        unread: conv.id === id ? 0 : conv.unread,
      }))
    );
  };
  
  const userRole = localStorage.getItem('userRole');
  const isTeacher = userRole === 'teacher';

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-10rem)]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full">
          {/* Conversations sidebar */}
          <div className="md:col-span-1 border rounded-lg overflow-hidden flex flex-col bg-white dark:bg-gray-900">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-lg">Messages</h2>
              <p className="text-xs text-muted-foreground">
                {isTeacher ? "Connect with your students" : "Connect with your teachers"}
              </p>
            </div>
            
            <ScrollArea className="flex-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 border-b cursor-pointer hover:bg-muted/50 transition flex items-center gap-3 ${
                    conversation.active ? "bg-muted" : ""
                  }`}
                  onClick={() => handleConversationClick(conversation.id)}
                >
                  <Avatar>
                    <AvatarImage src={conversation.avatar} alt={conversation.name} />
                    <AvatarFallback className="bg-primary">
                      {conversation.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{conversation.name}</p>
                      {conversation.unread > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
          
          {/* Message area */}
          <div className="md:col-span-3 border rounded-lg overflow-hidden flex flex-col bg-white dark:bg-gray-900">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="" alt={conversations.find(c => c.active)?.name} />
                  <AvatarFallback className="bg-primary">
                    {conversations.find(c => c.active)?.name.charAt(0) || '?'}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h2 className="font-semibold">{conversations.find(c => c.active)?.name}</h2>
                  <p className="text-xs text-muted-foreground">{conversations.find(c => c.active)?.role}</p>
                </div>
              </div>
              
              {!isTeacher && (
                <Button
                  variant="outline"
                  size="sm"
                  className={useSignLanguage ? "bg-primary/10 text-primary" : ""}
                  onClick={toggleSignLanguage}
                >
                  <Translate className="h-4 w-4 mr-1" />
                  {useSignLanguage ? "Sign Language: ON" : "Sign Language"}
                </Button>
              )}
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'student' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'student'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs opacity-70 mt-1 text-right">{message.time}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" title="Attach file" aria-label="Attach file">
                  <Paperclip className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant={isRecording ? "destructive" : "outline"} 
                  size="icon" 
                  onClick={toggleRecording}
                  aria-label={isRecording ? "Stop recording" : "Start recording"}
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={useSignLanguage ? "Sign language input active..." : "Type your message..."}
                  disabled={useSignLanguage && !inputValue}
                  className="flex-1"
                />
                
                <Button 
                  disabled={!inputValue.trim()} 
                  onClick={handleSendMessage}
                  aria-label="Send message"
                >
                  <SendHorizonal className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
              
              {useSignLanguage && (
                <div className="mt-2 p-2 bg-muted rounded text-center text-sm">
                  {inputValue ? (
                    <p>Sign language detected: "{inputValue}"</p>
                  ) : (
                    <p>Sign language detection active - perform signs to begin</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
