
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "The speech-to-text feature has completely transformed my lecture experience. I can now focus on understanding concepts instead of struggling to hear what's being said.",
    name: "Maya Johnson",
    role: "Student with hearing impairment",
    avatar: "MJ"
  },
  {
    quote: "As a teacher with students who have various accessibility needs, this platform has made it possible to create a truly inclusive classroom where everyone can participate equally.",
    name: "David Chen",
    role: "Special Education Teacher",
    avatar: "DC"
  },
  {
    quote: "The adaptive learning system recognizes my strengths and challenges, creating a personalized path that has boosted my confidence and academic performance.",
    name: "Alex Rivera",
    role: "Student with learning disabilities",
    avatar: "AR"
  },
  {
    quote: "The sign language interpreter is incredibly accurate. It's opened up new possibilities for me to engage with complex educational content without barriers.",
    name: "Sarah Kim",
    role: "Deaf student",
    avatar: "SK"
  },
  {
    quote: "Implementing this platform across our university has significantly improved our inclusivity metrics. The analytics provide valuable insights for policy improvements.",
    name: "Dr. James Wilson",
    role: "University Accessibility Director",
    avatar: "JW"
  },
  {
    quote: "The voice-controlled navigation has been life-changing for me. I can now navigate educational resources independently despite my mobility challenges.",
    name: "Olivia Thompson",
    role: "Student with mobility impairment",
    avatar: "OT"
  }
];

const Testimonials = () => {
  return (
    <section className="w-full py-12 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Success Stories
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-display">
              Transforming Education Experiences
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from students and educators who have experienced the impact of our inclusive learning platform.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glass-card overflow-hidden card-hover transform transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${testimonial.name}`} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
