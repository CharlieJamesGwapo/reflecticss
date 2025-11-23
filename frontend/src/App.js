import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Lessons from './pages/Lessons';
import Flashcards from './pages/Flashcards';
import Quizzes from './pages/Quizzes';
import LessonDetail from './pages/LessonDetail';
import QuizDetail from './pages/QuizDetail';
import COC1 from './pages/COC1';
import COC2 from './pages/COC2';
import COC3 from './pages/COC3';
import COCSelection from './pages/COCSelection';
import ReviewerSelection from './pages/ReviewerSelection';
import Reviewer from './pages/Reviewer';
import AccountSettings from './pages/AccountSettings';
import QuizHistory from './pages/QuizHistory';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get API URL with fallback
  const getApiUrl = () => {
    return process.env.REACT_APP_API_URL || 'http://localhost:5000';
  };

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Verify token with backend
          const apiUrl = getApiUrl();
          const response = await fetch(`${apiUrl}/api/auth/verify`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
          } else {
            localStorage.removeItem('token');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {!user ? (
        // Auth page when not logged in
        <Routes>
          <Route path="/" element={<Auth setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        // App pages when logged in
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex flex-col">
          <Navbar user={user} setUser={setUser} />
          <main className="pt-16 sm:pt-20 w-full flex-grow">
            <Routes>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/lessons/:id" element={<LessonDetail />} />
              <Route path="/flashcards" element={<Flashcards />} />
              <Route path="/quizzes" element={<Quizzes />} />
              <Route path="/quizzes/:id" element={<QuizDetail />} />
              <Route path="/coc-selection" element={<COCSelection />} />
              <Route path="/coc1" element={<COC1 />} />
              <Route path="/coc2" element={<COC2 />} />
              <Route path="/coc3" element={<COC3 />} />
              <Route path="/reviewer-selection" element={<ReviewerSelection />} />
              <Route path="/reviewer/:coc" element={<Reviewer />} />
              <Route path="/account-settings" element={<AccountSettings user={user} setUser={setUser} />} />
              <Route path="/quiz-history" element={<QuizHistory />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;
