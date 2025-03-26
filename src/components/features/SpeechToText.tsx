
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MicOff, Mic, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();
  
  // Simulated speech recognition functionality
  const toggleListening = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      // Simulate speech recognition starting
      toast({
        title: "Speech recognition started",
        description: "Speak clearly into your microphone",
      });
      
      // Simulate transcript coming in over time
      const sentences = [
        "Welcome to the inclusive learning platform. ",
        "Our AI-powered tools are designed to assist students with different abilities. ",
        "The speech-to-text feature provides real-time captions for hearing-impaired students."
      ];
      
      let fullText = "";
      let sentenceIndex = 0;
      
      const transcriptInterval = setInterval(() => {
        if (sentenceIndex < sentences.length) {
          fullText += sentences[sentenceIndex];
          setTranscript(fullText);
          sentenceIndex++;
        } else {
          clearInterval(transcriptInterval);
          setIsListening(false);
          toast({
            title: "Speech recognition ended",
            description: "Transcript is ready",
          });
        }
      }, 3000);
      
      return () => clearInterval(transcriptInterval);
    } else {
      // Simulate speech recognition stopping
      toast({
        title: "Speech recognition stopped",
        description: "Transcript saved",
      });
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcript);
    setIsCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Transcript has been copied to your clipboard",
    });
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  
  const clearTranscript = () => {
    setTranscript("");
    toast({
      title: "Transcript cleared",
      description: "Your transcript has been cleared",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl">Speech-to-Text Converter</CardTitle>
          <CardDescription>
            Real-time transcription for lectures, discussions, and educational content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative min-h-[200px] p-4 rounded-md border border-border/50 bg-muted/30">
            {transcript ? (
              <p className="text-foreground">{transcript}</p>
            ) : (
              <p className="text-muted-foreground italic">
                Click the microphone button to start speech recognition...
              </p>
            )}
            {isListening && (
              <div className="absolute bottom-4 right-4 flex items-center gap-2 text-primary animate-pulse">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/80 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                <span className="text-sm">Listening...</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button 
                onClick={toggleListening} 
                variant={isListening ? "destructive" : "default"}
                size="icon"
                className="rounded-full h-12 w-12 shadow-md"
                aria-label={isListening ? "Stop listening" : "Start listening"}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              <span className="text-sm text-muted-foreground">
                {isListening ? "Tap to stop" : "Tap to speak"}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                onClick={clearTranscript} 
                variant="outline" 
                size="sm"
                disabled={!transcript}
                aria-label="Clear transcript"
              >
                Clear
              </Button>
              <Button 
                onClick={copyToClipboard} 
                variant="outline" 
                size="sm"
                disabled={!transcript}
                className="flex items-center gap-1"
                aria-label="Copy to clipboard"
              >
                {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {isCopied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Advanced Speech Recognition</h4>
                  <p className="text-sm text-muted-foreground">Our AI uses natural language processing to understand speech with high accuracy.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Real-time Transcription</h4>
                  <p className="text-sm text-muted-foreground">Words appear on screen as they're spoken, with minimal delay for classroom use.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Multi-language Support</h4>
                  <p className="text-sm text-muted-foreground">Recognize and transcribe multiple languages for diverse classroom environments.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Benefits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
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
                  className="w-5 h-5 text-primary"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Equal access to classroom discussions</span>
              </div>
              
              <div className="flex items-center gap-2">
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
                  className="w-5 h-5 text-primary"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Searchable lecture transcripts for later review</span>
              </div>
              
              <div className="flex items-center gap-2">
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
                  className="w-5 h-5 text-primary"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Improved focus and comprehension</span>
              </div>
              
              <div className="flex items-center gap-2">
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
                  className="w-5 h-5 text-primary"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Noise filtering for clear transcription</span>
              </div>
              
              <div className="flex items-center gap-2">
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
                  className="w-5 h-5 text-primary"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Integration with other learning tools</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpeechToText;
