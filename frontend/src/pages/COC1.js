import React, { useState, useEffect } from 'react';
import { BookOpen, HelpCircle, BarChart3, Filter, AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';
import Swal from 'sweetalert2';

function COC1() {
  const [activeTab, setActiveTab] = useState('terms');
  const [terms, setTerms] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [correctAnswerId, setCorrectAnswerId] = useState(null);
  const [quizStats, setQuizStats] = useState({ correct: 0, total: 0 });
  const [expandedTerm, setExpandedTerm] = useState(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [quizStarted, setQuizStarted] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/api/coc1/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data || []);
      setError('');
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
    }
  };

  // Fetch terms
  useEffect(() => {
    if (activeTab === 'terms') {
      fetchTerms();
    }
  }, [activeTab, selectedCategory]);

  const fetchTerms = async () => {
    setLoading(true);
    setError('');
    try {
      const url = selectedCategory
        ? `${API_URL}/api/coc1/terms?category=${encodeURIComponent(selectedCategory)}`
        : `${API_URL}/api/coc1/terms`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch terms');
      const data = await response.json();
      setTerms(data || []);
    } catch (err) {
      console.error('Error fetching terms:', err);
      setError('Failed to load terms. Please try again.');
      setTerms([]);
    } finally {
      setLoading(false);
    }
  };


  // Fetch quiz questions
  useEffect(() => {
    if (activeTab === 'quiz') {
      fetchQuestions();
    }
  }, [activeTab, selectedCategory]);

  // Timer effect
  useEffect(() => {
    if (!showResult && activeTab === 'quiz' && quizStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult && activeTab === 'quiz' && quizStarted) {
      // Auto-submit when time runs out
      handleSubmitAnswer();
    }
  }, [timeLeft, showResult, activeTab, quizStarted]);

  const fetchQuestions = async () => {
    setLoading(true);
    setError('');
    try {
      const url = selectedCategory
        ? `${API_URL}/api/coc1/quiz/questions?category=${encodeURIComponent(selectedCategory)}`
        : `${API_URL}/api/coc1/quiz/questions`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch questions');
      let data = await response.json();
      
      // Fetch choices for each question
      const questionsWithChoices = await Promise.all(
        data.map(async (question) => {
          try {
            const choicesResponse = await fetch(`${API_URL}/api/coc1/quiz/questions/${question.id}`);
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
      setQuizStarted(true);
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError('Failed to load quiz questions. Please try again.');
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (choiceId) => {
    if (!showResult) {
      setSelectedAnswer(choiceId);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer || !questions[currentQuestionIndex]) return;

    const currentQ = questions[currentQuestionIndex];
    const correctChoice = currentQ.choices?.find(c => c.is_correct);
    const isCorrect = selectedAnswer === correctChoice?.id;

    setIsAnswerCorrect(isCorrect);
    setCorrectAnswerId(correctChoice?.id);
    setShowResult(true);

    if (isCorrect) {
      setQuizStats(prev => ({
        ...prev,
        correct: prev.correct + 1,
        total: prev.total + 1
      }));
      
      // Show success alert
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
      
      // Show error alert with correct answer
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

    // Submit to backend
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/api/coc1/quiz/submit`, {
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
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsAnswerCorrect(null);
      setCorrectAnswerId(null);
      setTimeLeft(20);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsAnswerCorrect(null);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizStats({ correct: 0, total: 0 });
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">COC 1</h1>
          <p className="text-blue-600">Master Operating Systems and Computer Software</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'terms', label: 'Terms', icon: BookOpen },
            { id: 'quiz', label: 'Quiz', icon: HelpCircle },
            { id: 'progress', label: 'Progress', icon: BarChart3 }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-blue-600 border-2 border-blue-200 hover:border-blue-400'
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Category Filter */}
        {(activeTab === 'terms' || activeTab === 'quiz') && (
          <div className="mb-6 flex items-center gap-4">
            <Filter size={20} className="text-blue-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-600"
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

        {/* Terms Tab */}
        {activeTab === 'terms' && !loading && (
          <div className="grid gap-6">
            {terms && terms.length > 0 ? (
              terms.map(term => (
                <div key={term.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-blue-900">{term.term_name}</h3>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {term.category}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{term.definition}</p>
                  {term.example && (
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-3">
                      <p className="text-sm text-gray-600"><strong>Example:</strong> {term.example}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl">
                <AlertCircle className="mx-auto text-gray-400 mb-3" size={32} />
                <p className="text-gray-600">No terms found. Try a different category.</p>
              </div>
            )}
          </div>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && !loading && currentQuestion && (
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            {/* Header with Timer */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <span className="text-blue-600 font-semibold text-lg">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <div className="flex gap-4">
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                    {currentQuestion.difficulty}
                  </span>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${
                    timeLeft <= 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    <Clock size={18} />
                    <span>{timeLeft}s</span>
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all"
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>

            {/* Question Text */}
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-8">{currentQuestion.question_text}</h2>

            {/* Answer Choices */}
            <div className="space-y-3 mb-8">
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
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all transform hover:scale-102 ${
                        showAsCorrect
                          ? 'border-green-500 bg-green-50'
                          : showAsWrong
                          ? 'border-red-500 bg-red-50'
                          : isSelected && !showResult
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-400'
                      } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-bold ${
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
                        <span className="font-medium text-gray-800 flex-1">{choice.choice_text}</span>
                        {showAsCorrect && <CheckCircle className="text-green-600 flex-shrink-0" size={24} />}
                        {showAsWrong && <AlertCircle className="text-red-600 flex-shrink-0" size={24} />}
                      </div>
                    </button>
                  );
                })
              ) : (
                <p className="text-gray-600">No answer choices available.</p>
              )}
            </div>


            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              {!showResult && (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer}
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Submit Answer
                </button>
              )}

              {showResult && currentQuestionIndex < questions.length - 1 && (
                <button
                  onClick={handleNextQuestion}
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                  Next Question
                </button>
              )}

              {showResult && currentQuestionIndex === questions.length - 1 && (
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                  <p className="text-blue-800 font-bold">Quiz Completed!</p>
                  <p className="text-blue-700 text-sm mt-1">Check your progress in the Progress tab.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-600">
              <div className="text-center">
                <BarChart3 className="text-blue-600 mx-auto mb-3" size={40} />
                <p className="text-gray-600 text-sm mb-2 font-semibold">Total Questions</p>
                <p className="text-5xl font-bold text-blue-900">{quizStats.total}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-600">
              <div className="text-center">
                <CheckCircle className="text-green-600 mx-auto mb-3" size={40} />
                <p className="text-gray-600 text-sm mb-2 font-semibold">Correct Answers</p>
                <p className="text-5xl font-bold text-green-600">{quizStats.correct}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-600">
              <div className="text-center">
                <Zap className="text-purple-600 mx-auto mb-3" size={40} />
                <p className="text-gray-600 text-sm mb-2 font-semibold">Score</p>
                <p className="text-5xl font-bold text-purple-600">
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

export default COC1;
