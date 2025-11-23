import React, { useState, useEffect } from 'react';
import { BookOpen, Users, HelpCircle, BarChart3, Filter, AlertCircle, CheckCircle, ChevronRight, ChevronLeft, RotateCcw, Zap } from 'lucide-react';

function COC1() {
  const [activeTab, setActiveTab] = useState('terms');
  const [terms, setTerms] = useState([]);
  const [reviewers, setReviewers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [quizStats, setQuizStats] = useState({ correct: 0, total: 0 });
  const [expandedTerm, setExpandedTerm] = useState(null);

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

  // Fetch reviewers
  useEffect(() => {
    if (activeTab === 'reviewers') {
      fetchReviewers();
    }
  }, [activeTab, selectedCategory]);

  const fetchReviewers = async () => {
    setLoading(true);
    setError('');
    try {
      const url = selectedCategory
        ? `${API_URL}/api/coc1/reviewers?category=${encodeURIComponent(selectedCategory)}`
        : `${API_URL}/api/coc1/reviewers`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch reviewers');
      const data = await response.json();
      setReviewers(data || []);
    } catch (err) {
      console.error('Error fetching reviewers:', err);
      setError('Failed to load reviewers. Please try again.');
      setReviewers([]);
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

  const fetchQuestions = async () => {
    setLoading(true);
    setError('');
    try {
      const url = selectedCategory
        ? `${API_URL}/api/coc1/quiz/questions?category=${encodeURIComponent(selectedCategory)}`
        : `${API_URL}/api/coc1/quiz/questions`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch questions');
      const data = await response.json();
      setQuestions(data || []);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setQuizStats({ correct: 0, total: 0 });
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError('Failed to load quiz questions. Please try again.');
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user progress
  useEffect(() => {
    if (activeTab === 'progress') {
      fetchProgress();
    }
  }, [activeTab]);

  const fetchProgress = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/coc1/progress`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch progress');
      const data = await response.json();
      setUserProgress(data);
    } catch (err) {
      console.error('Error fetching progress:', err);
      setError('Failed to load progress');
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
    setShowResult(true);

    if (isCorrect) {
      setQuizStats(prev => ({
        ...prev,
        correct: prev.correct + 1,
        total: prev.total + 1
      }));
    } else {
      setQuizStats(prev => ({
        ...prev,
        total: prev.total + 1
      }));
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
  const userProgress = null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            COC 1: Continuation
          </h1>
          <p className="text-gray-600 text-lg">Master Operating Systems and Computer Software</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-center gap-3">
            <AlertCircle className="text-red-600" size={20} />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {[
            { id: 'terms', label: 'Terms', icon: BookOpen },
            { id: 'reviewers', label: 'Reviewers', icon: Users },
            { id: 'quiz', label: 'Quiz', icon: HelpCircle },
            { id: 'progress', label: 'Progress', icon: BarChart3 }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
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
        {(activeTab === 'terms' || activeTab === 'reviewers' || activeTab === 'quiz') && (
          <div className="mb-6 flex flex-wrap items-center gap-4 justify-center">
            <Filter size={20} className="text-blue-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
            <p className="text-blue-600 font-semibold text-lg">Loading...</p>
          </div>
        )}

        {/* Terms Tab */}
        {activeTab === 'terms' && !loading && (
          <div className="grid gap-4">
            {terms.length > 0 ? (
              terms.map(term => (
                <div
                  key={term.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border-l-4 border-blue-600"
                  onClick={() => setExpandedTerm(expandedTerm === term.id ? null : term.id)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-blue-900">{term.term_name}</h3>
                      <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {term.category}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{term.definition}</p>
                    {expandedTerm === term.id && term.example && (
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-600 p-4 rounded mt-3 animate-fadeIn">
                        <p className="text-sm text-gray-700"><strong>Example:</strong> {term.example}</p>
                      </div>
                    )}
                  </div>
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

        {/* Reviewers Tab */}
        {activeTab === 'reviewers' && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviewers.length > 0 ? (
              reviewers.map(reviewer => (
                <div key={reviewer.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-t-4 border-gradient-to-r from-blue-600 to-purple-600 p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="text-white" size={28} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-blue-900">{reviewer.reviewer_name}</h3>
                      <p className="text-blue-600 text-sm font-semibold">{reviewer.category}</p>
                    </div>
                  </div>
                  {reviewer.description && (
                    <p className="text-gray-700 text-sm">{reviewer.description}</p>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-white rounded-xl">
                <AlertCircle className="mx-auto text-gray-400 mb-3" size={32} />
                <p className="text-gray-600">No reviewers found.</p>
              </div>
            )}
          </div>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && !loading && questions.length > 0 && currentQuestion && (
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-blue-600">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="text-sm font-semibold text-green-600">
                  ✓ {quizStats.correct}/{quizStats.total} Correct
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>

            {/* Difficulty Badge */}
            <div className="flex items-center gap-2 mb-6">
              <Zap size={16} className="text-yellow-500" />
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {currentQuestion.difficulty?.toUpperCase()}
              </span>
            </div>

            {/* Question */}
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-8">{currentQuestion.question_text}</h2>

            {/* Answer Choices */}
            <div className="space-y-3 mb-8">
              {currentQuestion.choices?.map((choice, index) => {
                const isSelected = selectedAnswer === choice.id;
                const isCorrect = choice.is_correct;
                const showCorrect = showResult && isCorrect;
                const showIncorrect = showResult && isSelected && !isCorrect;

                return (
                  <button
                    key={choice.id}
                    onClick={() => handleAnswerSelect(choice.id)}
                    disabled={showResult}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all transform hover:scale-102 ${
                      showCorrect
                        ? 'border-green-500 bg-green-50'
                        : showIncorrect
                        ? 'border-red-500 bg-red-50'
                        : isSelected
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-400'
                    } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            showCorrect
                              ? 'border-green-500 bg-green-500'
                              : showIncorrect
                              ? 'border-red-500 bg-red-500'
                              : isSelected
                              ? 'border-blue-600 bg-blue-600'
                              : 'border-gray-300'
                          }`}
                        >
                          {(showCorrect || showIncorrect || isSelected) && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="font-medium text-gray-800">{choice.choice_text}</span>
                      </div>
                      {showCorrect && <CheckCircle className="text-green-500" size={20} />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Result Message */}
            {showResult && (
              <div className={`mb-6 p-4 rounded-lg border-l-4 ${
                isAnswerCorrect
                  ? 'bg-green-50 border-green-500'
                  : 'bg-red-50 border-red-500'
              }`}>
                <p className={`font-semibold ${isAnswerCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isAnswerCorrect ? '✓ Correct!' : '✗ Incorrect'}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 justify-between">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-2 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              {!showResult ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                >
                  Submit Answer
                </button>
              ) : currentQuestionIndex === questions.length - 1 ? (
                <button
                  onClick={handleRestartQuiz}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
                >
                  <RotateCcw size={20} />
                  Restart Quiz
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* No Questions */}
        {activeTab === 'quiz' && !loading && questions.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl">
            <AlertCircle className="mx-auto text-gray-400 mb-3" size={40} />
            <p className="text-gray-600 text-lg">No quiz questions available.</p>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-8 text-center border-t-4 border-blue-600">
              <BarChart3 className="text-blue-600 mx-auto mb-4" size={40} />
              <p className="text-gray-600 text-sm mb-2 font-semibold">Total Questions</p>
              <p className="text-5xl font-bold text-blue-900">{quizStats.total}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8 text-center border-t-4 border-green-600">
              <CheckCircle className="text-green-600 mx-auto mb-4" size={40} />
              <p className="text-gray-600 text-sm mb-2 font-semibold">Correct Answers</p>
              <p className="text-5xl font-bold text-green-600">{quizStats.correct}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8 text-center border-t-4 border-purple-600">
              <Zap className="text-purple-600 mx-auto mb-4" size={40} />
              <p className="text-gray-600 text-sm mb-2 font-semibold">Score</p>
              <p className="text-5xl font-bold text-purple-600">
                {quizStats.total > 0 ? ((quizStats.correct / quizStats.total) * 100).toFixed(1) : 0}%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default COC1;
