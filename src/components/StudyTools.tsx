import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Plus, RotateCcw, CheckCircle, AlertCircle, Clock, Target, BookOpen, Lightbulb } from "lucide-react";

interface Flashcard {
  front: string;
  back: string;
  difficulty: "easy" | "medium" | "hard";
}

const StudyTools = () => {
  const [activeFlashcard, setActiveFlashcard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [newCard, setNewCard] = useState<Flashcard>({ front: "", back: "", difficulty: "medium" });
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    { front: "What is photosynthesis?", back: "The process by which plants convert light energy into chemical energy", difficulty: "medium" },
    { front: "Define Newton's First Law", back: "An object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an external force", difficulty: "easy" },
    { front: "What is the derivative of x²?", back: "2x", difficulty: "hard" }
  ]);

  const [quizQuestions, setQuizQuestions] = useState([
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correctAnswer: "Mars",
    },
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const submitAnswer = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setQuizCompleted(false);
    setScore(0);
  };

  const addFlashcard = () => {
    if (newCard.front && newCard.back) {
      setFlashcards([...flashcards, newCard]);
      setNewCard({ front: "", back: "", difficulty: "medium" });
    }
  };

  const nextCard = () => {
    setActiveFlashcard((prev) => (prev + 1) % flashcards.length);
    setShowAnswer(false);
  };

  const prevCard = () => {
    setActiveFlashcard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setShowAnswer(false);
  };

  const resetFlashcards = () => {
    setActiveFlashcard(0);
    setShowAnswer(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Study Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enhance your learning with AI-powered flashcards, practice quizzes, and study planners
          </p>
        </div>

        <Tabs defaultValue="flashcards" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="flashcards">Smart Flashcards</TabsTrigger>
            <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
            <TabsTrigger value="planner">Study Planner</TabsTrigger>
          </TabsList>

          <TabsContent value="flashcards" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Flashcard Display */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{activeFlashcard + 1} of {flashcards.length}</Badge>
                    <Badge className={`${
                      flashcards[activeFlashcard]?.difficulty === 'easy' ? 'bg-green-500' :
                      flashcards[activeFlashcard]?.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                    } text-white`}>
                      {flashcards[activeFlashcard]?.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="min-h-[300px] flex flex-col justify-center">
                  <div className="text-center p-8">
                    <h3 className="text-xl font-semibold mb-6">
                      {showAnswer ? "Answer:" : "Question:"}
                    </h3>
                    <p className="text-lg leading-relaxed">
                      {showAnswer ? flashcards[activeFlashcard]?.back : flashcards[activeFlashcard]?.front}
                    </p>
                  </div>
                  <div className="flex justify-center space-x-4 mt-8">
                    <Button variant="outline" onClick={prevCard}>Previous</Button>
                    <Button onClick={() => setShowAnswer(!showAnswer)}>
                      {showAnswer ? "Show Question" : "Show Answer"}
                    </Button>
                    <Button variant="outline" onClick={nextCard}>Next</Button>
                  </div>
                  <div className="text-center mt-4">
                    <Button variant="ghost" size="sm" onClick={resetFlashcards}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Add New Flashcard */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Flashcard
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Question (Front)</label>
                    <Textarea
                      placeholder="Enter your question..."
                      value={newCard.front}
                      onChange={(e) => setNewCard(prev => ({ ...prev, front: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Answer (Back)</label>
                    <Textarea
                      placeholder="Enter the answer..."
                      value={newCard.back}
                      onChange={(e) => setNewCard(prev => ({ ...prev, back: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Difficulty</label>
                    <Select 
                      value={newCard.difficulty} 
                      onValueChange={(value: "easy" | "medium" | "hard") => 
                        setNewCard(prev => ({ ...prev, difficulty: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={addFlashcard} className="w-full">
                    Add Flashcard
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Quiz Tab */}
          <TabsContent value="quiz">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center">
                  <Brain className="w-6 h-6 mr-2" />
                  Practice Quiz
                </CardTitle>
                <CardDescription>Test your knowledge with AI-generated questions</CardDescription>
              </CardHeader>
              <CardContent className="py-12">
                {quizCompleted ? (
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-4">Quiz Completed!</h3>
                    <p className="text-gray-600 mb-4">
                      Your Score: {score} / {quizQuestions.length}
                    </p>
                    <Button onClick={resetQuiz}>Restart Quiz</Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="mb-4">
                      <p className="text-xl font-semibold mb-2">
                        Question {currentQuestion + 1} of {quizQuestions.length}
                      </p>
                      <p className="text-gray-700">{quizQuestions[currentQuestion].question}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {quizQuestions[currentQuestion].options.map((option, index) => (
                        <Button
                          key={index}
                          variant={selectedAnswer === option ? "default" : "outline"}
                          onClick={() => handleAnswerSelection(option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                    <Button
                      onClick={submitAnswer}
                      disabled={!selectedAnswer}
                      className="w-full"
                    >
                      Submit Answer
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="planner">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center">
                  <Clock className="w-6 h-6 mr-2" />
                  Study Planner
                </CardTitle>
                <CardDescription>Organize your study schedule and track progress</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <p className="text-gray-600 mb-8">Study planner functionality coming soon! This will include:</p>
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <div className="flex flex-col items-center">
                    <BookOpen className="w-12 h-12 text-purple-500 mb-4" />
                    <h3 className="font-semibold mb-2">Study Sessions</h3>
                    <p className="text-sm text-gray-600">Plan and schedule study sessions</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Target className="w-12 h-12 text-green-500 mb-4" />
                    <h3 className="font-semibold mb-2">Goal Setting</h3>
                    <p className="text-sm text-gray-600">Set and track learning goals</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Lightbulb className="w-12 h-12 text-yellow-500 mb-4" />
                    <h3 className="font-semibold mb-2">Smart Reminders</h3>
                    <p className="text-sm text-gray-600">AI-powered study reminders</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudyTools;
