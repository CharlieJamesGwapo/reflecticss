import React, { useNavigate } from 'react-router-dom';
import { BookOpen, Zap, Award } from 'lucide-react';
import Swal from 'sweetalert2';

function ReviewerSelection() {
  const navigate = useNavigate();

  const reviewers = [
    {
      id: 'coc1',
      path: '/reviewer/coc1',
      title: 'COC 1',
      description: 'Review Operating Systems and Computer Software concepts',
      icon: BookOpen,
      color: 'from-blue-600 to-blue-700',
      terms: 21,
      topics: 'OS Basics, Software'
    },
    {
      id: 'coc2',
      path: '/reviewer/coc2',
      title: 'COC 2',
      description: 'Review advanced CSS concepts and techniques',
      icon: Zap,
      color: 'from-blue-500 to-blue-600',
      terms: 25,
      topics: 'Advanced CSS, Animations'
    },
    {
      id: 'coc3',
      path: '/reviewer/coc3',
      title: 'COC 3',
      description: 'Review expert-level challenges and applications',
      icon: Award,
      color: 'from-blue-400 to-blue-500',
      terms: 30,
      topics: 'Expert Challenges, Projects'
    }
  ];

  const handleSelectReviewer = (reviewer) => {
    Swal.fire({
      title: `${reviewer.title} - Review Mode`,
      html: `
        <div class="text-left">
          <p class="mb-3 text-gray-700">${reviewer.description}</p>
          <div class="grid grid-cols-2 gap-4 my-4">
            <div class="text-center">
              <p class="text-2xl font-bold text-blue-600">${reviewer.terms}</p>
              <p class="text-sm text-gray-600">Terms to Review</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-blue-600">${reviewer.topics}</p>
              <p class="text-sm text-gray-600">Topics</p>
            </div>
          </div>
          <p class="text-sm text-gray-600 mt-4">📖 This is a review-only mode. Read and learn from the terms.</p>
        </div>
      `,
      icon: 'info',
      confirmButtonColor: '#2563EB',
      confirmButtonText: 'Start Review',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Starting Review...',
          html: 'Get ready to review and learn!',
          icon: 'success',
          timer: 1500,
          timerProgressBar: true,
          allowOutsideClick: false
        }).then(() => {
          navigate(reviewer.path);
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-3 md:mb-4">
            Review Your Learning
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Select a course to review and reinforce your knowledge
          </p>
        </div>

        {/* Reviewer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-12">
          {reviewers.map((reviewer) => {
            const Icon = reviewer.icon;
            return (
              <div
                key={reviewer.id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-t-4 border-blue-600 flex flex-col h-full"
              >
                {/* Blue Header */}
                <div className={`h-32 bg-gradient-to-r ${reviewer.color} relative overflow-hidden flex items-center justify-center flex-shrink-0`}>
                  <Icon className="text-white opacity-90" size={64} />
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 flex flex-col flex-grow">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{reviewer.title}</h3>
                  <p className="text-gray-600 mb-3 text-xs md:text-sm">{reviewer.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 py-3 border-y border-gray-100">
                    <div className="text-center">
                      <p className="text-lg md:text-xl font-bold text-blue-700">{reviewer.terms}</p>
                      <p className="text-xs text-gray-600">Terms</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg md:text-xl font-bold text-blue-600">Review</p>
                      <p className="text-xs text-gray-600">Mode</p>
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="mb-4">
                    <p className="text-xs md:text-sm font-semibold text-gray-700 mb-1">Topics:</p>
                    <p className="text-xs md:text-sm text-gray-600">{reviewer.topics}</p>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => handleSelectReviewer(reviewer)}
                    className={`w-full bg-gradient-to-r ${reviewer.color} text-white font-bold py-3 md:py-4 rounded-lg hover:shadow-xl hover:shadow-blue-400/50 transform hover:scale-105 transition-all duration-300 text-sm md:text-base font-semibold mt-auto flex-shrink-0`}
                  >
                    Start Review
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border-l-4 border-blue-600 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 md:mb-8">How Review Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-blue-50 rounded-lg p-4 md:p-6 border-l-4 border-blue-600 hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-blue-700 mb-3">1</div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Select Course</h3>
              <p className="text-gray-600 text-sm">Choose from COC 1, 2, or 3 to review</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 md:p-6 border-l-4 border-blue-600 hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-blue-700 mb-3">2</div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Read & Learn</h3>
              <p className="text-gray-600 text-sm">Review all terms and definitions at your pace</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 md:p-6 border-l-4 border-blue-600 hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-blue-700 mb-3">3</div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Reinforce Knowledge</h3>
              <p className="text-gray-600 text-sm">Strengthen your understanding of key concepts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewerSelection;
