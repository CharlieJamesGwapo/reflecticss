import React, { useState, useEffect, useCallback } from 'react';
import { HelpCircle, BarChart3, Filter, AlertCircle, CheckCircle, Clock, Zap, Network, Shield, Wifi, FileText, Lock } from 'lucide-react';
import Swal from 'sweetalert2';

function COC2() {
  const [activeTab, setActiveTab] = useState('quiz');
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizStats, setQuizStats] = useState({ correct: 0, total: 0 });
  const [timeLeft, setTimeLeft] = useState(20);
  const [quizStarted, setQuizStarted] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Fetch categories on mount
  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/coc2/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Fetch quiz questions only when quiz is started
  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const url = selectedCategory
        ? `${API_URL}/api/coc2/quiz/questions?category=${encodeURIComponent(selectedCategory)}`
        : `${API_URL}/api/coc2/quiz/questions`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch questions');
      let data = await response.json();
      
      // Fetch choices for each question
      const questionsWithChoices = await Promise.all(
        data.map(async (question) => {
          try {
            const choicesResponse = await fetch(`${API_URL}/api/coc2/quiz/questions/${question.id}`);
            if (choicesResponse.ok) {
              const questionData = await choicesResponse.json();
              return { ...question, choices: questionData.choices || [] };
            }
            return { ...question, choices: [] };
          } catch (err) {
            console.error('Error fetching choices for question:', question.id, err);
            return { ...question, choices: [] };
          }
        })
      );
      
      setQuestions(questionsWithChoices || []);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setQuizStats({ correct: 0, total: 0 });
      setTimeLeft(20);
    } catch (err) {
      console.error('Error fetching questions:', err);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, API_URL]);

  useEffect(() => {
    if (activeTab === 'quiz' && quizStarted) {
      fetchQuestions();
    }
  }, [activeTab, quizStarted, fetchQuestions]);

  // Handle submit answer
  const handleSubmitAnswer = useCallback(() => {
    if (!selectedAnswer || !questions[currentQuestionIndex]) {
      return;
    }

    const currentQ = questions[currentQuestionIndex];
    const correctChoice = currentQ.choices?.find(c => c.is_correct);
    const isCorrect = selectedAnswer === correctChoice?.id;

    setShowResult(true);
    
    if (isCorrect) {
      setQuizStats(prev => ({ ...prev, correct: prev.correct + 1 }));
    }

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(20);
      } else {
        // Quiz completed
        handleQuizComplete();
      }
    }, 1500);
  }, [selectedAnswer, questions, currentQuestionIndex]);

  // Handle quiz complete
  const handleQuizComplete = async () => {
    const percentage = Math.round((quizStats.correct / questions.length) * 100);
    let title, icon, color;
    
    if (percentage >= 80) {
      title = 'Excellent!';
      icon = 'success';
      color = '#10b981';
    } else if (percentage >= 60) {
      title = 'Good Job!';
      icon = 'info';
      color = '#3b82f6';
    } else {
      title = 'Keep Learning!';
      icon = 'warning';
      color = '#f59e0b';
    }

    await Swal.fire({
      icon,
      title,
      html: `
        <div class="text-center">
          <p class="text-2xl font-bold mb-2">${quizStats.correct}/${questions.length}</p>
          <p class="text-lg">${percentage}% Score</p>
          <div class="mt-4">
            <div class="w-full bg-gray-200 rounded-full h-4">
              <div class="h-4 rounded-full transition-all duration-500" style="width: ${percentage}%; background-color: ${color}"></div>
            </div>
          </div>
        </div>
      `,
      confirmButtonText: 'Try Again',
      confirmButtonColor: color,
      showCancelButton: true,
      cancelButtonText: 'Back to Categories',
    }).then((result) => {
      if (result.isConfirmed) {
        setQuizStarted(false);
        fetchQuestions();
      } else {
        setQuizStarted(false);
        setCurrentQuestionIndex(0);
        setQuestions([]);
      }
    });
  };

  // Timer effect
  useEffect(() => {
    if (quizStarted && questions.length > 0 && !showResult) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmitAnswer();
            return 20;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizStarted, questions, showResult, handleSubmitAnswer]);

  // Start quiz
  const startQuiz = () => {
    setQuizStarted(true);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2 flex items-center gap-3">
            <Network className="text-blue-600" size={40} />
            COC 2: Network Topology
          </h1>
          <p className="text-blue-600">Master network concepts, topologies, and security fundamentals</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'quiz'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <HelpCircle size={20} />
                Quiz
              </div>
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'stats'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <BarChart3 size={20} />
                Categories
              </div>
            </button>
          </div>

          {/* Quiz Tab Content */}
          {activeTab === 'quiz' && (
            <div className="p-8">
              {!quizStarted ? (
                <div className="text-center">
                  <div className="mb-8">
                    <Network className="mx-auto text-blue-600 mb-4" size={80} />
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Network Topology Quiz</h2>
                    <p className="text-xl text-gray-600 mb-8">
                      Test your knowledge on network topologies, configurations, and security
                    </p>
                  </div>

                  {/* Category Selection */}
                  <div className="max-w-md mx-auto mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Filter size={16} className="inline mr-2" />
                      Select Category (Optional)
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={startQuiz}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2 mx-auto"
                  >
                    <Zap size={20} />
                    Start Quiz
                  </button>
                </div>
              ) : loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading questions...</p>
                </div>
              ) : questions.length > 0 && currentQuestion ? (
                <div className="max-w-4xl mx-auto">
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Question {currentQuestionIndex + 1} of {questions.length}
                      </span>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-500" />
                        <span className={`text-sm font-medium ${timeLeft <= 5 ? 'text-red-600' : 'text-gray-700'}`}>
                          {timeLeft}s
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Question Card */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-8 shadow-lg">
                    <div className="flex items-start gap-3 mb-6">
                      <div className="bg-blue-100 rounded-full p-2">
                        {currentQuestion.category === 'Network Topology' && <Network size={24} className="text-blue-600" />}
                        {currentQuestion.category === 'Network Configuration' && <Wifi size={24} className="text-blue-600" />}
                        {currentQuestion.category === 'Network Location Types' && <FileText size={24} className="text-blue-600" />}
                        {currentQuestion.category === 'Network Sharing' && <FileText size={24} className="text-blue-600" />}
                        {currentQuestion.category === 'Network Security' && <Lock size={24} className="text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full mb-3">
                          {currentQuestion.category}
                        </span>
                        <h3 className="text-xl font-semibold text-gray-900 leading-relaxed">
                          {currentQuestion.question_text}
                        </h3>
                      </div>
                    </div>

                    {/* Answer Choices */}
                    <div className="space-y-3">
                      {currentQuestion.choices?.map((choice) => {
                        const isCorrect = showResult && choice.is_correct;
                        const isSelected = selectedAnswer === choice.id;
                        const isWrong = showResult && isSelected && !choice.is_correct;
                        
                        return (
                          <button
                            key={choice.id}
                            onClick={() => !showResult && setSelectedAnswer(choice.id)}
                            disabled={showResult}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                              showResult
                                ? isCorrect
                                  ? 'border-green-500 bg-green-50'
                                  : isWrong
                                  ? 'border-red-500 bg-red-50'
                                  : 'border-gray-200 bg-gray-50'
                                : isSelected
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{choice.choice_text}</span>
                              {showResult && (
                                <div>
                                  {isCorrect && <CheckCircle size={20} className="text-green-600" />}
                                  {isWrong && <AlertCircle size={20} className="text-red-600" />}
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Submit Button */}
                    {!showResult && (
                      <div className="mt-6 text-center">
                        <button
                          onClick={handleSubmitAnswer}
                          disabled={!selectedAnswer}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                        >
                          Submit Answer
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No questions available.</p>
                </div>
              )}
            </div>
          )}

          {/* Stats Tab Content */}
          {activeTab === 'stats' && (
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quiz Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(category => (
                  <div key={category} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      {category === 'Network Topology' && <Network size={24} className="text-blue-600" />}
                      {category === 'Network Configuration' && <Wifi size={24} className="text-blue-600" />}
                      {category === 'Network Location Types' && <FileText size={24} className="text-blue-600" />}
                      {category === 'Network Sharing' && <FileText size={24} className="text-blue-600" />}
                      {category === 'Network Security' && <Lock size={24} className="text-blue-600" />}
                      <h4 className="font-semibold text-gray-900">{category}</h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Test your knowledge of {category.toLowerCase()} concepts
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default COC2;
