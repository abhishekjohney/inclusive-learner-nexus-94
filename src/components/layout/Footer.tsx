
import React from 'react';
import { Link } from 'react-router-dom';
import { Accessibility, Book, Calendar, User } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border/50 bg-background">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Link to="/" className="flex items-center space-x-2">
              <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                <Book className="size-4" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight">InclusiveLearn</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered inclusive education platform designed to assist specially-abled students in overcoming learning barriers.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Features</h3>
            <ul className="space-y-2">
              {[
                { text: "Speech to Text", href: "/features/speech-to-text" },
                { text: "Text to Speech", href: "/features/text-to-speech" },
                { text: "Sign Language Interpreter", href: "/features/sign-language" },
                { text: "Smart AI Assistant", href: "/features/assistant" },
                { text: "Adaptive Learning", href: "/features/adaptive-learning" },
              ].map((item) => (
                <li key={item.text}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Resources</h3>
            <ul className="space-y-2">
              {[
                { text: "Getting Started", href: "/resources/getting-started" },
                { text: "Documentation", href: "/resources/documentation" },
                { text: "For Teachers", href: "/resources/for-teachers" },
                { text: "For Institutions", href: "/resources/for-institutions" },
                { text: "Accessibility Guide", href: "/resources/accessibility" },
              ].map((item) => (
                <li key={item.text}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Company</h3>
            <ul className="space-y-2">
              {[
                { text: "About Us", href: "/company/about" },
                { text: "Meet the Team", href: "/company/team" },
                { text: "Careers", href: "/company/careers" },
                { text: "Contact", href: "/company/contact" },
                { text: "Privacy Policy", href: "/company/privacy" },
              ].map((item) => (
                <li key={item.text}>
                  <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between mt-12 pt-8 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            © 2023 InclusiveLearn. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link to="/accessibility" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Accessibility className="size-3" />
              <span>Accessibility</span>
            </Link>
            <Link to="/support" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <User className="size-3" />
              <span>Support</span>
            </Link>
            <Link to="/sitemap" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Calendar className="size-3" />
              <span>Sitemap</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
