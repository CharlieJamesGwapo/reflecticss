import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Zap, BarChart3, Clock, Calendar, Flame, TrendingUp, Award, Target, Users, Bell, LogOut, ChevronRight, Eye, CheckCircle, Activity } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const fetchDashboardData = useCallback(async (period = 'week') => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${API_URL}/api/users/stats?period=${period}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(prevStats => ({
          ...prevStats,
          ...data,
          performanceMetrics: {
            accuracy: data.averageScore || 0,
            speed: data.lessonsCompleted ? Math.round((data.lessonsCompleted / 30) * 10) / 10 : 0,
            consistency: data.streakDays ? Math.min(100, data.streakDays * 10) : 0,
            improvement: data.averageScore ? Math.round((data.averageScore - 70) * 0.5) : 0
          }
        }));
      } else {
        // Set default values if API fails
        setStats(prevStats => ({
          ...prevStats,
          lessonsCompleted: 0,
          quizzesAttempted: 0,
          averageScore: 0,
          streakDays: 0,
          performanceMetrics: {
            accuracy: 0,
            speed: 0,
            consistency: 0,
            improvement: 0
          }
        }));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set fallback values
      setStats(prevStats => ({
        ...prevStats,
        lessonsCompleted: 0,
        quizzesAttempted: 0,
        averageScore: 0,
        streakDays: 0,
        performanceMetrics: {
          accuracy: 0,
          speed: 0,
          consistency: 0,
          improvement: 0
        }
      }));
    } finally {
      setIsLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchDashboardData(selectedPeriod);
  }, [fetchDashboardData, selectedPeriod]);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50">
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
            <div className="bg-gradient-to-r from-yellow-400 to-blue-600 rounded-xl p-8 text-white text-center shadow-xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome back, {user?.name || 'Learner'}!</h1>
              <p className="text-lg md:text-xl opacity-90 mb-6">Ready to continue your CSS learning journey?</p>
              
              {/* Time Period Selector */}
              <div className="flex justify-center mb-6">
                <div className="bg-white bg-opacity-20 rounded-lg p-1 flex space-x-1">
                  {['today', 'week', 'month'].map(period => (
                    <button
                      key={period}
                      onClick={() => handlePeriodChange(period)}
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
              
              {/* Period Indicator */}
              <div className="text-center text-white text-sm opacity-75">
                Showing data for {selectedPeriod === 'today' ? 'today' : selectedPeriod === 'week' ? 'this week' : 'this month'}
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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
                    <span className="font-semibold text-gray-900">{stats.lessonsCompleted || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quizzes Taken</span>
                    <span className="font-semibold text-gray-900">{stats.quizzesAttempted || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Study Streak</span>
                    <span className="font-semibold text-orange-600">{stats.streakDays || 0} days</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
                  <BarChart3 className="text-blue-600 h-5 w-5" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.averageScore || 0}%</div>
                    <div className="text-sm text-gray-600">Avg Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.performanceMetrics?.speed || 0}</div>
                    <div className="text-sm text-gray-600">Speed (lessons/day)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{stats.performanceMetrics?.consistency || 0}%</div>
                    <div className="text-sm text-gray-600">Consistency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">+{stats.performanceMetrics?.improvement || 0}%</div>
                    <div className="text-sm text-gray-600">Improvement</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-yellow-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Achievements</h3>
                  <Award className="text-yellow-600 h-5 w-5" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">{stats.achievements?.filter(a => a.unlocked).length || 0}</div>
                    <div className="text-sm text-gray-600">Unlocked</div>
                  </div>
                  <button 
                    onClick={() => handleNavigation('/achievements')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                  >
                    View All <ChevronRight size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-4">
                  {(stats.achievements || []).slice(0, 2).map(achievement => {
                    const IconComponent = achievement.icon === 'Zap' ? Zap :
                                       achievement.icon === 'Award' ? Award :
                                       achievement.icon === 'Flame' ? Flame :
                                       achievement.icon === 'Target' ? Target :
                                       achievement.icon === 'Users' ? Users : Award;
                    
                    return (
                      <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                           onClick={() => handleNavigation('/achievements')}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${achievement.unlocked ? 'bg-green-100' : 'bg-gray-200'}`}>
                          <IconComponent className={`w-6 h-6 ${achievement.unlocked ? 'text-green-600' : 'text-gray-400'}`} />
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
                    );
                  })}
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

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <Bell className="text-blue-600 h-5 w-5" />
              </div>
              <div className="space-y-3">
                {(stats.recentActivity || []).slice(0, 3).map((activity, index) => {
                  const ActivityIcon = activity.icon === 'CheckCircle' ? CheckCircle :
                                    activity.icon === 'BookOpen' ? BookOpen :
                                    activity.icon === 'Award' ? Award :
                                    activity.icon === 'LogOut' ? LogOut :
                                    activity.icon === 'Eye' ? Eye : Activity;
                  
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <ActivityIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      {activity.score && (
                        <div className="text-sm font-semibold text-green-600">
                          {activity.score}%
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
