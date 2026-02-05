import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Award, Zap, Flame, Target, Users, Trophy, Star, Lock, CheckCircle } from 'lucide-react';

function Achievements() {
  const navigate = useNavigate();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, unlocked, locked

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const fetchAchievements = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_URL}/api/users/achievements`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setAchievements(data.achievements || []);
      } else {
        // Fallback mock data
        setAchievements([
          { id: 1, title: 'Fast Learner', description: 'Complete 10 lessons in one week', icon: 'Zap', unlocked: true, progress: 100, unlockedAt: '2024-01-15' },
          { id: 2, title: 'Quiz Master', description: 'Score 90%+ on 5 quizzes', icon: 'Award', unlocked: true, progress: 100, unlockedAt: '2024-01-12' },
          { id: 3, title: 'Consistent Student', description: '7-day study streak', icon: 'Flame', unlocked: true, progress: 100, unlockedAt: '2024-01-10' },
          { id: 4, title: 'High Scorer', description: 'Average score above 85%', icon: 'Target', unlocked: false, progress: 75, unlockedAt: null },
          { id: 5, title: 'Explorer', description: 'Try all COC modules', icon: 'Users', unlocked: false, progress: 30, unlockedAt: null },
          { id: 6, title: 'Perfectionist', description: 'Score 100% on 3 quizzes', icon: 'Trophy', unlocked: false, progress: 33, unlockedAt: null },
          { id: 7, title: 'Dedicated Learner', description: 'Study for 30 days straight', icon: 'Star', unlocked: false, progress: 15, unlockedAt: null },
          { id: 8, title: 'Quick Thinker', description: 'Complete quiz in under 5 minutes', icon: 'Zap', unlocked: false, progress: 60, unlockedAt: null }
        ]);
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
      // Set fallback data
      setAchievements([
        { id: 1, title: 'Fast Learner', description: 'Complete 10 lessons in one week', icon: 'Zap', unlocked: true, progress: 100, unlockedAt: '2024-01-15' },
        { id: 2, title: 'Quiz Master', description: 'Score 90%+ on 5 quizzes', icon: 'Award', unlocked: true, progress: 100, unlockedAt: '2024-01-12' },
        { id: 3, title: 'Consistent Student', description: '7-day study streak', icon: 'Flame', unlocked: true, progress: 100, unlockedAt: '2024-01-10' },
        { id: 4, title: 'High Scorer', description: 'Average score above 85%', icon: 'Target', unlocked: false, progress: 75, unlockedAt: null },
        { id: 5, title: 'Explorer', description: 'Try all COC modules', icon: 'Users', unlocked: false, progress: 30, unlockedAt: null }
      ]);
    } finally {
      setLoading(false);
    }
  }, [API_URL, navigate]);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'Zap': return Zap;
      case 'Award': return Award;
      case 'Flame': return Flame;
      case 'Target': return Target;
      case 'Users': return Users;
      case 'Trophy': return Trophy;
      case 'Star': return Star;
      default: return Award;
    }
  };

  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'unlocked') return achievement.unlocked;
    if (filter === 'locked') return !achievement.unlocked;
    return true;
  });

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const progressPercentage = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
            <p className="mt-4 text-blue-600 font-semibold">Loading achievements...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
          >
            <ChevronLeft size={20} />
            <span className="font-semibold">Back to Dashboard</span>
          </button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Achievements</h1>
          <p className="text-gray-600">Track your learning milestones and unlock new badges</p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">Your Progress</h2>
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-3xl font-bold text-yellow-600">{unlockedCount}</span>
                  <span className="text-gray-600"> / {totalCount}</span>
                </div>
                <div>
                  <div className="text-lg font-semibold text-green-600">{progressPercentage}%</div>
                  <div className="text-sm text-gray-600">Complete</div>
                </div>
              </div>
            </div>
            <div className="flex-1 max-w-md">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-blue-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['all', 'unlocked', 'locked'].map(filterOption => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                filter === filterOption
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-blue-600 border-2 border-blue-200 hover:border-blue-400'
              }`}
            >
              {filterOption === 'all' ? `All (${totalCount})` : 
               filterOption === 'unlocked' ? `Unlocked (${unlockedCount})` : 
               `Locked (${totalCount - unlockedCount})`}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map(achievement => {
            const IconComponent = getIconComponent(achievement.icon);
            
            return (
              <div
                key={achievement.id}
                className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all hover:shadow-xl ${
                  achievement.unlocked 
                    ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-white' 
                    : 'border-gray-200 opacity-75'
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg' 
                      : 'bg-gray-200'
                  }`}>
                    {achievement.unlocked ? (
                      <IconComponent className="w-8 h-8 text-white" />
                    ) : (
                      <Lock className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {achievement.description}
                    </p>
                    {achievement.unlocked && achievement.unlockedAt && (
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle size={12} />
                        Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className={`font-semibold ${achievement.unlocked ? 'text-green-600' : 'text-blue-600'}`}>
                      {achievement.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        achievement.unlocked 
                          ? 'bg-green-500' 
                          : 'bg-blue-500'
                      }`}
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-4">
                  {achievement.unlocked ? (
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                      <Trophy size={14} />
                      Unlocked
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                      <Lock size={14} />
                      In Progress
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Award size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {filter === 'unlocked' ? 'No Unlocked Achievements Yet' : 
               filter === 'locked' ? 'All Achievements Unlocked!' : 
               'No Achievements Found'}
            </h3>
            <p className="text-gray-600">
              {filter === 'unlocked' ? 'Start learning and taking quizzes to unlock your first achievement!' :
               filter === 'locked' ? 'Congratulations! You\'ve unlocked everything!' :
               'Try adjusting your filters.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Achievements;
