import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Zap, BarChart3, Clock, Calendar, TrendingUp, Award, Flame } from 'lucide-react';
import Swal from 'sweetalert2';

function Dashboard({ user }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    lessonsCompleted: 0,
    quizzesAttempted: 0,
    averageScore: 0,
    streakDays: 0
  });
  const [loading, setLoading] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

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
        if (token) {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/stats`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.ok) {
            const data = await response.json();
            setStats(data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    // Refresh stats every 5 seconds for real-time updates
    const statsInterval = setInterval(fetchStats, 5000);
    return () => clearInterval(statsInterval);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Date/Time Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-600">
            <div className="flex items-center gap-3">
              <Calendar className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="text-lg font-bold text-blue-900">{formattedDate}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-600">
            <div className="flex items-center gap-3">
              <Clock className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="text-lg font-bold text-blue-900 font-mono">{formattedTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Welcome to RefletiCSS
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Master Operating Systems and Computer Software through interactive learning
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleStartLearning}
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg"
            >
              Start Learning
            </button>
            <button 
              onClick={handleTakeQuiz}
              className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition shadow-lg"
            >
              Take a Quiz
            </button>
          </div>
        </div>

        {/* Stats Section */}
        {user && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <StatCard
              icon={<BookOpen size={32} />}
              title="Lessons Completed"
              value={stats.lessonsCompleted}
            />
            <StatCard
              icon={<Zap size={32} />}
              title="Quizzes Attempted"
              value={stats.quizzesAttempted}
            />
            <StatCard
              icon={<BarChart3 size={32} />}
              title="Average Score"
              value={`${stats.averageScore}%`}
            />
            <StatCard
              icon={<Clock size={32} />}
              title="Streak Days"
              value={stats.streakDays}
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

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-blue-600 hover:shadow-xl transition">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-gray-600 text-sm font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold text-blue-900">{value}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description, link, linkText }) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-blue-600 hover:shadow-xl transition text-center">
      <div className="text-blue-600 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-bold text-blue-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <Link to={link} className="text-blue-600 font-semibold hover:text-blue-800 transition">
        {linkText} →
      </Link>
    </div>
  );
}

export default Dashboard;
