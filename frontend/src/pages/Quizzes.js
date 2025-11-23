import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, BarChart3, Clock } from 'lucide-react';

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState('all');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/quizzes`);
        if (response.ok) {
          const data = await response.json();
          setQuizzes(data);
        }
      } catch (error) {
        console.error('Failed to fetch quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const filteredQuizzes = difficulty === 'all' ? quizzes : quizzes.filter(q => q.difficulty === difficulty);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">CSS Quizzes</h1>
          <p className="text-xl text-blue-100">Test your knowledge and track your progress</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {['all', 'beginner', 'intermediate', 'advanced'].map(diff => (
            <button
              key={diff}
              onClick={() => setDifficulty(diff)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                difficulty === diff
                  ? 'bg-white text-purple-600'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              {diff.charAt(0).toUpperCase() + diff.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map(quiz => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        )}

        {!loading && filteredQuizzes.length === 0 && (
          <div className="text-center py-20">
            <Zap size={48} className="mx-auto text-white mb-4 opacity-50" />
            <p className="text-white text-lg">No quizzes found in this difficulty</p>
          </div>
        )}
      </div>
    </div>
  );
}

function QuizCard({ quiz }) {
  const difficultyColor = {
    beginner: 'bg-green-500',
    intermediate: 'bg-yellow-500',
    advanced: 'bg-red-500'
  };

  return (
    <Link to={`/quizzes/${quiz.id}`}>
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20 card-hover h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-white flex-1">{quiz.title}</h3>
          <span className={`${difficultyColor[quiz.difficulty]} text-white text-xs font-bold px-3 py-1 rounded-full`}>
            {quiz.difficulty.toUpperCase()}
          </span>
        </div>

        <p className="text-blue-100 text-sm mb-6 flex-1">{quiz.description}</p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-blue-200 text-sm">
            <Zap size={16} className="mr-2" />
            <span>{quiz.questionCount} Questions</span>
          </div>
          <div className="flex items-center text-blue-200 text-sm">
            <Clock size={16} className="mr-2" />
            <span>{quiz.timeLimit} minutes</span>
          </div>
          {quiz.bestScore !== undefined && (
            <div className="flex items-center text-green-300 text-sm">
              <BarChart3 size={16} className="mr-2" />
              <span>Best Score: {quiz.bestScore}%</span>
            </div>
          )}
        </div>

        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition">
          Start Quiz →
        </button>
      </div>
    </Link>
  );
}

export default Quizzes;
