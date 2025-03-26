
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Pause, Play, Volume2, Settings, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TextToSpeech = () => {
  const [text, setText] = useState("The AI-powered text-to-speech feature converts written content into natural-sounding speech, helping students with visual impairments or reading difficulties access educational materials with ease.");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [voice, setVoice] = useState("en-US-female");
  const [speed, setSpeed] = useState([1]);
  const { toast } = useToast();
  
  const handlePlay = () => {
    if (text.trim() === "") {
      toast({
        title: "No text to read",
        description: "Please enter some text before playing",
        variant: "destructive",
      });
      return;
    }
    
    setIsPlaying(!isPlaying);
    
    if (!isPlaying) {
      toast({
        title: "Started text-to-speech",
        description: "Reading text aloud",
      });
      
      // Simulate stopping after a few seconds
      setTimeout(() => {
        setIsPlaying(false);
        toast({
          title: "Finished reading",
          description: "Text-to-speech completed",
        });
      }, 8000);
    } else {
      toast({
        title: "Paused text-to-speech",
        description: "Reading paused",
      });
    }
  };
  
  const resetSettings = () => {
    setVolume([75]);
    setSpeed([1]);
    setVoice("en-US-female");
    toast({
      title: "Settings reset",
      description: "Voice settings have been reset to defaults",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl">Text-to-Speech Reader</CardTitle>
          <CardDescription>
            Convert written content into natural-sounding speech for visual accessibility
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the text you want to convert to speech..."
            className="min-h-[150px] resize-y"
            aria-label="Text to convert to speech"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <Slider 
                  value={volume} 
                  onValueChange={setVolume} 
                  max={100} 
                  step={1}
                  aria-label="Volume"
                />
                <span className="w-9 text-right text-sm text-muted-foreground">{volume}%</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Settings className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground w-12">Voice:</span>
                <Select value={voice} onValueChange={setVoice}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select voice" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en-US-female">Female (US)</SelectItem>
                    <SelectItem value="en-US-male">Male (US)</SelectItem>
                    <SelectItem value="en-GB-female">Female (UK)</SelectItem>
                    <SelectItem value="en-GB-male">Male (UK)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground w-12">Speed:</span>
                <Slider 
                  value={speed} 
                  onValueChange={setSpeed} 
                  min={0.5} 
                  max={2} 
                  step={0.1}
                  aria-label="Speed"
                />
                <span className="w-9 text-right text-sm text-muted-foreground">{speed}x</span>
              </div>
            </div>
            
            <div className="flex flex-col md:items-center gap-2">
              <Button 
                onClick={handlePlay} 
                variant="default"
                size="lg"
                className={`rounded-full h-14 w-14 shadow-md flex items-center justify-center ${isPlaying ? 'bg-primary/90 hover:bg-primary/80' : ''}`}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              <Button
                onClick={resetSettings}
                variant="ghost"
                size="sm"
                className="text-xs"
                aria-label="Reset settings"
              >
                <RotateCcw className="h-3 w-3 mr-1" /> Reset
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
                  <h4 className="font-medium">Neural Text Processing</h4>
                  <p className="text-sm text-muted-foreground">Our AI analyzes text structure, syntax, and context for natural-sounding speech.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Human-like Voice Generation</h4>
                  <p className="text-sm text-muted-foreground">Advanced neural networks create realistic voices with natural intonation and emphasis.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Customizable Experience</h4>
                  <p className="text-sm text-muted-foreground">Adjust speed, voice type, and volume to match personal preferences and needs.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Features & Benefits</CardTitle>
          </CardHeader>
          <CardContent>
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
                <div>
                  <h4 className="text-sm font-medium">Multiple Languages</h4>
                  <p className="text-xs text-muted-foreground">Support for over 30 languages and dialects</p>
                </div>
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
                <div>
                  <h4 className="text-sm font-medium">Document Support</h4>
                  <p className="text-xs text-muted-foreground">Reads PDFs, docs, and web content</p>
                </div>
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
                <div>
                  <h4 className="text-sm font-medium">Natural Prosody</h4>
                  <p className="text-xs text-muted-foreground">Human-like emphasis and intonation</p>
                </div>
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
                <div>
                  <h4 className="text-sm font-medium">Offline Access</h4>
                  <p className="text-xs text-muted-foreground">Works without internet connection</p>
                </div>
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
                <div>
                  <h4 className="text-sm font-medium">Text Highlighting</h4>
                  <p className="text-xs text-muted-foreground">Follows along with spoken text</p>
                </div>
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
                <div>
                  <h4 className="text-sm font-medium">Audio Export</h4>
                  <p className="text-xs text-muted-foreground">Save as MP3 for later listening</p>
                </div>
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
                <div>
                  <h4 className="text-sm font-medium">Pronunciation Tools</h4>
                  <p className="text-xs text-muted-foreground">Correct technical or specialized terms</p>
                </div>
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
                <div>
                  <h4 className="text-sm font-medium">Seamless Integration</h4>
                  <p className="text-xs text-muted-foreground">Works with all platform features</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TextToSpeech;
