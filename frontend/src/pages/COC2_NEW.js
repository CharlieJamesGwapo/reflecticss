import React, { useState, useEffect, useCallback } from 'react';
import { HelpCircle, BarChart3, Filter, AlertCircle, CheckCircle, Clock, Zap, Network, Router, Shield } from 'lucide-react';
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

  // Sample COC2 questions and categories
  const sampleQuestions = [
    {
      id: 1,
      question_text: "What is the primary function of a modem in a network?",
      category: "Network Devices",
      difficulty: "Medium",
      choices: [
        { id: 1, choice_text: "To forward data packets between different networks", is_correct: false },
        { id: 2, choice_text: "To establish and maintain the connection between your local network and the ISP", is_correct: true },
        { id: 3, choice_text: "To connect multiple devices in a local area network", is_correct: false },
        { id: 4, choice_text: "To boost wireless signals in a large area", is_correct: false }
      ]
    },
    {
      id: 2,
      question_text: "Which topology connects all devices to a central hub or switch?",
      category: "Network Topology",
      difficulty: "Easy",
      choices: [
        { id: 1, choice_text: "Bus Topology", is_correct: false },
        { id: 2, choice_text: "Ring Topology", is_correct: false },
        { id: 3, choice_text: "Star Topology", is_correct: true },
        { id: 4, choice_text: "Mesh Topology", is_correct: false }
      ]
    },
    {
      id: 3,
      question_text: "What is the main difference between UTP and STP cables?",
      category: "Network Cables, Connectors and Raceways",
      difficulty: "Medium",
      choices: [
        { id: 1, choice_text: "UTP is faster than STP", is_correct: false },
        { id: 2, choice_text: "STP has additional shielding against interference", is_correct: true },
        { id: 3, choice_text: "UTP uses fiber optics while STP uses copper", is_correct: false },
        { id: 4, choice_text: "STP is only used for outdoor installations", is_correct: false }
      ]
    },
    {
      id: 4,
      question_text: "What does DHCP automatically assign to devices on a network?",
      category: "Network Configuration and Location",
      difficulty: "Easy",
      choices: [
        { id: 1, choice_text: "MAC addresses", is_correct: false },
        { id: 2, choice_text: "IP addresses and network configuration", is_correct: true },
        { id: 3, choice_text: "Domain names", is_correct: false },
        { id: 4, choice_text: "Subnet masks only", is_correct: false }
      ]
    },
    {
      id: 5,
      question_text: "Which device acts as a central connector that broadcasts data to all connected devices?",
      category: "Network Devices",
      difficulty: "Easy",
      choices: [
        { id: 1, choice_text: "Switch", is_correct: false },
        { id: 2, choice_text: "Router", is_correct: false },
        { id: 3, choice_text: "Hub", is_correct: true },
        { id: 4, choice_text: "Bridge", is_correct: false }
      ]
    },
    {
      id: 6,
      question_text: "What is the primary purpose of a firewall in network security?",
      category: "Network Sharing and Security",
      difficulty: "Medium",
      choices: [
        { id: 1, choice_text: "To increase network speed", is_correct: false },
        { id: 2, choice_text: "To protect data and resources from outside threats", is_correct: true },
        { id: 3, choice_text: "To assign IP addresses", is_correct: false },
        { id: 4, choice_text: "To compress data for faster transmission", is_correct: false }
      ]
    },
    {
      id: 7,
      question_text: "Which network type connects devices across a limited geographical area like an office?",
      category: "Network Configuration and Location",
      difficulty: "Easy",
      choices: [
        { id: 1, choice_text: "WAN", is_correct: false },
        { id: 2, choice_text: "LAN", is_correct: true },
        { id: 3, choice_text: "MAN", is_correct: false },
        { id: 4, choice_text: "PAN", is_correct: false }
      ]
    },
    {
      id: 8,
      question_text: "What is the main advantage of fiber optic cables over copper cables?",
      category: "Network Cables, Connectors and Raceways",
      difficulty: "Medium",
      choices: [
        { id: 1, choice_text: "Lower cost", is_correct: false },
        { id: 2, choice_text: "Immunity to electromagnetic interference", is_correct: true },
        { id: 3, choice_text: "Easier to install", is_correct: false },
        { id: 4, choice_text: "Requires less power", is_correct: false }
      ]
    },
    {
      id: 9,
      question_text: "Which device connects two different network protocols or architectures?",
      category: "Network Devices",
      difficulty: "Medium",
      choices: [
        { id: 1, choice_text: "Switch", is_correct: false },
        { id: 2, choice_text: "Gateway", is_correct: true },
        { id: 3, choice_text: "Bridge", is_correct: false },
        { id: 4, choice_text: "Repeater", is_correct: false }
      ]
    },
    {
      id: 10,
      question_text: "What is the purpose of a punch down tool in network installation?",
      category: "Tools & Testing Devices",
      difficulty: "Easy",
      choices: [
        { id: 1, choice_text: "To test cable continuity", is_correct: false },
        { id: 2, choice_text: "To insert and secure wires into patch panels", is_correct: true },
        { id: 3, choice_text: "To crimp RJ45 connectors", is_correct: false },
        { id: 4, choice_text: "To measure signal strength", is_correct: false }
      ]
    }
  ];

  const sampleCategories = ["Network Devices", "Network Topology", "Network Cables, Connectors and Raceways", "Network Configuration and Location", "Network Sharing and Security", "Tools & Testing Devices"];

  // Fetch categories on mount
  const fetchCategories = useCallback(async () => {
    try {
      // For now, use sample data
      setCategories(sampleCategories);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Fetch quiz questions only when quiz is started
  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    try {
      // For now, use sample data
      const filteredQuestions = selectedCategory
        ? sampleQuestions.filter(q => q.category === selectedCategory)
        : sampleQuestions;
      
      setQuestions(filteredQuestions);
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
  }, [selectedCategory]);

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
      setQuizStats(prev => ({
        ...prev,
        correct: prev.correct + 1,
        total: prev.total + 1
      }));
      
      Swal.fire({
        title: '✓ Correct!',
        text: 'Great job! You got it right.',
        icon: 'success',
        confirmButtonColor: '#f59e0b',
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
        confirmButtonColor: '#f59e0b',
        confirmButtonText: 'Continue',
        allowOutsideClick: false,
        timer: 3000,
        timerProgressBar: true
      });
    }

    try {
      const token = localStorage.getItem('token');
      fetch(`${API_URL}/api/coc2/quiz/submit`, {
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
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(20);
    } else {
      // Quiz completed
      handleQuizCompletion();
    }
  };

  const handleQuizCompletion = async () => {
    const finalScore = quizStats.total > 0 ? ((quizStats.correct / quizStats.total) * 100).toFixed(0) : 0;
    
    try {
      const token = localStorage.getItem('token');
      
      const requestData = {
        category: selectedCategory || 'All',
        score: finalScore,
        correct: quizStats.correct,
        total: quizStats.total,
        completedAt: new Date().toISOString()
      };
      
      const response = await fetch(`${API_URL}/api/coc2/quiz/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        const data = await response.json();
        
        // Show completion alert
        Swal.fire({
          title: '🎉 Quiz Completed!',
          html: `
            <div style="text-align: center;">
              <p style="font-size: 18px; margin-bottom: 15px;">Congratulations on completing the quiz!</p>
              <div style="background: #fef3c7; padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                <p style="font-size: 14px; color: #666; margin: 5px 0;">Your Score</p>
                <p style="font-size: 48px; font-weight: bold; color: #f59e0b; margin: 10px 0;">${finalScore}%</p>
                <p style="font-size: 14px; color: #666; margin: 5px 0;">You got ${quizStats.correct} out of ${quizStats.total} correct</p>
              </div>
            </div>
          `,
          icon: 'success',
          confirmButtonColor: '#f59e0b',
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
        console.error('Response error:', errorData);
        Swal.fire({
          title: 'Error!',
          text: errorData.error || 'Failed to save quiz',
          icon: 'error',
          confirmButtonColor: '#f59e0b'
        });
      }
    } catch (err) {
      console.error('Error completing quiz:', err);
      Swal.fire({
        title: 'Quiz Completed!',
        text: `Your score: ${finalScore}%`,
        icon: 'success',
        confirmButtonColor: '#f59e0b'
      });
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 py-6 sm:py-8 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent mb-2">COC 2</h1>
          <p className="text-sm sm:text-base text-blue-600">Advanced Computer Architecture & Networks</p>
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
                    ? 'bg-gradient-to-r from-yellow-400 to-blue-600 text-white shadow-lg'
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
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-yellow-400"></div>
            <p className="mt-4 text-blue-600 font-semibold">Loading...</p>
          </div>
        )}

        {/* Quiz Preview - Before Starting */}
        {activeTab === 'quiz' && !quizStarted && !loading && (
          <div className="bg-gradient-to-br from-yellow-50 to-blue-50 rounded-2xl p-6 sm:p-8 md:p-12 border-2 border-blue-200 shadow-lg">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-6 sm:mb-8">
                <div className="inline-block p-4 sm:p-6 bg-gradient-to-r from-yellow-400 to-blue-600 rounded-full mb-4">
                  <Network className="text-white" size={40} />
                </div>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-3 sm:mb-4">
                Ready to Test Your Network Knowledge?
              </h2>
              
              <p className="text-gray-700 text-base sm:text-lg mb-6 sm:mb-8">
                Master Advanced Computer Architecture & Networks through interactive quizzes. Each question has 20 seconds to answer.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
                <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                  <p className="text-xl sm:text-2xl font-bold text-yellow-500">{sampleQuestions.length}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Questions</p>
                </div>
                <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                  <p className="text-xl sm:text-2xl font-bold text-blue-600">20s</p>
                  <p className="text-xs sm:text-sm text-gray-600">Per Question</p>
                </div>
                <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                  <p className="text-xl sm:text-2xl font-bold text-yellow-500">Expert</p>
                  <p className="text-xs sm:text-sm text-gray-600">Level</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setQuizStarted(true);
                  fetchQuestions();
                }}
                className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-blue-600 text-white font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-lg hover:shadow-xl hover:shadow-yellow-400/50 transform hover:scale-105 transition-all duration-300 text-base sm:text-lg"
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
            <div className="mb-6 sm:mb-8 bg-gradient-to-r from-yellow-50 to-blue-50 rounded-lg p-3 sm:p-4 border-l-4 border-yellow-400">
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
                    <p className="text-lg sm:text-xl font-bold text-yellow-500">
                      {quizStats.total > 0 ? ((quizStats.correct / quizStats.total) * 100).toFixed(0) : 0}%
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2 sm:h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-blue-600 h-2 sm:h-3 rounded-full transition-all duration-300"
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
                  <span className="bg-yellow-100 text-yellow-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
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
                  className="bg-gradient-to-r from-yellow-400 to-blue-600 h-2 sm:h-3 rounded-full transition-all"
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
                  className="w-full bg-gradient-to-r from-yellow-400 to-blue-600 text-white font-bold py-2 sm:py-3 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
                >
                  Submit Answer
                </button>
              )}

              {showResult && currentQuestionIndex < questions.length - 1 && (
                <button
                  onClick={handleNextQuestion}
                  className="w-full bg-gradient-to-r from-yellow-400 to-blue-600 text-white font-bold py-2 sm:py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Zap size={18} />
                  Next Question
                </button>
              )}

              {showResult && currentQuestionIndex === questions.length - 1 && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4 rounded">
                  <p className="text-yellow-800 font-bold text-sm sm:text-base">Quiz Completed!</p>
                  <p className="text-yellow-700 text-xs sm:text-sm mt-1">Check your progress in the Progress tab.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && !loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border-t-4 border-yellow-400">
              <div className="text-center">
                <BarChart3 className="text-yellow-500 mx-auto mb-2 sm:mb-3" size={32} />
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
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border-t-4 border-blue-600">
              <div className="text-center">
                <Zap className="text-blue-600 mx-auto mb-2 sm:mb-3" size={32} />
                <p className="text-gray-600 text-xs sm:text-sm mb-2 font-semibold">Score</p>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600">
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

export default COC2;
