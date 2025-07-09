
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, Users, Star, Search, Filter, Play, CheckCircle, Award, Lightbulb } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  rating: number;
  students: number;
  lessons: number;
  price: string;
  thumbnail: string;
  skills: string[];
  progress?: number;
}

const CourseCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const courses: Course[] = [
    {
      id: "1",
      title: "Complete Calculus Mastery",
      description: "Master calculus from basic limits to advanced integration techniques. Perfect for high school and college students.",
      instructor: "Dr. Sarah Johnson",
      duration: "12 weeks",
      level: "Intermediate",
      category: "Mathematics",
      rating: 4.8,
      students: 15420,
      lessons: 48,
      price: "Free",
      thumbnail: "🧮",
      skills: ["Limits", "Derivatives", "Integrals", "Applications"],
      progress: 65
    },
    {
      id: "2",
      title: "Biology Fundamentals",
      description: "Explore the building blocks of life, from cells to ecosystems. Interactive labs and real-world examples included.",
      instructor: "Prof. Michael Chen",
      duration: "10 weeks",
      level: "Beginner",
      category: "Science",
      rating: 4.7,
      students: 12350,
      lessons: 35,
      price: "Free",
      thumbnail: "🧬",
      skills: ["Cell Biology", "Genetics", "Evolution", "Ecology"]
    },
    {
      id: "3",
      title: "World History: Ancient Civilizations",
      description: "Journey through ancient Egypt, Greece, Rome, and more. Discover how past civilizations shape our modern world.",
      instructor: "Dr. Emily Rodriguez",
      duration: "8 weeks",
      level: "Beginner",
      category: "History",
      rating: 4.9,
      students: 8920,
      lessons: 24,
      price: "Free",
      thumbnail: "🏛️",
      skills: ["Ancient Egypt", "Greek Empire", "Roman History", "Timeline Analysis"]
    },
    {
      id: "4",
      title: "Creative Writing Workshop",
      description: "Develop your storytelling skills with practical exercises, peer feedback, and professional guidance.",
      instructor: "Jane Smith",
      duration: "6 weeks",
      level: "Intermediate",
      category: "English",
      rating: 4.6,
      students: 5670,
      lessons: 18,
      price: "Free",
      thumbnail: "✍️",
      skills: ["Creative Writing", "Character Development", "Plot Structure", "Editing"]
    },
    {
      id: "5",
      title: "Chemistry Lab Techniques",
      description: "Learn essential laboratory skills and safety procedures. Virtual experiments with real-world applications.",
      instructor: "Dr. Robert Kim",
      duration: "14 weeks",
      level: "Advanced",
      category: "Science",
      rating: 4.8,
      students: 4230,
      lessons: 42,
      price: "Free",
      thumbnail: "⚗️",
      skills: ["Lab Safety", "Titration", "Spectroscopy", "Data Analysis"]
    },
    {
      id: "6",
      title: "Statistics for Everyone",
      description: "Make sense of data with practical statistics. From basic concepts to hypothesis testing and beyond.",
      instructor: "Prof. Lisa Wang",
      duration: "9 weeks",
      level: "Beginner",
      category: "Mathematics",
      rating: 4.7,
      students: 9840,
      lessons: 27,
      price: "Free",
      thumbnail: "📊",
      skills: ["Descriptive Statistics", "Probability", "Hypothesis Testing", "Data Visualization"]
    }
  ];

  const categories = ["all", "Mathematics", "Science", "History", "English"];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const enrolledCourses = courses.filter(course => course.progress !== undefined);
  const availableCourses = courses.filter(course => course.progress === undefined);

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Course Catalog
          </h1>
          <p className="text-xl text-gray-600">Discover structured learning paths to master any subject</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses, skills, or topics..."
              className="pl-10 bg-white/80 backdrop-blur-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}
              >
                {category === "all" ? "All Categories" : category}
              </Button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="browse">Browse Courses</TabsTrigger>
            <TabsTrigger value="enrolled">My Courses ({enrolledCourses.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="text-4xl mb-3">{course.thumbnail}</div>
                      <Badge variant={course.level === "Beginner" ? "default" : course.level === "Intermediate" ? "secondary" : "destructive"}>
                        {course.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      by {course.instructor}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-700 leading-relaxed">{course.description}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {course.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {course.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{course.skills.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.lessons} lessons</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-lg font-bold text-green-600">{course.price}</div>
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Play className="w-4 h-4 mr-2" />
                        Start Course
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="enrolled" className="space-y-6">
            {enrolledCourses.length === 0 ? (
              <Card className="text-center py-12 bg-white/80 backdrop-blur-sm">
                <CardContent>
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">No Enrolled Courses</h3>
                  <p className="text-gray-600 mb-4">Start your learning journey by enrolling in a course!</p>
                  <Button onClick={() => document.querySelector('[value="browse"]')?.click()}>
                    Browse Courses
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourses.map((course) => (
                  <Card key={course.id} className="bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="text-3xl mb-2">{course.thumbnail}</div>
                        <Badge variant="secondary">
                          {course.progress}% Complete
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>by {course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{Math.floor((course.progress! / 100) * course.lessons)} / {course.lessons} lessons</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Continue Learning
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CourseCatalog;
