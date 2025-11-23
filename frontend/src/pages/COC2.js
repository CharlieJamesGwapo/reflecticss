import React from 'react';
import { BookOpen, Zap } from 'lucide-react';

function COC2() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">COC 2: Advanced</h1>
          <p className="text-blue-600">Deep dive into advanced CSS concepts and techniques</p>
        </div>

        {/* Coming Soon */}
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="mb-6">
            <Zap className="mx-auto text-purple-600 mb-4" size={64} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon!</h2>
          <p className="text-xl text-gray-600 mb-8">
            COC 2: Advanced content is being prepared. Check back soon for advanced CSS challenges and techniques.
          </p>
          <div className="bg-purple-50 border-l-4 border-purple-600 p-6 text-left">
            <h3 className="font-bold text-purple-900 mb-3">What to Expect:</h3>
            <ul className="text-purple-800 space-y-2">
              <li>✓ 35 Advanced Questions</li>
              <li>✓ Complex CSS Concepts</li>
              <li>✓ Real-world Scenarios</li>
              <li>✓ Interactive Challenges</li>
              <li>✓ Expert-level Content</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default COC2;
