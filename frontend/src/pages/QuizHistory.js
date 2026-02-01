import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, BarChart3, Archive, Trash2, Eye } from 'lucide-react';
import Swal from 'sweetalert2';

function QuizHistory() {
  const navigate = useNavigate();
  const [quizHistory, setQuizHistory] = useState([]);
  const [archivedQuizzes, setArchivedQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('history');
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const fetchQuizHistory = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/users/quiz-history`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setQuizHistory(data.history || []);
        setArchivedQuizzes(data.archived || []);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-6 sm:py-8 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition"
        >
          <ChevronLeft size={20} />
          <span className="font-semibold">Back to Dashboard</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-2">Quiz History</h1>
          <p className="text-gray-600">Track your quiz progress and performance</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
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

        {/* Recent Quiz History */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {quizHistory.length > 0 ? (
              quizHistory.map(quiz => (
                <div
                  key={quiz.id}
                  className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 border-l-4 border-blue-600 hover:shadow-xl transition ${getScoreBg(quiz.score)}`}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-blue-900">{quiz.category}</h3>
                        <span className="text-xs sm:text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                          {quiz.correct}/{quiz.total} Correct
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          {new Date(quiz.completedAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <BarChart3 size={16} />
                          {new Date(quiz.completedAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className={`text-3xl sm:text-4xl font-bold ${getScoreColor(quiz.score)}`}>
                        {quiz.score}%
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedQuiz(quiz)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleArchiveQuiz(quiz.id)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                          title="Archive"
                        >
                          <Archive size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteQuiz(quiz.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <BarChart3 size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600 text-lg">No quiz history yet. Start taking quizzes to see your progress!</p>
              </div>
            )}
          </div>
        )}

        {/* Archived Quizzes */}
        {activeTab === 'archived' && (
          <div className="space-y-4">
            {archivedQuizzes.length > 0 ? (
              archivedQuizzes.map(quiz => (
                <div
                  key={quiz.id}
                  className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 border-l-4 border-gray-400 opacity-75 ${getScoreBg(quiz.score)}`}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-700">{quiz.category}</h3>
                        <span className="text-xs sm:text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-semibold">
                          Archived
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          {new Date(quiz.completedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className={`text-3xl sm:text-4xl font-bold ${getScoreColor(quiz.score)}`}>
                        {quiz.score}%
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <Archive size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600 text-lg">No archived quizzes yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Quiz Details Modal */}
        {selectedQuiz && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">{selectedQuiz.category}</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Score:</span>
                  <span className={`text-2xl font-bold ${getScoreColor(selectedQuiz.score)}`}>
                    {selectedQuiz.score}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Correct Answers:</span>
                  <span className="text-lg font-semibold text-blue-600">
                    {selectedQuiz.correct}/{selectedQuiz.total}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Completed:</span>
                  <span className="text-sm text-gray-700">
                    {new Date(selectedQuiz.completedAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedQuiz(null)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizHistory;
