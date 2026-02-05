import React, { useState, useEffect, useCallback } from 'react';
import { HelpCircle, BarChart3, Filter, AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';
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
        ? `${API_URL}/api/coc2/questions?category=${encodeURIComponent(selectedCategory)}`
        : `${API_URL}/api/coc2/questions`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch questions');
      let data = await response.json();
      
      // Questions already include choices from the backend
      setQuestions(data || []);
    } catch (err) {
      console.error('Error fetching questions:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load quiz questions. Please try again.',
        confirmButtonColor: '#2563eb'
      });
    } finally {
      setLoading(false);
    }
  }, [API_URL, selectedCategory]);

  // Timer effect
  useEffect(() => {
    let timer;
    if (quizStarted && !showResult && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && quizStarted && !showResult) {
      handleTimeout();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, showResult]);

  const handleTimeout = () => {
    setShowResult(true);
    Swal.fire({
      icon: 'warning',
      title: 'Time\'s Up!',
      text: 'You ran out of time for this question.',
      confirmButtonColor: '#f59e0b'
    });
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizStats({ correct: 0, total: 0 });
    setTimeLeft(20);
    fetchQuestions();
  };

  const handleAnswerSelect = (choiceId) => {
    if (showResult) return;
    setSelectedAnswer(choiceId);
  };

  const submitAnswer = () => {
    if (!selectedAnswer) {
      Swal.fire({
        icon: 'warning',
        title: 'Please select an answer',
        confirmButtonColor: '#2563eb'
      });
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = currentQuestion.choices.some(choice => choice.id === selectedAnswer && choice.is_correct);
    
    setShowResult(true);
    setQuizStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));

    Swal.fire({
      icon: isCorrect ? 'success' : 'error',
      title: isCorrect ? 'Correct!' : 'Incorrect',
      text: isCorrect ? 'Great job!' : 'Better luck next time!',
      confirmButtonColor: '#f59e0b'
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(20);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const percentage = questions.length > 0 ? Math.round((quizStats.correct / questions.length) * 100) : 0;
    
    Swal.fire({
      icon: percentage >= 70 ? 'success' : 'info',
      title: 'Quiz Completed!',
      html: `
        <div class="text-left">
          <p class="mb-2"><strong>Score:</strong> ${quizStats.correct}/${questions.length} (${percentage}%)</p>
          <p class="mb-2"><strong>Performance:</strong> ${percentage >= 70 ? 'Excellent!' : percentage >= 50 ? 'Good job!' : 'Keep practicing!'}</p>
        </div>
      `,
      confirmButtonColor: '#f59e0b',
      showCancelButton: true,
      cancelButtonText: 'Start New Quiz',
      confirmButtonText: 'Back to Selection'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/reviewer-selection';
      } else {
        resetQuiz();
      }
    });
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizStats({ correct: 0, total: 0 });
    setTimeLeft(20);
    setQuestions([]);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (loading && quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
          <p className="text-gray-800 text-xl font-semibold">Loading COC2 Quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">COC 2 Quiz</h1>
          <p className="text-xl text-blue-600">Advanced Computer Architecture & Networks</p>
        </div>

        {/* Tabs */}
        <div className="flex mb-8">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 py-3 px-6 rounded-l-lg font-semibold transition-all ${
              activeTab === 'quiz'
                ? 'bg-white text-blue-600 shadow-lg'
                : 'bg-white bg-opacity-20 text-blue-600 hover:bg-opacity-30'
            }`}
          >
            <HelpCircle className="inline mr-2" size={20} />
            Quiz
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-3 px-6 rounded-r-lg font-semibold transition-all ${
              activeTab === 'stats'
                ? 'bg-white text-blue-600 shadow-lg'
                : 'bg-white bg-opacity-20 text-blue-600 hover:bg-opacity-30'
            }`}
          >
            <BarChart3 className="inline mr-2" size={20} />
            Statistics
          </button>
        </div>

        {/* Quiz Tab */}
        {activeTab === 'quiz' && (
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20">
            {!quizStarted ? (
              /* Quiz Setup */
              <div className="text-center py-12">
                <Zap className="text-blue-600 mx-auto mb-6" size={64} />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Test Your Knowledge?</h2>
                <p className="text-gray-600 mb-8">Challenge yourself with our comprehensive COC 2 quiz covering Network Devices and advanced computer concepts.</p>
                
                {/* Category Filter */}
                <div className="max-w-md mx-auto mb-8">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    <Filter className="inline mr-2" size={16} />
                    Select Category (Optional)
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-blue-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="" className="text-gray-800">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category} className="text-gray-800">
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={startQuiz}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-8 rounded-lg hover:shadow-xl hover:shadow-blue-400/50 transform hover:scale-105 transition-all duration-300"
                >
                  Start Quiz
                </button>
              </div>
            ) : (
              /* Quiz Active */
              currentQuestion && (
                <div>
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-gray-600 text-sm mb-2">
                      <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                      <span className="flex items-center text-gray-600">
                        <Clock className="mr-1" size={16} />
                        {timeLeft}s
                      </span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-blue-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <div className="mb-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="bg-blue-100 rounded-lg p-2">
                        <HelpCircle className="text-blue-600" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {currentQuestion.question_text}
                        </h3>
                        {currentQuestion.category && (
                          <span className="inline-block bg-blue-100 px-3 py-1 rounded-full text-sm text-blue-600">
                            {currentQuestion.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Answer Choices */}
                  <div className="space-y-3 mb-6">
                    {currentQuestion.choices?.map((choice) => (
                      <button
                        key={choice.id}
                        onClick={() => handleAnswerSelect(choice.id)}
                        disabled={showResult}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          showResult
                            ? choice.is_correct
                              ? 'bg-green-50 border-green-400'
                              : selectedAnswer === choice.id
                              ? 'bg-red-50 border-red-400'
                              : 'bg-white border-gray-300'
                            : selectedAnswer === choice.id
                            ? 'bg-blue-50 border-blue-400'
                            : 'bg-white border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${showResult && choice.is_correct ? 'text-green-700' : showResult && selectedAnswer === choice.id && !choice.is_correct ? 'text-red-700' : 'text-gray-900'}`}>
                            {choice.choice_text}
                          </span>
                          {showResult && (
                            <span>
                              {choice.is_correct ? (
                                <CheckCircle className="text-green-400" size={20} />
                              ) : (
                                selectedAnswer === choice.id && (
                                  <AlertCircle className="text-red-400" size={20} />
                                )
                              )}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    {!showResult ? (
                      <button
                        onClick={submitAnswer}
                        disabled={!selectedAnswer}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button
                        onClick={nextQuestion}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                      </button>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'stats' && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="text-center py-12">
              <BarChart3 className="text-blue-600 mx-auto mb-6" size={64} />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Statistics</h2>
              <p className="text-gray-600 mb-8">
                {quizStarted ? `Your current score: ${quizStats.correct}/${quizStats.total}` : 'Complete a quiz to see your statistics'}
              </p>
              
              {!quizStarted && (
                <button
                  onClick={() => setActiveTab('quiz')}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Start Quiz
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default COC2;
