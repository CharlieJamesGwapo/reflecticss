import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User, Settings, Search, Bell, BookOpen, BarChart3, Award, Home, TrendingUp, MoreVertical } from 'lucide-react';

function Navbar({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const profileRef = useRef(null);
  const settingsRef = useRef(null);
  const navigate = useNavigate();

  // Get API URL with fallback
  const getApiUrl = () => {
    return process.env.REACT_APP_API_URL || 'http://localhost:5000';
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch real notifications (optional - won't block if endpoint doesn't exist)
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const apiUrl = getApiUrl();
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
          
          try {
            const response = await fetch(`${apiUrl}/api/notifications`, {
              headers: { Authorization: `Bearer ${token}` },
              signal: controller.signal
            });
            clearTimeout(timeoutId);
            
            if (response.ok) {
              const data = await response.json();
              setNotifications(data.notifications || []);
              setUnreadCount(data.unreadCount || 0);
            }
          } catch (fetchError) {
            clearTimeout(timeoutId);
            // Silently fail - notifications endpoint is optional
            console.debug('Notifications endpoint not available (optional feature)');
          }
        }
      } catch (error) {
        // Silently fail - notifications are optional
        console.debug('Failed to fetch notifications:', error.message);
      }
    };

    fetchNotifications();
    // Refresh notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const handleLogout = () => {
    // Clear both localStorage and sessionStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = getApiUrl();
      await fetch(`${apiUrl}/api/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      // Refetch notifications
      const response = await fetch(`${apiUrl}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-yellow-400 to-blue-600 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-90 transition">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-white rounded-full opacity-10 blur-lg"></div>
              <img 
                src="/logo.png" 
                alt="RefletiCSS Logo" 
                className="h-16 sm:h-20 w-16 sm:w-20 object-cover rounded-full border-2 border-white shadow-lg hover:shadow-xl transition-shadow"
                title="RefletiCSS - A reflective learning tool in enhancing Technical vocabulary learning"
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="flex items-center gap-2 text-white hover:text-yellow-100 px-4 py-2 rounded-lg transition font-medium border-b-2 border-transparent hover:border-white">
              <Home size={18} />
              Dashboard
            </Link>
            <Link to="/reviewer-selection" className="flex items-center gap-2 text-white hover:text-yellow-100 px-4 py-2 rounded-lg transition font-medium border-b-2 border-transparent hover:border-white">
              <BookOpen size={18} />
              Learn
            </Link>
            <Link to="/coc-selection" className="flex items-center gap-2 text-white hover:text-yellow-100 px-4 py-2 rounded-lg transition font-medium border-b-2 border-transparent hover:border-white">
              <BarChart3 size={18} />
              Quizzes
            </Link>
            <Link to="/quiz-history" className="flex items-center gap-2 text-white hover:text-yellow-100 px-4 py-2 rounded-lg transition font-medium border-b-2 border-transparent hover:border-white">
              <TrendingUp size={18} />
              Progress
            </Link>
            <Link to="/courses" className="flex items-center gap-2 text-white hover:text-yellow-100 px-4 py-2 rounded-lg transition font-medium border-b-2 border-transparent hover:border-white">
              <Award size={18} />
              Courses
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center">
            {searchOpen ? (
              <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-3 py-2">
                <Search size={18} className="text-white" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white placeholder-yellow-100 ml-2 outline-none w-40"
                  autoFocus
                />
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="text-white hover:text-yellow-100 transition p-2"
              >
                <Search size={20} />
              </button>
            )}
          </div>

          {/* Notifications & User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* 3-Dash Settings Menu */}
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="text-white hover:text-yellow-100 transition p-2"
                title="Settings Menu"
              >
                <MoreVertical size={20} />
              </button>
              
              {/* Settings Dropdown */}
              {isSettingsOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-200 bg-yellow-50">
                    <p className="text-gray-900 font-semibold text-sm">Settings</p>
                  </div>
                  <div className="py-2">
                    <Link
                      to="/account-settings"
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-yellow-50 transition"
                      onClick={() => setIsSettingsOpen(false)}
                    >
                      <Settings size={18} className="text-yellow-600" />
                      <span className="text-sm font-medium">Account Settings</span>
                    </Link>
                    <Link
                      to="/quiz-history"
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-yellow-50 transition"
                      onClick={() => setIsSettingsOpen(false)}
                    >
                      <TrendingUp size={18} className="text-green-600" />
                      <span className="text-sm font-medium">Quiz History</span>
                    </Link>
                    <button
                      onClick={() => {
                        // Add theme toggle functionality here
                        setIsSettingsOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-yellow-50 transition"
                    >
                      <Award size={18} className="text-purple-600" />
                      <span className="text-sm font-medium">Achievements</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {user && (
              <div className="relative group">
                <button className="relative text-white hover:text-yellow-100 transition p-2">
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>
                
                {/* Notifications Dropdown */}
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 hidden group-hover:block max-h-96 overflow-y-auto">
                  <div className="px-4 py-3 border-b border-gray-200 bg-yellow-50">
                    <p className="text-gray-900 font-semibold text-sm">Notifications</p>
                  </div>
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer ${
                          !notif.is_read ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => handleMarkAsRead(notif.id)}
                      >
                        <p className="text-gray-900 text-sm font-medium">{notif.title}</p>
                        <p className="text-gray-600 text-xs mt-1">{notif.message}</p>
                        <p className="text-gray-400 text-xs mt-2">
                          {new Date(notif.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <p className="text-gray-500 text-sm">No notifications</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {user ? (
              <div className="relative" ref={profileRef}>
                {/* Profile Photo Button (Like Instagram) */}
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 rounded-full border-2 border-white hover:border-yellow-100 transition overflow-hidden flex items-center justify-center bg-gradient-to-br from-yellow-400 to-blue-600 text-white font-bold text-sm"
                  title={user.name}
                >
                  {user.profile_photo ? (
                    <img src={user.profile_photo} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                  )}
                </button>
                
                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-2xl z-50 overflow-hidden">
                    {/* Profile Header Card */}
                    <div className="px-6 py-6 bg-gradient-to-r from-yellow-400 to-blue-600 text-white">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full border-3 border-white flex items-center justify-center bg-yellow-500 text-white font-bold text-2xl overflow-hidden shadow-lg">
                          {user.profile_photo ? (
                            <img src={user.profile_photo} alt={user.name} className="w-full h-full object-cover" />
                          ) : (
                            user.name.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-bold text-base">{user.name}</p>
                          <p className="text-yellow-100 text-xs mt-1">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/account-settings"
                        className="flex items-center space-x-3 px-6 py-3 text-gray-700 hover:bg-yellow-50 transition border-b border-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings size={18} className="text-yellow-600" />
                        <div>
                          <p className="text-sm font-semibold">Account Settings</p>
                          <p className="text-xs text-gray-500">Manage your profile</p>
                        </div>
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-6 py-3 text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut size={18} />
                        <div className="text-left">
                          <p className="text-sm font-semibold">Logout</p>
                          <p className="text-xs text-red-500">Sign out of your account</p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="flex items-center gap-2 text-white hover:bg-yellow-600 px-4 py-2 rounded transition">
              <Home size={18} />
              Dashboard
            </Link>
            <Link to="/reviewer-selection" className="flex items-center gap-2 text-white hover:bg-yellow-600 px-4 py-2 rounded transition">
              <BookOpen size={18} />
              Learn
            </Link>
            <Link to="/coc-selection" className="flex items-center gap-2 text-white hover:bg-yellow-600 px-4 py-2 rounded transition">
              <BarChart3 size={18} />
              Quizzes
            </Link>
            <Link to="/quiz-history" className="flex items-center gap-2 text-white hover:bg-yellow-600 px-4 py-2 rounded transition">
              <TrendingUp size={18} />
              Progress
            </Link>
            <Link to="/courses" className="flex items-center gap-2 text-white hover:bg-yellow-600 px-4 py-2 rounded transition">
              <Award size={18} />
              Courses
            </Link>
            {user && (
              <>
                <Link to="/profile" className="flex items-center gap-2 text-white hover:bg-yellow-600 px-4 py-2 rounded transition">
                  <User size={18} />
                  My Profile
                </Link>
                <Link to="/account-settings" className="flex items-center gap-2 text-white hover:bg-yellow-600 px-4 py-2 rounded transition">
                  <Settings size={18} />
                  Account Settings
                </Link>
              </>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-left text-white hover:bg-red-600 px-4 py-2 rounded transition flex items-center space-x-2"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            ) : (
              <Link to="/login" className="block text-white hover:bg-yellow-600 px-4 py-2 rounded transition">Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
