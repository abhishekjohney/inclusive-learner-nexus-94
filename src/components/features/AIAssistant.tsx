
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, MicOff, Send, User, Book, Calendar, Search, User2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI learning assistant. How can I help you today?',
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can help you with that! Let me find some resources for you.",
        "Great question! Here's what I found on that topic.",
        "I understand you're asking about this concept. Let me explain it in a different way.",
        "Would you like me to create a study plan for this topic?",
        "Based on your learning style, here's an approach that might work well for you."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const newAssistantMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, newAssistantMessage]);
    }, 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const toggleListening = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      toast({
        title: "Voice recognition activated",
        description: "Speak your question clearly",
      });
      
      // Simulate voice recognition
      setTimeout(() => {
        setInputValue("Can you help me understand photosynthesis?");
        
        setTimeout(() => {
          setIsListening(false);
          
          toast({
            title: "Voice input received",
            description: "You can send your message now",
          });
        }, 1000);
      }, 2000);
    } else {
      toast({
        title: "Voice recognition stopped",
        description: "Voice input cancelled",
      });
      
      setInputValue("");
    }
  };
  
  const suggestionTopics = [
    { icon: Book, text: "Explain difficult concept" },
    { icon: Calendar, text: "Create study plan" },
    { icon: Search, text: "Find learning resources" },
    { icon: User2, text: "Accessibility help" },
  ];

  return (
    <div className="space-y-6">
      <Card className="glass-card overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl">Smart AI Assistant</CardTitle>
          <CardDescription>
            24/7 learning support with voice recognition for all students
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col h-[500px]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'assistant' && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt="AI" />
                      <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/50'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  
                  {message.sender === 'user' && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt="User" />
                      <AvatarFallback className="bg-muted-foreground/20">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="border-t border-border/50 p-4 bg-background/80">
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {suggestionTopics.map((topic, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1 whitespace-nowrap"
                      onClick={() => setInputValue(`Help me ${topic.text.toLowerCase()}`)}
                    >
                      <topic.icon className="h-3 w-3" />
                      <span>{topic.text}</span>
                    </Button>
                  ))}
                </div>
                
                <div className="flex gap-2 items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleListening}
                    className={`rounded-full ${isListening ? 'bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive' : ''}`}
                    aria-label={isListening ? "Stop voice input" : "Start voice input"}
                  >
                    {isListening ? (
                      <MicOff className="h-4 w-4" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </Button>
                  
                  <Input
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your question here..."
                    className="flex-1"
                    aria-label="Message input"
                  />
                  
                  <Button
                    onClick={handleSendMessage}
                    disabled={inputValue.trim() === ''}
                    size="icon"
                    className="rounded-full"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Features & Capabilities</CardTitle>
            <CardDescription>How our AI assistant enhances the learning experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-primary"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">24/7 Learning Support</h3>
                  <p className="text-sm text-muted-foreground">Always available to answer questions and provide assistance, regardless of time or location.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-primary"
                  >
                    <path d="M19 11a7 7 0 0 1-7 7m0 0a7 7 0 0 1-7-7m7 7v4m0-11V3"></path>
                    <path d="M15 5h-2a2 2 0 0 0-2 2v12"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Personalized Explanations</h3>
                  <p className="text-sm text-muted-foreground">Adapts explanations based on the student's learning style and previous interactions.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-primary"
                  >
                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0"></path>
                    <circle cx="12" cy="8" r="1"></circle>
                    <path d="M12 12v4"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Multi-format Responses</h3>
                  <p className="text-sm text-muted-foreground">Provides information in text, audio, or visual formats based on accessibility needs.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Voice Recognition</CardTitle>
            <CardDescription>Supporting students with mobility impairments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Our advanced voice recognition system enables students with mobility impairments to interact with the platform hands-free, allowing for:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-sm">Natural conversation flow</span>
                </div>
                
                <div className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-sm">Platform navigation</span>
                </div>
                
                <div className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-sm">Question asking</span>
                </div>
                
                <div className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-sm">Content creation</span>
                </div>
                
                <div className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-sm">Document editing</span>
                </div>
                
                <div className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-sm">Multiple languages</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/20 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              Our voice recognition technology achieves 95%+ accuracy and continues to improve through machine learning.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AIAssistant;
