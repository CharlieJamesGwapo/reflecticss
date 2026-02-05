import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Zap, Award } from 'lucide-react';
import Swal from 'sweetalert2';

function COCSelection() {
  const navigate = useNavigate();

  const cocs = [
    {
      id: 'coc1',
      path: '/coc1',
      title: 'COC 1',
      description: 'Master Operating Systems and Computer Software',
      icon: BookOpen,
      color: 'from-blue-600 to-blue-700',
      questions: 29,
      topics: 'OS Basics, Software'
    },
    {
      id: 'coc2',
      path: '/coc2',
      title: 'COC 2',
      description: 'Deep dive into advanced CSS concepts and techniques',
      icon: Zap,
      color: 'from-yellow-400 to-blue-600',
      questions: 35,
      topics: 'Advanced CSS, Animations'
    },
    {
      id: 'coc3',
      path: '/coc3',
      title: 'COC 3',
      description: 'Expert-level challenges and real-world applications',
      icon: Award,
      color: 'from-blue-400 to-blue-500',
      questions: 40,
      topics: 'Expert Challenges, Projects'
    }
  ];

  const handleSelectCOC = (coc) => {
    Swal.fire({
      title: `${coc.title}`,
      html: `
        <div class="text-left">
          <p class="mb-3"><strong>Topics:</strong> ${coc.topics}</p>
          <p class="mb-3"><strong>Questions:</strong> ${coc.questions}</p>
          <p class="text-gray-600">${coc.description}</p>
        </div>
      `,
      icon: 'info',
      confirmButtonText: 'Start Quiz',
      confirmButtonColor: '#2563EB',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Starting Quiz...',
          html: 'Get ready for an amazing learning experience!',
          icon: 'success',
          timer: 1500,
          timerProgressBar: true,
          allowOutsideClick: false
        }).then(() => {
          navigate(coc.path);
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent mb-3 md:mb-4">
            Choose Your Course
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Select a COC course to begin your learning journey
          </p>
        </div>

        {/* COC Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-12">
          {cocs.map((coc) => {
            const Icon = coc.icon;
            return (
              <div
                key={coc.id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-t-4 border-yellow-400 flex flex-col h-full"
              >
                {/* Blue Header */}
                <div className={`h-32 bg-gradient-to-r ${coc.color} relative overflow-hidden flex items-center justify-center flex-shrink-0`}>
                  <Icon className="text-white opacity-90" size={64} />
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 flex flex-col flex-grow">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{coc.title}</h3>
                  <p className="text-gray-600 mb-3 text-xs md:text-sm">{coc.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 py-3 border-y border-gray-100">
                    <div className="text-center">
                      <p className="text-lg md:text-xl font-bold text-yellow-500">{coc.questions}</p>
                      <p className="text-xs text-gray-600">Questions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg md:text-xl font-bold text-blue-600">Expert</p>
                      <p className="text-xs text-gray-600">Level</p>
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="mb-4">
                    <p className="text-xs md:text-sm font-semibold text-gray-700 mb-1">Topics:</p>
                    <p className="text-xs md:text-sm text-gray-600">{coc.topics}</p>
                  </div>

                  {/* Button - Always at bottom */}
                  <button
                    onClick={() => handleSelectCOC(coc)}
                    className={`w-full bg-gradient-to-r ${coc.color} text-white font-bold py-3 md:py-4 rounded-lg hover:shadow-xl hover:shadow-blue-400/50 transform hover:scale-105 transition-all duration-300 text-sm md:text-base font-semibold mt-auto flex-shrink-0`}
                  >
                    Start Quiz
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border-l-4 border-yellow-400 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent mb-6 md:mb-8">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-yellow-50 rounded-lg p-4 md:p-6 border-l-4 border-yellow-400 hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-3">1</div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Choose a Course</h3>
              <p className="text-gray-600 text-sm">Select from COC 1, 2, or 3 based on your skill level</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 md:p-6 border-l-4 border-blue-600 hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-3">2</div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Take the Quiz</h3>
              <p className="text-gray-600 text-sm">Answer questions and get instant feedback on your progress</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 md:p-6 border-l-4 border-yellow-400 hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-3">3</div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Track Progress</h3>
              <p className="text-gray-600 text-sm">Monitor your scores and improve your skills over time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default COCSelection;
