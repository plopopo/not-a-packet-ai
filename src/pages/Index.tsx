
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, MessageSquare, Brain, Target, Users, Star, PlayCircle, Clock, Award } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import StudyTools from "@/components/StudyTools";
import CourseCatalog from "@/components/CourseCatalog";
import Header from "@/components/Header";

const Index = () => {
  const [activeTab, setActiveTab] = useState("chat");

  const features = [
    {
      icon: MessageSquare,
      title: "AI Study Assistant",
      description: "Get instant help with homework, explanations, and study guidance powered by advanced AI"
    },
    {
      icon: Brain,
      title: "Smart Flashcards",
      description: "Generate and review flashcards with spaced repetition for optimal learning"
    },
    {
      icon: Target,
      title: "Practice Quizzes",
      description: "Create custom quizzes and track your progress across different subjects"
    },
    {
      icon: BookOpen,
      title: "Course Library",
      description: "Access structured courses in various subjects with interactive content"
    }
  ];

  const stats = [
    { label: "Active Students", value: "50K+", icon: Users },
    { label: "Courses Available", value: "200+", icon: BookOpen },
    { label: "Study Sessions", value: "1M+", icon: Clock },
    { label: "Success Rate", value: "95%", icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === "home" && (
        <div className="pt-20">
          {/* Hero Section */}
          <section className="px-6 py-20 text-center">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                🚀 AI-Powered Learning Platform
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in">
                Master Any Subject with AI
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in">
                Transform your learning experience with our AI study assistant, interactive tools, and comprehensive courses designed to help you excel in your academic journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
                  onClick={() => setActiveTab("chat")}
                >
                  Start Learning Now
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="px-6 py-16 bg-white/50 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center animate-fade-in">
                    <stat.icon className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="px-6 py-20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 text-gray-900">
                  Everything You Need to Succeed
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our comprehensive platform combines AI technology with proven learning methods to accelerate your academic progress.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-0 bg-white/70 backdrop-blur-sm">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="px-6 py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Learning?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of students who are already achieving better results with our AI-powered study platform.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="px-8 py-3 text-lg"
                onClick={() => setActiveTab("chat")}
              >
                Get Started Free
              </Button>
            </div>
          </section>
        </div>
      )}

      {activeTab === "chat" && <ChatInterface />}
      {activeTab === "tools" && <StudyTools />}
      {activeTab === "courses" && <CourseCatalog />}
    </div>
  );
};

export default Index;
