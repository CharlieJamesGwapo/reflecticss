import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Zap, BarChart3, Clock, Calendar, Flame } from 'lucide-react';

function Dashboard({ user }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    lessonsCompleted: 0,
    quizzesAttempted: 0,
    averageScore: 0,
    streakDays: 0
  });
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Get API URL with fallback
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleStartLearning = () => {
    navigate('/reviewer-selection');
  };

  const handleTakeQuiz = () => {
    navigate('/coc-selection');
  };

  // Real-time date/time update
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('📊 Fetching stats...');
        console.log('  API URL:', API_URL);
        console.log('  Token exists:', !!token);
        
        if (token) {
          const response = await fetch(`${API_URL}/api/users/stats`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          console.log('  Response status:', response.status);
          
          if (response.ok) {
            const data = await response.json();
            console.log('✅ Stats fetched:', data);
            setStats(data);
          } else {
            console.error('❌ Failed to fetch stats:', response.status);
          }
        } else {
          console.warn('⚠️ No token found');
        }
      } catch (error) {
        console.error('❌ Error fetching stats:', error);
      }
    };

    fetchStats();
    // Refresh stats every 5 seconds for real-time updates
    const statsInterval = setInterval(fetchStats, 5000);
    return () => clearInterval(statsInterval);
  }, [API_URL]);

  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-3 sm:px-4 py-6 sm:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Profile Section - Mobile Responsive */}
        {user && (
          <div className="mb-8 bg-white rounded-xl shadow-lg p-4 sm:p-6 border-t-4 border-blue-600">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-blue-600 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold text-2xl sm:text-3xl overflow-hidden flex-shrink-0 shadow-lg">
                {user.profile_photo ? (
                  <img src={user.profile_photo} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-1">{user.name}</h2>
                <p className="text-gray-600 text-sm sm:text-base mb-2">{user.email}</p>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">Active Learner</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">Verified</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Date/Time Header - Mobile Responsive */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-600">
            <div className="flex items-center gap-3">
              <Calendar className="text-blue-600 flex-shrink-0" size={20} />
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-600">Date</p>
                <p className="text-base sm:text-lg font-bold text-blue-900 truncate">{formattedDate}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-600">
            <div className="flex items-center gap-3">
              <Clock className="text-blue-600 flex-shrink-0" size={20} />
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-600">Time</p>
                <p className="text-base sm:text-lg font-bold text-blue-900 font-mono">{formattedTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 animate-fadeIn">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-3 sm:mb-4">
            Welcome to RefletiCSS
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 px-2">
            Master Operating Systems and Computer Software through interactive learning
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
            <button 
              onClick={handleStartLearning}
              className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg text-sm sm:text-base"
            >
              Start Learning
            </button>
            <button 
              onClick={handleTakeQuiz}
              className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-blue-600 font-bold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition shadow-lg text-sm sm:text-base"
            >
              Take a Quiz
            </button>
          </div>
        </div>

        {/* Stats Section - Real-Time Data */}
        {user && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            <StatCard
              icon={<BookOpen size={28} />}
              title="Lessons Completed"
              value={stats.lessonsCompleted}
              color="blue"
            />
            <StatCard
              icon={<Zap size={28} />}
              title="Quizzes Attempted"
              value={stats.quizzesAttempted}
              color="yellow"
            />
            <StatCard
              icon={<BarChart3 size={28} />}
              title="Average Score"
              value={`${stats.averageScore}%`}
              color="purple"
            />
            <StatCard
              icon={<Flame size={28} />}
              title="Streak Days"
              value={stats.streakDays}
              color="red"
            />
          </div>
        )}

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<BookOpen size={40} />}
            title="Comprehensive Lessons"
            description="Learn CSS from basics to advanced concepts with structured lessons covering COC 1-4"
            link="/lessons"
            linkText="Explore Lessons"
          />
          <FeatureCard
            icon={<Zap size={40} />}
            title="Interactive Quizzes"
            description="Test your knowledge with dynamic quizzes that adapt to your learning pace"
            link="/quizzes"
            linkText="Take Quiz"
          />
          <FeatureCard
            icon={<BarChart3 size={40} />}
            title="Smart Flashcards"
            description="Reinforce learning with spaced repetition flashcards for quick reviews"
            link="/flashcards"
            linkText="Review Cards"
          />
        </div>

        {/* CTA Section */}
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 md:p-12 text-center border border-white border-opacity-20">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Level Up Your CSS Skills?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of learners mastering CSS fundamentals
          </p>
          <Link to="/lessons" className="btn-primary inline-block">
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color = 'blue' }) {
  const colorClasses = {
    blue: 'border-blue-600 text-blue-600',
    yellow: 'border-yellow-500 text-yellow-500',
    purple: 'border-purple-600 text-purple-600',
    red: 'border-red-500 text-red-500',
    green: 'border-green-600 text-green-600'
  };

  const borderClass = colorClasses[color] || colorClasses.blue;

  return (
    <div className={`bg-white rounded-xl p-4 sm:p-6 shadow-lg border-t-4 ${borderClass} hover:shadow-xl transition`}>
      <div className={`${borderClass.split(' ')[1]} mb-3 sm:mb-4`}>{icon}</div>
      <h3 className="text-gray-600 text-xs sm:text-sm font-semibold mb-2">{title}</h3>
      <p className="text-2xl sm:text-3xl font-bold text-blue-900">{value}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description, link, linkText }) {
  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border-t-4 border-blue-600 hover:shadow-xl transition text-center">
      <div className="text-blue-600 mb-3 sm:mb-4 flex justify-center">{icon}</div>
      <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2 sm:mb-3">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{description}</p>
      <Link to={link} className="text-blue-600 font-semibold hover:text-blue-800 transition text-sm sm:text-base">
        {linkText} →
      </Link>
    </div>
  );
}

export default Dashboard;
