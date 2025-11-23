import React from 'react';
import { Award, Zap } from 'lucide-react';

function COC3() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">COC 3: Expert</h1>
          <p className="text-blue-600">Expert-level challenges and real-world applications</p>
        </div>

        {/* Coming Soon */}
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="mb-6">
            <Award className="mx-auto text-pink-600 mb-4" size={64} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon!</h2>
          <p className="text-xl text-gray-600 mb-8">
            COC 3: Expert content is being prepared. Check back soon for expert-level CSS challenges and real-world projects.
          </p>
          <div className="bg-pink-50 border-l-4 border-pink-600 p-6 text-left">
            <h3 className="font-bold text-pink-900 mb-3">What to Expect:</h3>
            <ul className="text-pink-800 space-y-2">
              <li>✓ 40 Expert Questions</li>
              <li>✓ Real-world Projects</li>
              <li>✓ Advanced Techniques</li>
              <li>✓ Performance Optimization</li>
              <li>✓ Industry Best Practices</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default COC3;
