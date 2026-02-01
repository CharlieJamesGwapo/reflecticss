import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Zap, BarChart3, Clock, Calendar, Flame, TrendingUp, Award, Target, Users, Bell, LogOut, Menu, X, ChevronRight, Search, UserPlus, Eye, CheckCircle } from 'lucide-react';

function Dashboard({ user }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    lessonsCompleted: 0,
    quizzesAttempted: 0,
    averageScore: 0,
    streakDays: 0,
    weeklyProgress: [],
    monthlyProgress: [],
    recentActivity: [],
    achievements: [],
    leaderboard: [],
    performanceMetrics: { accuracy: 0, speed: 0, consistency: 0, improvement: 0 }
  });
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${API_URL}/api/users/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleNavigation = (path) => {
    navigate(path);
    setShowMobileMenu(false);
  };

  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });

  const mockData = {
    weeklyProgress: [
      { day: 'Mon', lessons: 3, quizzes: 2, score: 85 },
      { day: 'Tue', lessons: 5, quizzes: 3, score: 92 },
      { day: 'Wed', lessons: 2, quizzes: 4, score: 78 },
      { day: 'Thu', lessons: 4, quizzes: 2, score: 88 },
      { day: 'Fri', lessons: 6, quizzes: 5, score: 95 },
      { day: 'Sat', lessons: 3, quizzes: 1, score: 82 },
      { day: 'Sun', lessons: 1, quizzes: 0, score: 0 }
    ],
    achievements: [
      { id: 1, title: 'Fast Learner', description: 'Complete 10 lessons in one week', icon: Zap, unlocked: true, progress: 100 },
      { id: 2, title: 'Quiz Master', description: 'Score 90%+ on 5 quizzes', icon: Award, unlocked: true, progress: 100 },
      { id: 3, title: 'Consistent Student', description: '7-day study streak', icon: Flame, unlocked: true, progress: 100 },
      { id: 4, title: 'High Scorer', description: 'Average score above 85%', icon: Target, unlocked: false, progress: 75 },
      { id: 5, title: 'Explorer', description: 'Try all COC modules', icon: Users, unlocked: false, progress: 30 }
    ],
    recentActivity: [
      { type: 'quiz', description: 'Completed COC 1 Quiz', score: 85, time: '2 hours ago', icon: CheckCircle },
      { type: 'lesson', description: 'Started Operating Systems lesson', time: '5 hours ago', icon: BookOpen },
      { type: 'achievement', description: 'Unlocked "Quiz Master" badge', time: '1 day ago', icon: Award },
      { type: 'login', description: 'Logged in to dashboard', time: '30 minutes ago', icon: LogOut },
      { type: 'review', description: 'Reviewed 50 flashcards', time: '2 days ago', icon: Eye }
    ],
    leaderboard: [
      { rank: 1, name: 'You', score: 2840, avatar: '👑', trend: 'up' },
      { rank: 2, name: 'Alice Chen', score: 2750, avatar: '🎯', trend: 'up' },
      { rank: 3, name: 'Bob Smith', score: 2680, avatar: '🚀', trend: 'down' },
      { rank: 4, name: 'Carol Davis', score: 2590, avatar: '⭐', trend: 'stable' },
      { rank: 5, name: 'David Wilson', score: 2450, avatar: '📚', trend: 'down' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Menu Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="p-2 bg-white rounded-lg shadow-lg border border-gray-200">
          {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <BookOpen className="text-white" size={24} />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">RefletiCSS</span>
              <span className="ml-2 text-lg text-blue-600">Dashboard</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <button onClick={() => handleNavigation('/dashboard')} className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Overview</button>
                <button onClick={() => handleNavigation('/lessons')} className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Lessons</button>
                <button onClick={() => handleNavigation('/quizzes')} className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Quizzes</button>
                <button onClick={() => handleNavigation('/reviewer-selection')} className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Review</button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 text-gray-400" size={20} />
                <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="relative">
                <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 text-gray-600 hover:text-blue-600 rounded-md transition-colors">
                  <Bell className="h-5 w-5" />
                  {stats.achievements && stats.achievements.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center">
                      {stats.achievements.length}
                    </span>
                  )}
                </button>
              </div>

              <div className="relative">
                <button onClick={() => setShowNotifications(!showNotifications)} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 rounded-md px-3 py-2 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                    {user?.profile_photo ? (
                      <img src={user.profile_photo} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <UserPlus className="text-white" size={20} />
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="bg-white w-64 h-full shadow-xl">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-bold text-gray-900">Menu</span>
                <button onClick={() => setShowMobileMenu(false)} className="p-2 text-gray-600 hover:text-gray-900">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-2">
                <button onClick={() => handleNavigation('/dashboard')} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Overview</button>
                <button onClick={() => handleNavigation('/lessons')} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Lessons</button>
                <button onClick={() => handleNavigation('/quizzes')} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Quizzes</button>
                <button onClick={() => handleNavigation('/reviewer-selection')} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Review</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
              <p className="mt-4 text-blue-600 font-semibold">Loading dashboard data...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center shadow-xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome back, {user?.name || 'Learner'}!</h1>
              <p className="text-lg md:text-xl opacity-90 mb-6">Ready to continue your CSS learning journey?</p>
              
              {/* Time Period Selector */}
              <div className="flex justify-center mb-6">
                <div className="bg-white bg-opacity-20 rounded-lg p-1 flex space-x-1">
                  {['today', 'week', 'month'].map(period => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      className={`px-4 py-2 rounded-md font-medium transition ${
                        selectedPeriod === period
                          ? 'bg-white text-blue-600'
                          : 'text-white hover:bg-white hover:bg-opacity-10'
                      }`}
                    >
                      {period === 'today' ? 'Today' : period === 'week' ? 'This Week' : 'This Month'}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => handleNavigation('/lessons')} className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">Continue Learning</button>
                <button onClick={() => handleNavigation('/quizzes')} className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:bg-blue-50 transition-colors shadow-lg">Take Quiz</button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Learning Progress</h3>
                  <TrendingUp className="text-green-600 h-5 w-5" />
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-green-600">+12%</span>
                  <span className="text-sm text-gray-600">vs last month</span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lessons Completed</span>
                    <span className="font-semibold text-gray-900">{stats.lessonsCompleted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quizzes Taken</span>
                    <span className="font-semibold text-gray-900">{stats.quizzesAttempted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Study Streak</span>
                    <span className="font-semibold text-orange-600">{stats.streakDays} days</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-600">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
                  <BarChart3 className="text-purple-600 h-5 w-5" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.averageScore}%</div>
                    <div className="text-sm text-gray-600">Avg Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.performanceMetrics.speed}</div>
                    <div className="text-sm text-gray-600">Speed (lessons/day)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{stats.performanceMetrics.consistency}%</div>
                    <div className="text-sm text-gray-600">Consistency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">+{stats.performanceMetrics.improvement}%</div>
                    <div className="text-sm text-gray-600">Improvement</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-600">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Achievements</h3>
                  <Award className="text-orange-600 h-5 w-5" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{mockData.achievements.filter(a => a.unlocked).length}</div>
                    <div className="text-sm text-gray-600">Unlocked</div>
                  </div>
                  <Link to="/achievements" className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All →</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {mockData.achievements.slice(0, 4).map(achievement => (
                    <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${achievement.unlocked ? 'bg-green-100' : 'bg-gray-200'}`}>
                        {achievement.icon === 'Zap' && <Zap className={`w-6 h-6 ${achievement.unlocked ? 'text-green-600' : 'text-gray-400'}`} />}
                        {achievement.icon === 'Award' && <Award className={`w-6 h-6 ${achievement.unlocked ? 'text-green-600' : 'text-gray-400'}`} />}
                        {achievement.icon === 'Flame' && <Flame className={`w-6 h-6 ${achievement.unlocked ? 'text-green-600' : 'text-gray-400'}`} />}
                        {achievement.icon === 'Target' && <Target className={`w-6 h-6 ${achievement.unlocked ? 'text-green-600' : 'text-gray-400'}`} />}
                        {achievement.icon === 'Users' && <Users className={`w-6 h-6 ${achievement.unlocked ? 'text-green-600' : 'text-gray-400'}`} />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${achievement.progress}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Date/Time Header */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
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
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
