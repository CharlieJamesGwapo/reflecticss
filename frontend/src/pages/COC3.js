import React, { useState, useEffect, useCallback } from 'react';
import { HelpCircle, BarChart3, Filter, AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';
import Swal from 'sweetalert2';

function COC3() {
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
      const response = await fetch(`${API_URL}/api/coc3/categories`);
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
        ? `${API_URL}/api/coc3/quiz/questions?category=${encodeURIComponent(selectedCategory)}`
        : `${API_URL}/api/coc3/quiz/questions`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch questions');
      let data = await response.json();
      
      // Fetch choices for each question
      const questionsWithChoices = await Promise.all(
        data.map(async (question) => {
          try {
            const choicesResponse = await fetch(`${API_URL}/api/coc3/quiz/questions/${question.id}`);
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
    console.log('✍️ handleSubmitAnswer called');
    console.log('  Selected Answer:', selectedAnswer);
    console.log('  Current Question Index:', currentQuestionIndex);
    console.log('  Questions loaded:', questions.length);
    
    if (!selectedAnswer || !questions[currentQuestionIndex]) {
      console.log('  ❌ Missing answer or question, returning');
      return;
    }

    const currentQ = questions[currentQuestionIndex];
    const correctChoice = currentQ.choices?.find(c => c.is_correct);
    const isCorrect = selectedAnswer === correctChoice?.id;

    console.log('  Question ID:', currentQ.id);
    console.log('  Is Correct:', isCorrect);
    console.log('  Current Stats:', quizStats);

    setShowResult(true);

    if (isCorrect) {
      setQuizStats(prev => ({
        ...prev,
        correct: prev.correct + 1,
        total: prev.total + 1
      }));
      
      Swal.fire({
        title: '✓ Correct!',
        text: 'Great job! You got it right.',
        icon: 'success',
        confirmButtonColor: '#2563EB',
        confirmButtonText: 'Continue',
        allowOutsideClick: false,
        timer: 2000,
        timerProgressBar: true
      });
    } else {
      setQuizStats(prev => ({
        ...prev,
        total: prev.total + 1
      }));
      
      Swal.fire({
        title: '✗ Incorrect',
        html: `<p>Your answer was wrong.</p><p style="margin-top: 10px; font-weight: bold; color: #059669;">Correct Answer: ${correctChoice?.choice_text}</p>`,
        icon: 'error',
        confirmButtonColor: '#2563EB',
        confirmButtonText: 'Continue',
        allowOutsideClick: false,
        timer: 3000,
        timerProgressBar: true
      });
    }

    try {
      const token = localStorage.getItem('token');
      console.log('  📤 Submitting answer to backend...');
      fetch(`${API_URL}/api/coc3/quiz/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          questionId: currentQ.id,
          selectedChoiceId: selectedAnswer
        })
      });
    } catch (err) {
      console.error('Error submitting answer:', err);
    }
  }, [selectedAnswer, questions, currentQuestionIndex, API_URL, quizStats]);

  // Timer effect
  useEffect(() => {
    if (!showResult && activeTab === 'quiz' && quizStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult && activeTab === 'quiz' && quizStarted) {
      handleSubmitAnswer();
    }
  }, [timeLeft, showResult, activeTab, quizStarted, handleSubmitAnswer]);

  const handleAnswerSelect = (choiceId) => {
    if (!showResult) {
      setSelectedAnswer(choiceId);
    }
  };

  const handleNextQuestion = () => {
    console.log('📍 handleNextQuestion called');
    console.log('  Current Question Index:', currentQuestionIndex);
    console.log('  Total Questions:', questions.length);
    console.log('  Is Last Question:', currentQuestionIndex >= questions.length - 1);
    
    if (currentQuestionIndex < questions.length - 1) {
      console.log('  → Moving to next question');
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(20);
    } else {
      // Quiz completed
      console.log('  → Quiz is complete! Calling handleQuizCompletion()');
      handleQuizCompletion();
    }
  };

  const handleQuizCompletion = async () => {
    const finalScore = quizStats.total > 0 ? ((quizStats.correct / quizStats.total) * 100).toFixed(0) : 0;
    
    console.log('🎯 Quiz Completion Started');
    console.log('  Final Score:', finalScore);
    console.log('  Correct:', quizStats.correct);
    console.log('  Total:', quizStats.total);
    console.log('  Category:', selectedCategory || 'All');
    
    try {
      const token = localStorage.getItem('token');
      console.log('🔐 Token exists:', !!token);
      
      const requestData = {
        category: selectedCategory || 'All',
        score: finalScore,
        correct: quizStats.correct,
        total: quizStats.total,
        completedAt: new Date().toISOString()
      };
      
      console.log('📤 Sending request to:', `${API_URL}/api/coc3/quiz/complete`);
      console.log('📦 Request data:', requestData);
      
      const response = await fetch(`${API_URL}/api/coc3/quiz/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
      });

      console.log('📥 Response status:', response.status);
      console.log('📥 Response ok:', response.ok);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Quiz saved successfully:', data);
        
        // Show completion alert
        Swal.fire({
          title: '🎉 Quiz Completed!',
          html: `
            <div style="text-align: center;">
              <p style="font-size: 18px; margin-bottom: 15px;">Congratulations on completing the quiz!</p>
              <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                <p style="font-size: 14px; color: #666; margin: 5px 0;">Your Score</p>
                <p style="font-size: 48px; font-weight: bold; color: #2563eb; margin: 10px 0;">${finalScore}%</p>
                <p style="font-size: 14px; color: #666; margin: 5px 0;">You got ${quizStats.correct} out of ${quizStats.total} correct</p>
              </div>
            </div>
          `,
          icon: 'success',
          confirmButtonColor: '#2563EB',
          confirmButtonText: 'View Dashboard',
          allowOutsideClick: false
        }).then(() => {
          // Reset quiz and go back to preview
          setQuizStarted(false);
          setCurrentQuestionIndex(0);
          setSelectedAnswer(null);
          setShowResult(false);
          setQuizStats({ correct: 0, total: 0 });
          setTimeLeft(20);
        });
      } else {
        const errorData = await response.json();
        console.error('❌ Response error:', errorData);
        Swal.fire({
          title: 'Error!',
          text: errorData.error || 'Failed to save quiz',
          icon: 'error',
          confirmButtonColor: '#2563EB'
        });
      }
    } catch (err) {
      console.error('❌ Error completing quiz:', err);
      Swal.fire({
        title: 'Quiz Completed!',
        text: `Your score: ${finalScore}%`,
        icon: 'success',
        confirmButtonColor: '#2563EB'
      });
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-6 sm:py-8 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">COC 3</h1>
          <p className="text-sm sm:text-base text-blue-600">Master Wireless & Network Protocols</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'quiz', label: 'Quiz', icon: HelpCircle },
            { id: 'progress', label: 'Progress', icon: BarChart3 }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-blue-600 border-2 border-blue-200 hover:border-blue-400'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Category Filter */}
        {activeTab === 'quiz' && !quizStarted && (
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Filter size={20} className="text-blue-600 flex-shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-600 text-sm sm:text-base"
            >
              <option value="">All Categories</option>
              {categories && categories.length > 0 && categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
            <p className="mt-4 text-blue-600 font-semibold">Loading...</p>
          </div>
        )}

        {/* Quiz Preview - Before Starting */}
        {activeTab === 'quiz' && !quizStarted && !loading && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 md:p-12 border-2 border-blue-200 shadow-lg">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-6 sm:mb-8">
                <div className="inline-block p-4 sm:p-6 bg-blue-600 rounded-full mb-4">
                  <HelpCircle className="text-white" size={40} />
                </div>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-3 sm:mb-4">
                Ready to Test Your Knowledge?
              </h2>
              
              <p className="text-gray-700 text-base sm:text-lg mb-6 sm:mb-8">
                Master Wireless & Network Protocols through interactive quizzes. Each question has 20 seconds to answer.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
                <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                  <p className="text-xl sm:text-2xl font-bold text-blue-600">10</p>
                  <p className="text-xs sm:text-sm text-gray-600">Questions</p>
                </div>
                <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                  <p className="text-xl sm:text-2xl font-bold text-blue-600">20s</p>
                  <p className="text-xs sm:text-sm text-gray-600">Per Question</p>
                </div>
                <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                  <p className="text-xl sm:text-2xl font-bold text-blue-600">Expert</p>
                  <p className="text-xs sm:text-sm text-gray-600">Level</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setQuizStarted(true);
                  fetchQuestions();
                }}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-lg hover:shadow-xl hover:shadow-blue-400/50 transform hover:scale-105 transition-all duration-300 text-base sm:text-lg"
              >
                Start Quiz Now
              </button>

              <p className="text-gray-600 text-xs sm:text-sm mt-6 sm:mt-8">
                💡 Tip: Read each question carefully and select the best answer. Your progress will be saved automatically.
              </p>
            </div>
          </div>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && !loading && quizStarted && currentQuestion && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
            {/* Real-Time Progress Bar */}
            <div className="mb-6 sm:mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 sm:p-4 border-l-4 border-blue-600">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-3">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 font-semibold">QUIZ PROGRESS</p>
                  <p className="text-sm sm:text-base font-bold text-blue-900">Question {currentQuestionIndex + 1} of {questions.length}</p>
                </div>
                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  <div className="bg-white rounded-lg px-3 sm:px-4 py-2 text-center border border-blue-200">
                    <p className="text-xs text-gray-600">Correct</p>
                    <p className="text-lg sm:text-xl font-bold text-green-600">{quizStats.correct}</p>
                  </div>
                  <div className="bg-white rounded-lg px-3 sm:px-4 py-2 text-center border border-blue-200">
                    <p className="text-xs text-gray-600">Answered</p>
                    <p className="text-lg sm:text-xl font-bold text-blue-600">{quizStats.total}</p>
                  </div>
                  <div className="bg-white rounded-lg px-3 sm:px-4 py-2 text-center border border-blue-200">
                    <p className="text-xs text-gray-600">Score</p>
                    <p className="text-lg sm:text-xl font-bold text-purple-600">
                      {quizStats.total > 0 ? ((quizStats.correct / quizStats.total) * 100).toFixed(0) : 0}%
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2 sm:h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 to-blue-500 h-2 sm:h-3 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-2 text-center">{((currentQuestionIndex + 1) / questions.length * 100).toFixed(0)}% Complete</p>
            </div>

            {/* Header with Timer */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4">
                <span className="text-blue-600 font-semibold text-sm sm:text-base md:text-lg">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <div className="flex gap-2 sm:gap-4 flex-wrap">
                  <span className="bg-blue-100 text-blue-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                    {currentQuestion.difficulty}
                  </span>
                  <div className={`flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 rounded-full font-semibold text-xs sm:text-sm ${
                    timeLeft <= 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    <Clock size={16} />
                    <span>{timeLeft}s</span>
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                <div
                  className="bg-blue-600 h-2 sm:h-3 rounded-full transition-all"
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>

            {/* Question Text */}
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-blue-900 mb-6 sm:mb-8 leading-tight">{currentQuestion.question_text}</h2>

            {/* Answer Choices */}
            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              {currentQuestion.choices && currentQuestion.choices.length > 0 ? (
                currentQuestion.choices.map((choice, index) => {
                  const isSelected = selectedAnswer === choice.id;
                  const isCorrect = choice.is_correct;
                  const showAsCorrect = showResult && isCorrect;
                  const showAsWrong = showResult && isSelected && !isCorrect;
                  
                  return (
                    <button
                      key={choice.id}
                      onClick={() => handleAnswerSelect(choice.id)}
                      disabled={showResult}
                      className={`w-full p-3 sm:p-4 text-left rounded-lg border-2 transition-all transform hover:scale-102 ${
                        showAsCorrect
                          ? 'border-green-500 bg-green-50'
                          : showAsWrong
                          ? 'border-red-500 bg-red-50'
                          : isSelected && !showResult
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-400'
                      } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                        <div
                          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-bold text-xs sm:text-sm ${
                            showAsCorrect
                              ? 'border-green-500 bg-green-500 text-white'
                              : showAsWrong
                              ? 'border-red-500 bg-red-500 text-white'
                              : isSelected && !showResult
                              ? 'border-blue-600 bg-blue-600 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {showAsCorrect ? '✓' : showAsWrong ? '✗' : String.fromCharCode(65 + index)}
                        </div>
                        <span className="font-medium text-gray-800 flex-1 text-sm sm:text-base">{choice.choice_text}</span>
                        {showAsCorrect && <CheckCircle className="text-green-600 flex-shrink-0" size={20} />}
                        {showAsWrong && <AlertCircle className="text-red-600 flex-shrink-0" size={20} />}
                      </div>
                    </button>
                  );
                })
              ) : (
                <p className="text-gray-600 text-sm sm:text-base">No answer choices available.</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 sm:gap-3">
              {!showResult && (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer}
                  className="w-full bg-blue-600 text-white font-bold py-2 sm:py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
                >
                  Submit Answer
                </button>
              )}

              {showResult && currentQuestionIndex < questions.length - 1 && (
                <button
                  onClick={handleNextQuestion}
                  className="w-full bg-blue-600 text-white font-bold py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Zap size={18} />
                  Next Question
                </button>
              )}

              {showResult && currentQuestionIndex === questions.length - 1 && (
                <div className="bg-blue-50 border-l-4 border-blue-600 p-3 sm:p-4 rounded">
                  <p className="text-blue-800 font-bold text-sm sm:text-base">Quiz Completed!</p>
                  <p className="text-blue-700 text-xs sm:text-sm mt-1">Check your progress in the Progress tab.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && !loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border-t-4 border-blue-600">
              <div className="text-center">
                <BarChart3 className="text-blue-600 mx-auto mb-2 sm:mb-3" size={32} />
                <p className="text-gray-600 text-xs sm:text-sm mb-2 font-semibold">Total Questions</p>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900">{quizStats.total}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border-t-4 border-green-600">
              <div className="text-center">
                <CheckCircle className="text-green-600 mx-auto mb-2 sm:mb-3" size={32} />
                <p className="text-gray-600 text-xs sm:text-sm mb-2 font-semibold">Correct Answers</p>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-600">{quizStats.correct}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border-t-4 border-purple-600">
              <div className="text-center">
                <Zap className="text-purple-600 mx-auto mb-2 sm:mb-3" size={32} />
                <p className="text-gray-600 text-xs sm:text-sm mb-2 font-semibold">Score</p>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-600">
                  {quizStats.total > 0 ? ((quizStats.correct / quizStats.total) * 100).toFixed(1) : 0}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default COC3;
