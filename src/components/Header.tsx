
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, BookOpen, Brain, Home, User, Settings } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header = ({ activeTab, setActiveTab }: HeaderProps) => {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "chat", label: "AI Chat", icon: MessageSquare },
    { id: "tools", label: "Study Tools", icon: Brain },
    { id: "courses", label: "Courses", icon: BookOpen },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StudyAI
              </h1>
              <Badge variant="secondary" className="text-xs">
                Beta
              </Badge>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`${
                  activeTab === item.id 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex space-x-1 overflow-x-auto">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              size="sm"
              className={`${
                activeTab === item.id 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                  : "text-gray-600"
              } whitespace-nowrap`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="w-4 h-4 mr-2" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
