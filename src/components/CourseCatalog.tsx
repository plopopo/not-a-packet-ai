
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, Users, Star, Search, Filter, Play, CheckCircle, Award, TrendingUp } from "lucide-react";

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  students: number;
  price: number;
  category: string;
  progress?: number;
}

const CourseCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const courses: Course[] = [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      description: "Learn the fundamentals of ML algorithms and their applications",
      instructor: "Dr. Sarah Johnson",
      duration: "8 weeks",
      level: "Beginner",
      rating: 4.8,
      students: 15420,
      price: 99,
      category: "Technology",
      progress: 65
    },
    {
      id: 2,
      title: "Advanced Calculus",
      description: "Master differential and integral calculus with real-world applications",
      instructor: "Prof. Michael Chen",
      duration: "12 weeks",
      level: "Advanced",
      rating: 4.9,
      students: 8930,
      price: 149,
      category: "Mathematics"
    },
    {
      id: 3,
      title: "Creative Writing Workshop",
      description: "Develop your storytelling skills and creative voice",
      instructor: "Emma Thompson",
      duration: "6 weeks",
      level: "Intermediate",
      rating: 4.7,
      students: 5670,
      price: 79,
      category: "Arts",
      progress: 30
    },
    {
      id: 4,
      title: "Organic Chemistry Fundamentals",
      description: "Understand molecular structures and chemical reactions",
      instructor: "Dr. Robert Martinez",
      duration: "10 weeks",
      level: "Intermediate",
      rating: 4.6,
      students: 12340,
      price: 129,
      category: "Science"
    },
    {
      id: 5,
      title: "World History: Ancient Civilizations",
      description: "Explore the rise and fall of ancient empires and cultures",
      instructor: "Prof. Lisa Anderson",
      duration: "8 weeks",
      level: "Beginner",
      rating: 4.8,
      students: 9870,
      price: 89,
      category: "History"
    },
    {
      id: 6,
      title: "Data Structures & Algorithms",
      description: "Master fundamental programming concepts and problem-solving",
      instructor: "Alex Rodriguez",
      duration: "14 weeks",
      level: "Intermediate",
      rating: 4.9,
      students: 18560,
      price: 159,
      category: "Technology",
      progress: 85
    }
  ];

  const categories = ["All", "Technology", "Mathematics", "Science", "Arts", "History"];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const enrolledCourses = courses.filter(course => course.progress !== undefined);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Course Catalog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover expert-led courses across various subjects and accelerate your learning journey
          </p>
        </div>

        <Tabs defaultValue="browse" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse">Browse Courses</TabsTrigger>
            <TabsTrigger value="enrolled">My Courses</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-8">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTem(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className="text-sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <Badge variant="secondary">{course.level}</Badge>
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {course.instructor}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {course.duration}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {course.students.toLocaleString()} students
                        </div>
                        <div className="font-semibold text-lg text-blue-600">
                          ${course.price}
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Play className="w-4 h-4 mr-2" />
                        Enroll Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="enrolled" className="space-y-8">
            <div className="grid gap-6">
              {enrolledCourses.length > 0 ? (
                enrolledCourses.map((course) => (
                  <Card key={course.id} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{course.title}</CardTitle>
                          <CardDescription className="mt-2">
                            Instructor: {course.instructor}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">{course.level}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-gray-600">{course.progress}% complete</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {course.duration}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {course.students.toLocaleString()} students
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View Certificate
                            </Button>
                            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                              Continue Learning
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Enrolled Courses</h3>
                    <p className="text-gray-600 mb-6">
                      Start your learning journey by enrolling in a course from our catalog
                    </p>
                    <Button 
                      onClick={() => {
                        const browseTrigger = document.querySelector('[data-state="inactive"]') as HTMLElement;
                        browseTrigger?.click();
                      }}
                      className="bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                      Browse Courses
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Learning Stats */}
            {enrolledCourses.length > 0 && (
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg text-center">
                  <CardContent className="pt-6">
                    <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold">
                      {enrolledCourses.filter(c => (c.progress || 0) > 90).length}
                    </h3>
                    <p className="text-gray-600">Courses Completed</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg text-center">
                  <CardContent className="pt-6">
                    <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold">
                      {Math.round(enrolledCourses.reduce((acc, course) => acc + (course.progress || 0), 0) / enrolledCourses.length)}%
                    </h3>
                    <p className="text-gray-600">Average Progress</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg text-center">
                  <CardContent className="pt-6">
                    <CheckCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold">{enrolledCourses.length}</h3>
                    <p className="text-gray-600">Active Courses</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CourseCatalog;
