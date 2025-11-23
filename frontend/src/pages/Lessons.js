import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, Lock, CheckCircle } from 'lucide-react';

function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/lessons`);
        if (response.ok) {
          const data = await response.json();
          setLessons(data);
        }
      } catch (error) {
        console.error('Failed to fetch lessons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const filteredLessons = filter === 'all' ? lessons : lessons.filter(l => l.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">CSS Lessons</h1>
          <p className="text-xl text-blue-100">Master CSS fundamentals with our comprehensive lessons</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {['all', 'basics', 'selectors', 'layout', 'advanced'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                filter === cat
                  ? 'bg-white text-purple-600'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
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
            {filteredLessons.map(lesson => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        )}

        {!loading && filteredLessons.length === 0 && (
          <div className="text-center py-20">
            <BookOpen size={48} className="mx-auto text-white mb-4 opacity-50" />
            <p className="text-white text-lg">No lessons found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}

function LessonCard({ lesson }) {
  const isCompleted = lesson.completed;
  const isLocked = lesson.locked;

  return (
    <Link to={`/lessons/${lesson.id}`}>
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl overflow-hidden border border-white border-opacity-20 card-hover h-full">
        {/* Image */}
        {lesson.imageUrl && (
          <div className="h-40 bg-gradient-to-br from-blue-400 to-purple-400 overflow-hidden">
            <img src={lesson.imageUrl} alt={lesson.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-white flex-1">{lesson.title}</h3>
            {isCompleted && <CheckCircle size={24} className="text-green-400 flex-shrink-0 ml-2" />}
            {isLocked && <Lock size={24} className="text-yellow-400 flex-shrink-0 ml-2" />}
          </div>

          <p className="text-blue-100 text-sm mb-4 line-clamp-2">{lesson.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-xs bg-blue-500 bg-opacity-30 text-blue-200 px-3 py-1 rounded-full">
              {lesson.category}
            </span>
            <span className="text-blue-200 flex items-center">
              {lesson.duration} min <ChevronRight size={18} />
            </span>
          </div>

          {/* Progress Bar */}
          {lesson.progress !== undefined && (
            <div className="mt-4 bg-white bg-opacity-10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all"
                style={{ width: `${lesson.progress}%` }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default Lessons;
