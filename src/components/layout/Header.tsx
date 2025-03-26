
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Book, MicOff, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const HeaderLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuLink>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuLink>
>(({ className, ...props }, ref) => (
  <NavigationMenuLink
    ref={ref}
    className={cn(
      navigationMenuTriggerStyle(),
      "px-4 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
      className
    )}
    {...props}
  />
));
HeaderLink.displayName = "HeaderLink";

const Header = () => {
  const [isAccessibilityMenuOpen, setIsAccessibilityMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
            <Book className="size-4" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">InclusiveLearn</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <HeaderLink>Home</HeaderLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link to="/features" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/5 p-6 no-underline outline-none focus:shadow-md">
                          <div className="mb-2 mt-4 text-lg font-medium">
                            AI-Powered Learning
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Experience personalized education through our advanced AI systems designed for accessibility
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {[
                      { title: "Speech to Text", to: "/features/speech-to-text", description: "Real-time captions for hearing-impaired students" },
                      { title: "Text to Speech", to: "/features/text-to-speech", description: "Audio content for visually impaired students" },
                      { title: "Sign Language", to: "/features/sign-language", description: "AI-powered sign language interpretation" },
                      { title: "Smart Assistant", to: "/features/assistant", description: "24/7 learning support with voice recognition" },
                    ].map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link to={item.to} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/courses">
                  <HeaderLink>Courses</HeaderLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/dashboard">
                  <HeaderLink>Dashboard</HeaderLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="relative" 
              onClick={() => setIsAccessibilityMenuOpen(!isAccessibilityMenuOpen)}
              aria-label="Accessibility options"
            >
              <Settings className="size-4" />
            </Button>
            {isAccessibilityMenuOpen && (
              <div className="absolute right-16 top-14 w-64 p-4 rounded-lg glass-card shadow-lg animate-fade-in">
                <h3 className="font-semibold mb-2">Accessibility Options</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">High Contrast</span>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Screen Reader</span>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Text Size</span>
                    <div className="flex gap-1">
                      <Button variant="outline" size="icon" className="h-6 w-6">-</Button>
                      <Button variant="outline" size="icon" className="h-6 w-6">+</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <Button variant="ghost" size="icon" aria-label="Mute">
              <MicOff className="size-4" />
            </Button>
            <Button variant="ghost" className="gap-2" asChild>
              <Link to="/login">
                <User className="size-4" />
                <span className="hidden md:inline">Login</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
