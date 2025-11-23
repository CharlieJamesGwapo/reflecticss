import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

function LessonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/lessons/${id}`);
        if (response.ok) {
          const data = await response.json();
          setLesson(data);
        }
      } catch (error) {
        console.error('Failed to fetch lesson:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  const handleMarkComplete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/lessons/${id}/complete`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        setCompleted(true);
      }
    } catch (error) {
      console.error('Failed to mark lesson complete:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="text-center py-20">
        <p className="text-white text-xl">Lesson not found</p>
      </div>
    );
  }

  const sections = lesson.sections || [];
  const currentSectionData = sections[currentSection];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate('/lessons')}
          className="flex items-center text-white hover:text-blue-200 mb-6 transition"
        >
          <ChevronLeft size={24} />
          <span>Back to Lessons</span>
        </button>

        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl border border-white border-opacity-20 overflow-hidden">
          {/* Title Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 md:p-12">
            <h1 className="text-4xl font-bold text-white mb-4">{lesson.title}</h1>
            <p className="text-blue-100 text-lg">{lesson.description}</p>
            <div className="mt-6 flex items-center space-x-4">
              <span className="text-blue-200">{lesson.duration} minutes</span>
              <span className="text-blue-200">•</span>
              <span className="text-blue-200">Section {currentSection + 1} of {sections.length}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {currentSectionData && (
              <div className="animate-fadeIn">
                <h2 className="text-3xl font-bold text-white mb-6">{currentSectionData.title}</h2>
                <div className="prose prose-invert max-w-none mb-8">
                  <p className="text-blue-100 text-lg leading-relaxed mb-6">
                    {currentSectionData.content}
                  </p>

                  {currentSectionData.codeExample && (
                    <div className="bg-gray-900 rounded-lg p-6 mb-6 overflow-x-auto">
                      <pre className="text-green-400 font-mono text-sm">
                        <code>{currentSectionData.codeExample}</code>
                      </pre>
                    </div>
                  )}

                  {currentSectionData.imageUrl && (
                    <img
                      src={currentSectionData.imageUrl}
                      alt={currentSectionData.title}
                      className="w-full rounded-lg mb-6"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-white border-opacity-20">
              <button
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition"
              >
                <ChevronLeft size={20} />
                <span>Previous</span>
              </button>

              <div className="flex space-x-2">
                {sections.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSection(idx)}
                    className={`w-3 h-3 rounded-full transition ${
                      idx === currentSection ? 'bg-white' : 'bg-white bg-opacity-30 hover:bg-opacity-50'
                    }`}
                  />
                ))}
              </div>

              {currentSection === sections.length - 1 ? (
                <button
                  onClick={handleMarkComplete}
                  disabled={completed}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white rounded-lg transition"
                >
                  <CheckCircle size={20} />
                  <span>{completed ? 'Completed' : 'Mark Complete'}</span>
                </button>
              ) : (
                <button
                  onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                >
                  <span>Next</span>
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonDetail;
