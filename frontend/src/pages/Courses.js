import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Clock, Users, Star, CheckCircle, Lock, Play } from 'lucide-react';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Mock data for now - replace with actual API call
        const mockCourses = [
          {
            id: 1,
            title: 'Computer Fundamentals',
            description: 'Learn the basics of computer hardware, software, and operating systems',
            category: 'fundamentals',
            level: 'Beginner',
            duration: '8 hours',
            enrolled: 1234,
            rating: 4.8,
            lessons: 12,
            completedLessons: 8,
            progress: 67,
            image: '/computer.png',
            instructor: 'Dr. Smith',
            locked: false
          },
          {
            id: 2,
            title: 'Advanced Programming',
            description: 'Master advanced programming concepts and best practices',
            category: 'programming',
            level: 'Advanced',
            duration: '12 hours',
            enrolled: 856,
            rating: 4.9,
            lessons: 20,
            completedLessons: 5,
            progress: 25,
            image: '/code.png',
            instructor: 'Prof. Johnson',
            locked: false
          },
          {
            id: 3,
            title: 'Web Development',
            description: 'Build modern web applications with HTML, CSS, and JavaScript',
            category: 'development',
            level: 'Intermediate',
            duration: '10 hours',
            enrolled: 2103,
            rating: 4.7,
            lessons: 15,
            completedLessons: 0,
            progress: 0,
            image: '/web.png',
            instructor: 'Ms. Davis',
            locked: false
          },
          {
            id: 4,
            title: 'Data Structures',
            description: 'Understanding essential data structures and algorithms',
            category: 'computer-science',
            level: 'Intermediate',
            duration: '15 hours',
            enrolled: 645,
            rating: 4.6,
            lessons: 18,
            completedLessons: 0,
            progress: 0,
            image: '/data.png',
            instructor: 'Dr. Wilson',
            locked: true
          }
        ];
        setCourses(mockCourses);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = filter === 'all' ? courses : courses.filter(c => c.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Courses</h1>
          <p className="text-xl text-blue-100">Explore our comprehensive course catalog</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {['all', 'fundamentals', 'programming', 'development', 'computer-science'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                filter === cat
                  ? 'bg-white text-purple-600'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        {!loading && filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <BookOpen size={48} className="mx-auto text-white mb-4 opacity-50" />
            <p className="text-white text-lg">No courses found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CourseCard({ course }) {
  const isLocked = course.locked;
  const progress = course.progress || 0;

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl overflow-hidden border border-white border-opacity-20 card-hover h-full flex flex-col">
      {/* Course Image */}
      <div className="h-40 bg-gradient-to-br from-blue-400 to-purple-400 relative overflow-hidden">
        {course.image && (
          <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        )}
        {isLocked && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Lock size={32} className="text-white" />
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-semibold text-gray-800">
          {course.level}
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white flex-1">{course.title}</h3>
          {progress > 0 && <CheckCircle size={20} className="text-green-400 flex-shrink-0 ml-2" />}
        </div>

        <p className="text-blue-100 text-sm mb-4 line-clamp-2 flex-grow">{course.description}</p>

        {/* Course Stats */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-blue-200">
              <Clock size={16} className="mr-1" />
              {course.duration}
            </div>
            <div className="flex items-center text-blue-200">
              <Users size={16} className="mr-1" />
              {course.enrolled}
            </div>
            <div className="flex items-center text-yellow-400">
              <Star size={16} className="mr-1 fill-current" />
              {course.rating}
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-200">{course.completedLessons}/{course.lessons} lessons</span>
            <span className="text-blue-200">Instructor: {course.instructor}</span>
          </div>
        </div>

        {/* Progress Bar */}
        {progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-blue-200 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Link to={`/courses/${course.id}`} className="w-full">
          <button
            className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center space-x-2 ${
              isLocked
                ? 'bg-gray-500 bg-opacity-50 text-gray-300 cursor-not-allowed'
                : progress > 0
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-white hover:bg-blue-50 text-blue-600'
            }`}
            disabled={isLocked}
          >
            {progress > 0 ? (
              <>
                <Play size={18} />
                <span>Continue Learning</span>
              </>
            ) : isLocked ? (
              <>
                <Lock size={18} />
                <span>Locked</span>
              </>
            ) : (
              <>
                <Play size={18} />
                <span>Start Course</span>
              </>
            )}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Courses;
