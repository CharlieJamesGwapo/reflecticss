import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Zap, Award, Target, ArrowRight, Star, Users, Clock, CheckCircle } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      {/* Hero Section */}
      <section className="px-4 py-20 md:py-32">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-white rounded-full opacity-20 blur-lg"></div>
              <img 
                src="/logo.png" 
                alt="RefletiCSS Logo" 
                className="relative h-24 w-24 md:h-32 md:w-32 object-cover rounded-full border-4 border-white shadow-2xl mx-auto"
              />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Welcome to <span className="text-yellow-300">RefletiCSS</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            A reflective learning tool designed to enhance your Technical vocabulary mastery through interactive lessons, engaging quizzes, and comprehensive reviews.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              to="/auth" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl"
            >
              Get Started Now
              <ArrowRight className="inline-block ml-2" size={20} />
            </Link>
            <Link 
              to="/dashboard" 
              className="bg-transparent border-4 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 shadow-xl"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-white bg-opacity-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose RefletiCSS?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Discover the features that make learning Technical vocabulary effective and enjoyable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={BookOpen}
              title="Interactive Lessons"
              description="Engaging, comprehensive lessons designed to build your Technical vocabulary step by step"
              color="from-blue-400 to-blue-600"
            />
            <FeatureCard
              icon={Zap}
              title="Smart Quizzes"
              description="Adaptive quizzes that challenge your knowledge and help you learn effectively"
              color="from-purple-400 to-purple-600"
            />
            <FeatureCard
              icon={Award}
              title="Track Progress"
              description="Monitor your learning journey with detailed analytics and achievement badges"
              color="from-green-400 to-green-600"
            />
            <FeatureCard
              icon={Target}
              title="Goal Oriented"
              description="Set learning goals and achieve them with our structured learning paths"
              color="from-orange-400 to-orange-600"
            />
          </div>
        </div>
      </section>

      {/* Learning Modules Section */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Comprehensive Learning Modules
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Master different areas of Technical vocabulary with our specialized courses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ModuleCard
              title="COC 1"
              description="Computer Fundamentals & Basic Concepts"
              topics={["Hardware Basics", "Software Overview", "Operating Systems"]}
              icon="🖥️"
            />
            <ModuleCard
              title="COC 2"
              description="Advanced Computer Architecture"
              topics={["CPU Architecture", "Memory Systems", "I/O Devices"]}
              icon="⚙️"
            />
            <ModuleCard
              title="COC 3"
              description="Specialized Technical Topics"
              topics={["Network Concepts", "Security Basics", "Emerging Technologies"]}
              icon="🔧"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-20 bg-white bg-opacity-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard number="1000+" label="Active Learners" />
            <StatCard number="50+" label="Comprehensive Lessons" />
            <StatCard number="200+" label="Practice Questions" />
            <StatCard number="95%" label="Success Rate" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Learners Say
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of satisfied learners who have improved their Technical vocabulary
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Sarah Johnson"
              role="Computer Science Student"
              content="RefletiCSS helped me master technical vocabulary that was crucial for my exams. The interactive approach made learning fun and effective!"
              rating={5}
            />
            <TestimonialCard
              name="Michael Chen"
              role="IT Professional"
              content="As someone transitioning into tech, this platform gave me the foundation I needed. The quizzes really tested my understanding."
              rating={5}
            />
            <TestimonialCard
              name="Emily Rodriguez"
              role="Self-Learner"
              content="The structured learning path and progress tracking kept me motivated. I can now confidently discuss technical concepts!"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join RefletiCSS today and transform your Technical vocabulary skills
          </p>
          <Link 
            to="/auth" 
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl inline-flex items-center"
          >
            Get Started Free
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, color }) {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all transform hover:scale-105">
      <div className={`w-16 h-16 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center mb-4`}>
        <Icon className="text-white" size={32} />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-blue-100 leading-relaxed">{description}</p>
    </div>
  );
}

function ModuleCard({ title, description, topics, icon }) {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-blue-100 mb-4">{description}</p>
      <ul className="space-y-2">
        {topics.map((topic, index) => (
          <li key={index} className="flex items-center text-blue-100">
            <CheckCircle size={16} className="text-green-400 mr-2 flex-shrink-0" />
            <span className="text-sm">{topic}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">{number}</div>
      <div className="text-blue-100 text-sm md:text-base">{label}</div>
    </div>
  );
}

function TestimonialCard({ name, role, content, rating }) {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20">
      <div className="flex items-center mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={20} className="text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-blue-100 mb-4 italic">"{content}"</p>
      <div className="border-t border-white border-opacity-20 pt-4">
        <div className="font-semibold text-white">{name}</div>
        <div className="text-blue-200 text-sm">{role}</div>
      </div>
    </div>
  );
}

export default Home;
