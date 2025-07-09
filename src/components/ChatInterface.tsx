
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Sparkles, BookOpen, Calculator, FileText, Lightbulb } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI study assistant. I can help you with homework, explain concepts, create study materials, and answer questions across all subjects. What would you like to learn today?",
      role: "assistant",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { label: "Explain a concept", icon: Lightbulb, prompt: "Can you explain " },
    { label: "Help with homework", icon: BookOpen, prompt: "I need help with my homework on " },
    { label: "Solve math problem", icon: Calculator, prompt: "Can you solve this math problem: " },
    { label: "Create study notes", icon: FileText, prompt: "Create study notes for " }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string) => {
    // Simulate AI response based on keywords
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("math") || lowerMessage.includes("calculate") || lowerMessage.includes("solve")) {
      return "I'd be happy to help you with math! Please share the specific problem you're working on, and I'll walk you through the solution step by step. I can help with algebra, calculus, geometry, statistics, and more.";
    }
    
    if (lowerMessage.includes("science") || lowerMessage.includes("chemistry") || lowerMessage.includes("physics") || lowerMessage.includes("biology")) {
      return "Science is fascinating! I can help explain scientific concepts, assist with lab reports, break down complex theories, or help you prepare for science exams. What specific topic would you like to explore?";
    }
    
    if (lowerMessage.includes("history") || lowerMessage.includes("historical")) {
      return "History comes alive when we understand the connections between events and people. I can help you analyze historical periods, understand cause and effect relationships, or prepare for history assignments. What era or topic interests you?";
    }
    
    if (lowerMessage.includes("english") || lowerMessage.includes("writing") || lowerMessage.includes("essay")) {
      return "Writing is a powerful skill! I can help you brainstorm ideas, structure essays, improve your writing style, analyze literature, or prepare for English exams. What type of writing project are you working on?";
    }
    
    if (lowerMessage.includes("study") || lowerMessage.includes("exam") || lowerMessage.includes("test")) {
      return "Great question about studying! I can help you create effective study schedules, develop memory techniques, practice with mock exams, or explain difficult concepts. What subject are you preparing for?";
    }
    
    return `I understand you're asking about "${userMessage}". I'm here to help you learn and understand better! Could you provide a bit more detail about what specific aspect you'd like me to explain or help you with? I can break down complex topics into simpler parts and provide step-by-step explanations.`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: simulateAIResponse(input),
        role: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleQuickAction = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="pt-20 h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="flex-1 overflow-hidden px-6 py-6">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Study Assistant
            </h1>
            <p className="text-gray-600">Ask questions, get explanations, and accelerate your learning</p>
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Quick Start</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 border-blue-200"
                    onClick={() => handleQuickAction(action.prompt)}
                  >
                    <action.icon className="w-6 h-6 text-blue-600" />
                    <span className="text-sm text-center">{action.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto mb-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"} items-start space-x-3`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === "user" 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600" 
                      : "bg-gradient-to-r from-green-500 to-blue-500"
                  }`}>
                    {message.role === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <Card className={`${
                    message.role === "user" 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                      : "bg-white border-gray-200"
                  }`}>
                    <CardContent className="p-4">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.role === "user" ? "text-blue-100" : "text-gray-500"
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <Card className="bg-white border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
                        <p className="text-sm text-gray-600">AI is thinking...</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex space-x-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about your studies..."
                className="flex-1 border-0 focus-visible:ring-0 text-base"
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
              <span>Press Enter to send</span>
              <Badge variant="secondary" className="text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
