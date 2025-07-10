import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, GraduationCap, Search } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    description: "A comprehensive introduction to the fundamental concepts of computer science.",
    category: "Technology",
    level: "Beginner",
    instructor: "Dr. Smith",
    duration: "12 weeks",
    lessons: 24,
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 2,
    title: "Advanced Mathematics",
    description: "Explore advanced mathematical concepts and problem-solving techniques.",
    category: "Mathematics",
    level: "Advanced",
    instructor: "Prof. Johnson",
    duration: "10 weeks",
    lessons: 20,
    rating: 4.8,
    reviews: 150,
  },
  {
    id: 3,
    title: "History of Art",
    description: "An overview of the major periods and movements in the history of art.",
    category: "Humanities",
    level: "Intermediate",
    instructor: "Ms. Williams",
    duration: "8 weeks",
    lessons: 16,
    rating: 4.2,
    reviews: 90,
  },
  {
    id: 4,
    title: "Data Science Fundamentals",
    description: "Learn the basics of data science, including data analysis, visualization, and machine learning.",
    category: "Technology",
    level: "Beginner",
    instructor: "Mr. Brown",
    duration: "14 weeks",
    lessons: 28,
    rating: 4.7,
    reviews: 180,
  },
  {
    id: 5,
    title: "Organic Chemistry",
    description: "A detailed study of organic compounds, reactions, and mechanisms.",
    category: "Science",
    level: "Advanced",
    instructor: "Dr. Davis",
    duration: "12 weeks",
    lessons: 24,
    rating: 4.9,
    reviews: 200,
  },
  {
    id: 6,
    title: "Creative Writing",
    description: "Develop your creative writing skills through exercises and workshops.",
    category: "Humanities",
    level: "Intermediate",
    instructor: "Mrs. Wilson",
    duration: "10 weeks",
    lessons: 20,
    rating: 4.4,
    reviews: 110,
  },
];

const categories = ["Technology", "Mathematics", "Humanities", "Science"];

const CourseCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Course Catalog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our wide range of courses and start your learning journey today
          </p>
        </div>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1">
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/70 backdrop-blur-sm border-0 shadow-md"
            />
          </div>
          <div className="md:col-span-1">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-white/70 backdrop-blur-sm border-0 shadow-md">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-1">
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="bg-white/70 backdrop-blur-sm border-0 shadow-md">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  {course.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4">
                  {course.description}
                </CardDescription>
                <div className="flex items-center space-x-2 mb-3">
                  <Badge variant="secondary">{course.category}</Badge>
                  <Badge variant="outline">{course.level}</Badge>
                </div>
                <div className="text-sm text-gray-500">
                  Instructor: {course.instructor}
                </div>
                <div className="text-sm text-gray-500">
                  Duration: {course.duration}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCatalog;
