import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, BarChart3, Archive, Trash2, Eye, TrendingUp, Award, Clock, Filter, Download, RefreshCw } from 'lucide-react';
import Swal from 'sweetalert2';

function QuizHistory() {
  const navigate = useNavigate();
  const [quizHistory, setQuizHistory] = useState([]);
  const [archivedQuizzes, setArchivedQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('history');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [filterCategory, setFilterCategory] = useState('all');
  const [stats, setStats] = useState(null);
  const [showStats, setShowStats] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const calculateStats = (quizzes) => {
    if (quizzes.length === 0) {
      setStats(null);
      return;
    }

    const totalQuizzes = quizzes.length;
    const averageScore = Math.round(quizzes.reduce((sum, q) => sum + q.score, 0) / totalQuizzes);
    const highestScore = Math.max(...quizzes.map(q => q.score));
    const lowestScore = Math.min(...quizzes.map(q => q.score));
    
    // Category performance
    const categoryStats = {};
    quizzes.forEach(quiz => {
      if (!categoryStats[quiz.category]) {
        categoryStats[quiz.category] = { total: 0, scores: [], count: 0 };
      }
      categoryStats[quiz.category].total += quiz.score;
      categoryStats[quiz.category].scores.push(quiz.score);
      categoryStats[quiz.category].count++;
    });

    // Calculate average per category
    Object.keys(categoryStats).forEach(category => {
      categoryStats[category].average = Math.round(categoryStats[category].total / categoryStats[category].count);
    });

    // Recent trend (last 5 quizzes)
    const recentQuizzes = quizzes.slice(0, 5);
    const recentTrend = recentQuizzes.length >= 2 
      ? Math.round(recentQuizzes[0].score - recentQuizzes[recentQuizzes.length - 1].score)
      : 0;

    setStats({
      totalQuizzes,
      averageScore,
      highestScore,
      lowestScore,
      categoryStats,
      recentTrend,
      recentQuizzes: recentQuizzes.length
    });
  };

  const getFilteredAndSortedQuizzes = (quizzes) => {
    let filtered = quizzes;
    
    // Apply category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(quiz => quiz.category === filterCategory);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.score - a.score;
        case 'category':
          return a.category.localeCompare(b.category);
        case 'date':
        default:
          return new Date(b.completedAt) - new Date(a.completedAt);
      }
    });

    return sorted;
  };

  const getCategories = (quizzes) => {
    const categories = [...new Set(quizzes.map(quiz => quiz.category))];
    return categories;
  };

  const exportHistory = () => {
    const dataToExport = activeTab === 'history' ? quizHistory : archivedQuizzes;
    const csvContent = [
      ['Category', 'Score', 'Correct', 'Total', 'Date', 'Time'],
      ...dataToExport.map(quiz => [
        quiz.category,
        quiz.score,
        quiz.correct,
        quiz.total,
        new Date(quiz.completedAt).toLocaleDateString(),
        new Date(quiz.completedAt).toLocaleTimeString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-history-${activeTab}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const fetchQuizHistory = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/users/quiz-history`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        // Map backend field names to frontend expectations
        const mappedHistory = (data.history || []).map(quiz => ({
          ...quiz,
          correct: quiz.correct_answers,
          total: quiz.total_questions,
          completedAt: quiz.completed_at
        }));
        const mappedArchived = (data.archived || []).map(quiz => ({
          ...quiz,
          correct: quiz.correct_answers,
          total: quiz.total_questions,
          completedAt: quiz.completed_at
        }));
        
        setQuizHistory(mappedHistory);
        setArchivedQuizzes(mappedArchived);
        
        // Calculate statistics
        calculateStats(mappedHistory);
      }
    } catch (error) {
      console.error('Error fetching quiz history:', error);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  // Fetch quiz history on mount
  useEffect(() => {
    fetchQuizHistory();
  }, [fetchQuizHistory]);

  const handleDeleteQuiz = async (quizId) => {
    const result = await Swal.fire({
      title: 'Delete Quiz Record?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Delete'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/api/users/quiz-history/${quizId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          setQuizHistory(quizHistory.filter(q => q.id !== quizId));
          Swal.fire('Deleted!', 'Quiz record has been deleted.', 'success');
        }
      } catch (err) {
        console.error('Error deleting quiz:', err);
        Swal.fire('Error', 'Failed to delete quiz record.', 'error');
      }
    }
  };

  const handleArchiveQuiz = async (quizId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/users/quiz-history/${quizId}/archive`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const quiz = quizHistory.find(q => q.id === quizId);
        setQuizHistory(quizHistory.filter(q => q.id !== quizId));
        setArchivedQuizzes([...archivedQuizzes, { ...quiz, archived_at: new Date().toISOString() }]);
        Swal.fire('Archived!', 'Quiz has been moved to archive.', 'success');
      }
    } catch (err) {
      console.error('Error archiving quiz:', err);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-50';
    if (score >= 60) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
            <p className="mt-4 text-blue-600 font-semibold">Loading quiz history...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-4 sm:py-6 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
          >
            <ChevronLeft size={20} />
            <span className="font-semibold">Back to Dashboard</span>
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowStats(!showStats)}
              className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow hover:shadow-md transition text-sm"
            >
              <BarChart3 size={16} />
              <span className="hidden sm:inline">{showStats ? 'Hide' : 'Show'} Stats</span>
            </button>
            <button
              onClick={exportHistory}
              className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow hover:shadow-md transition text-sm"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button
              onClick={fetchQuizHistory}
              className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow hover:shadow-md transition text-sm"
            >
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-2">Quiz History</h1>
          <p className="text-gray-600 text-sm sm:text-base">Track your quiz progress and performance</p>
        </div>

        {/* Statistics Dashboard */}
        {showStats && stats && (
          <div className="mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <BarChart3 className="text-blue-600" size={20} />
                  <span className="text-xs sm:text-sm text-gray-500">Total</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-blue-900">{stats.totalQuizzes}</div>
                <div className="text-xs sm:text-sm text-gray-600">Quizzes Taken</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <Award className="text-green-600" size={20} />
                  <span className="text-xs sm:text-sm text-gray-500">Average</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-green-600">{stats.averageScore}%</div>
                <div className="text-xs sm:text-sm text-gray-600">Score</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="text-purple-600" size={20} />
                  <span className="text-xs sm:text-sm text-gray-500">Highest</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-purple-600">{stats.highestScore}%</div>
                <div className="text-xs sm:text-sm text-gray-600">Score</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="text-orange-600" size={20} />
                  <span className="text-xs sm:text-sm text-gray-500">Trend</span>
                </div>
                <div className={`text-xl sm:text-2xl font-bold ${stats.recentTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.recentTrend >= 0 ? '+' : ''}{stats.recentTrend}%
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Last 5</div>
              </div>
            </div>

            {/* Category Performance */}
            {Object.keys(stats.categoryStats).length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4">Category Performance</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.entries(stats.categoryStats).map(([category, data]) => (
                    <div key={category} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-semibold text-gray-800">{category}</div>
                        <div className="text-xs text-gray-600">{data.count} quizzes</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getScoreColor(data.average)}`}>
                          {data.average}%
                        </div>
                        <div className="text-xs text-gray-600">avg</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tabs and Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                activeTab === 'history'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-blue-600 border-2 border-blue-200 hover:border-blue-400'
              }`}
            >
              <BarChart3 size={18} />
              Recent ({quizHistory.length})
            </button>
            <button
              onClick={() => setActiveTab('archived')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                activeTab === 'archived'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-blue-600 border-2 border-blue-200 hover:border-blue-400'
              }`}
            >
              <Archive size={18} />
              Archived ({archivedQuizzes.length})
            </button>
          </div>

          {/* Filters and Sorting */}
          {(activeTab === 'history' ? quizHistory : archivedQuizzes).length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 bg-white rounded-lg shadow">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-600" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  {getCategories(activeTab === 'history' ? quizHistory : archivedQuizzes).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="date">Date</option>
                  <option value="score">Score</option>
                  <option value="category">Category</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Recent Quiz History */}
        {activeTab === 'history' && (
          <div className="space-y-3 sm:space-y-4">
            {getFilteredAndSortedQuizzes(quizHistory).length > 0 ? (
              getFilteredAndSortedQuizzes(quizHistory).map(quiz => (
                <div
                  key={quiz.id}
                  className={`bg-white rounded-xl shadow-lg p-3 sm:p-6 border-l-4 border-blue-600 hover:shadow-xl transition ${getScoreBg(quiz.score)}`}
                >
                  <div className="flex flex-col gap-3">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row items-start gap-2 mb-2">
                          <h3 className="text-base sm:text-lg font-bold text-blue-900">{quiz.category}</h3>
                          <span className="text-xs sm:text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                            {quiz.correct}/{quiz.total} Correct
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(quiz.completedAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <BarChart3 size={14} />
                            {new Date(quiz.completedAt).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                      
                      {/* Score and Actions */}
                      <div className="flex flex-row sm:flex-col items-end gap-2">
                        <div className={`text-2xl sm:text-3xl font-bold ${getScoreColor(quiz.score)}`}>
                          {quiz.score}%
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => setSelectedQuiz(quiz)}
                            className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleArchiveQuiz(quiz.id)}
                            className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                            title="Archive"
                          >
                            <Archive size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteQuiz(quiz.id)}
                            className="p-1.5 sm:p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
                <BarChart3 size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600 text-base sm:text-lg">
                  {filterCategory !== 'all' ? `No quizzes found in "${filterCategory}" category.` : 'No quiz history yet. Start taking quizzes to see your progress!'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Archived Quizzes */}
        {activeTab === 'archived' && (
          <div className="space-y-3 sm:space-y-4">
            {getFilteredAndSortedQuizzes(archivedQuizzes).length > 0 ? (
              getFilteredAndSortedQuizzes(archivedQuizzes).map(quiz => (
                <div
                  key={quiz.id}
                  className={`bg-white rounded-xl shadow-lg p-3 sm:p-6 border-l-4 border-gray-400 opacity-75 ${getScoreBg(quiz.score)}`}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4 mb-2">
                        <h3 className="text-base sm:text-lg font-bold text-gray-700">{quiz.category}</h3>
                        <span className="text-xs sm:text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded-full font-semibold">
                          Archived
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(quiz.completedAt).toLocaleDateString()}
                        </div>
                        {quiz.archived_at && (
                          <div className="flex items-center gap-1">
                            <Archive size={14} />
                            Archived {new Date(quiz.archived_at).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className={`text-2xl sm:text-3xl font-bold ${getScoreColor(quiz.score)}`}>
                        {quiz.score}%
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
                <Archive size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600 text-base sm:text-lg">
                  {filterCategory !== 'all' ? `No archived quizzes found in "${filterCategory}" category.` : 'No archived quizzes yet.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Quiz Details Modal */}
        {selectedQuiz && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-blue-900">{selectedQuiz.category}</h2>
                <button
                  onClick={() => setSelectedQuiz(null)}
                  className="p-1 text-gray-500 hover:text-gray-700 transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                {/* Score Overview */}
                <div className="text-center py-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <div className={`text-4xl sm:text-5xl font-bold ${getScoreColor(selectedQuiz.score)}`}>
                    {selectedQuiz.score}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Final Score</div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{selectedQuiz.correct}</div>
                    <div className="text-xs text-gray-600">Correct Answers</div>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-600">{selectedQuiz.total - selectedQuiz.correct}</div>
                    <div className="text-xs text-gray-600">Wrong Answers</div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600 text-sm">Total Questions:</span>
                    <span className="font-semibold text-blue-600">{selectedQuiz.total}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600 text-sm">Accuracy Rate:</span>
                    <span className="font-semibold text-blue-600">
                      {Math.round((selectedQuiz.correct / selectedQuiz.total) * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600 text-sm">Quiz Type:</span>
                    <span className="font-semibold text-blue-600">{selectedQuiz.quiz_type || 'Standard'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600 text-sm">Completed:</span>
                    <span className="text-sm text-gray-700">
                      {new Date(selectedQuiz.completedAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Performance Message */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-700 text-center">
                    {selectedQuiz.score >= 90 && "🏆 Outstanding performance! You're mastering this topic!"}
                    {selectedQuiz.score >= 80 && selectedQuiz.score < 90 && "🌟 Great job! You're doing very well!"}
                    {selectedQuiz.score >= 70 && selectedQuiz.score < 80 && "👍 Good work! Keep practicing to improve!"}
                    {selectedQuiz.score >= 60 && selectedQuiz.score < 70 && "📚 Not bad! Review the material and try again."}
                    {selectedQuiz.score < 60 && "💪 Keep studying! Practice makes perfect!"}
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedQuiz(null)}
                className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Close Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizHistory;
