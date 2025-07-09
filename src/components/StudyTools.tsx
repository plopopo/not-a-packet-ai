
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Brain, FileText, Target, Plus, RotateCcw, Check, X, Clock, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: "easy" | "medium" | "hard";
  lastReviewed?: Date;
}

interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  createdAt: Date;
}

interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const StudyTools = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    {
      id: "1",
      front: "What is photosynthesis?",
      back: "The process by which plants convert light energy into chemical energy (glucose) using carbon dioxide and water.",
      difficulty: "medium"
    },
    {
      id: "2",
      front: "What is the derivative of x²?",
      back: "2x (using the power rule: d/dx[xⁿ] = nxⁿ⁻¹)",
      difficulty: "easy"
    }
  ]);

  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Introduction to Calculus",
      content: "Calculus is the mathematical study of continuous change. It has two main branches: differential calculus (concerning rates of change) and integral calculus (concerning accumulation of quantities).",
      subject: "Mathematics",
      createdAt: new Date()
    }
  ]);

  const [quizzes] = useState<Quiz[]>([
    {
      id: "1",
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1,
      explanation: "Mars is called the Red Planet due to iron oxide (rust) on its surface, giving it a reddish appearance."
    },
    {
      id: "2",
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2,
      explanation: "Paris has been the capital of France since the 12th century."
    }
  ]);

  const [newFlashcard, setNewFlashcard] = useState({ front: "", back: "", difficulty: "medium" as const });
  const [newNote, setNewNote] = useState({ title: "", content: "", subject: "" });
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  const addFlashcard = () => {
    if (!newFlashcard.front.trim() || !newFlashcard.back.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both front and back of the flashcard",
        variant: "destructive"
      });
      return;
    }

    const flashcard: Flashcard = {
      id: Date.now().toString(),
      ...newFlashcard
    };

    setFlashcards(prev => [...prev, flashcard]);
    setNewFlashcard({ front: "", back: "", difficulty: "medium" });
    toast({
      title: "Success",
      description: "Flashcard added successfully!"
    });
  };

  const addNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both title and content",
        variant: "destructive"
      });
      return;
    }

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      subject: newNote.subject || "General",
      createdAt: new Date()
    };

    setNotes(prev => [...prev, note]);
    setNewNote({ title: "", content: "", subject: "" });
    toast({
      title: "Success",
      description: "Note saved successfully!"
    });
  };

  const nextCard = () => {
    setCurrentCardIndex(prev => (prev + 1) % flashcards.length);
    setShowAnswer(false);
  };

  const previousCard = () => {
    setCurrentCardIndex(prev => (prev - 1 + flashcards.length) % flashcards.length);
    setShowAnswer(false);
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowQuizResult(true);
  };

  const nextQuiz = () => {
    setCurrentQuizIndex(prev => (prev + 1) % quizzes.length);
    setSelectedAnswer(null);
    setShowQuizResult(false);
  };

  const currentCard = flashcards[currentCardIndex];
  const currentQuiz = quizzes[currentQuizIndex];

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Study Tools
          </h1>
          <p className="text-xl text-gray-600">Enhance your learning with interactive study materials</p>
        </div>

        <Tabs defaultValue="flashcards" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="flashcards" className="flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <span>Flashcards</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Notes</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Quiz</span>
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Create</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="flashcards" className="space-y-6">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                Card {currentCardIndex + 1} of {flashcards.length}
              </Badge>
            </div>

            {currentCard && (
              <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="min-h-[200px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-medium mb-4">
                        {showAnswer ? "Answer:" : "Question:"}
                      </div>
                      <div className="text-xl leading-relaxed">
                        {showAnswer ? currentCard.back : currentCard.front}
                      </div>
                      <Badge 
                        className={`mt-4 ${
                          currentCard.difficulty === "easy" ? "bg-green-100 text-green-800" :
                          currentCard.difficulty === "medium" ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }`}
                      >
                        {currentCard.difficulty}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={previousCard}>
                Previous
              </Button>
              <Button onClick={() => setShowAnswer(!showAnswer)}>
                {showAnswer ? "Show Question" : "Show Answer"}
              </Button>
              <Button variant="outline" onClick={nextCard}>
                Next
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <div className="grid gap-6">
              {notes.map((note) => (
                <Card key={note.id} className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{note.title}</CardTitle>
                      <Badge variant="outline">{note.subject}</Badge>
                    </div>
                    <CardDescription>
                      Created {note.createdAt.toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{note.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quiz" className="space-y-6">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                Question {currentQuizIndex + 1} of {quizzes.length}
              </Badge>
            </div>

            {currentQuiz && (
              <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">{currentQuiz.question}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentQuiz.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={
                        showQuizResult
                          ? index === currentQuiz.correctAnswer
                            ? "default"
                            : index === selectedAnswer
                            ? "destructive"
                            : "outline"
                          : selectedAnswer === index
                          ? "secondary"
                          : "outline"
                      }
                      className="w-full justify-start text-left h-auto p-4"
                      onClick={() => !showQuizResult && handleQuizAnswer(index)}
                      disabled={showQuizResult}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold">{String.fromCharCode(65 + index)}.</span>
                        <span>{option}</span>
                        {showQuizResult && index === currentQuiz.correctAnswer && (
                          <Check className="w-4 h-4 ml-auto text-green-600" />
                        )}
                        {showQuizResult && index === selectedAnswer && index !== currentQuiz.correctAnswer && (
                          <X className="w-4 h-4 ml-auto text-red-600" />
                        )}
                      </div>
                    </Button>
                  ))}

                  {showQuizResult && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Explanation:</h4>
                      <p className="text-gray-700">{currentQuiz.explanation}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <div className="flex justify-center">
              <Button onClick={nextQuiz} disabled={!showQuizResult}>
                Next Question
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Create Flashcard */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5" />
                    <span>Create Flashcard</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Front (Question)</label>
                    <Textarea
                      value={newFlashcard.front}
                      onChange={(e) => setNewFlashcard(prev => ({ ...prev, front: e.target.value }))}
                      placeholder="Enter the question or prompt..."
                      className="min-h-[80px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Back (Answer)</label>
                    <Textarea
                      value={newFlashcard.back}
                      onChange={(e) => setNewFlashcard(prev => ({ ...prev, back: e.target.value }))}
                      placeholder="Enter the answer or explanation..."
                      className="min-h-[80px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Difficulty</label>
                    <div className="flex space-x-2">
                      {(["easy", "medium", "hard"] as const).map((difficulty) => (
                        <Button
                          key={difficulty}
                          variant={newFlashcard.difficulty === difficulty ? "default" : "outline"}
                          size="sm"
                          onClick={() => setNewFlashcard(prev => ({ ...prev, difficulty }))}
                        >
                          {difficulty}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Button onClick={addFlashcard} className="w-full">
                    Add Flashcard
                  </Button>
                </CardContent>
              </Card>

              {/* Create Note */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Create Note</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <Input
                      value={newNote.title}
                      onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter note title..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <Input
                      value={newNote.subject}
                      onChange={(e) => setNewNote(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="e.g., Mathematics, Science, History..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <Textarea
                      value={newNote.content}
                      onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Enter your notes..."
                      className="min-h-[120px]"
                    />
                  </div>
                  <Button onClick={addNote} className="w-full">
                    Save Note
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudyTools;
