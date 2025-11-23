import React from 'react';
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Github, Heart, ArrowRight } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-300 pt-16 sm:pt-20 pb-8 sm:pb-12 mt-16 sm:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
          
          {/* About Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 blur-lg"></div>
                <img 
                  src="/logo.png" 
                  alt="RefletiCSS Logo" 
                  className="h-14 w-14 object-cover rounded-full border-2 border-blue-400 shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">RefletiCSS</h3>
                <p className="text-xs text-blue-400">Learning Platform</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              A reflective learning tool in enhancing Technical vocabulary learning through interactive lessons, quizzes, and comprehensive reviews.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-blue-400 hover:scale-110 transition-all duration-300 p-2 rounded-full hover:bg-blue-400 hover:bg-opacity-10">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 hover:scale-110 transition-all duration-300 p-2 rounded-full hover:bg-blue-400 hover:bg-opacity-10">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 hover:scale-110 transition-all duration-300 p-2 rounded-full hover:bg-blue-400 hover:bg-opacity-10">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 hover:scale-110 transition-all duration-300 p-2 rounded-full hover:bg-blue-400 hover:bg-opacity-10">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-base sm:text-lg border-b border-blue-400 pb-3">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-400 hover:text-blue-400 transition text-sm flex items-center gap-2 group">
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a href="/reviewer-selection" className="text-gray-400 hover:text-blue-400 transition text-sm flex items-center gap-2 group">
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  <span>Learn</span>
                </a>
              </li>
              <li>
                <a href="/coc-selection" className="text-gray-400 hover:text-blue-400 transition text-sm flex items-center gap-2 group">
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  <span>Quizzes</span>
                </a>
              </li>
              <li>
                <a href="/account-settings" className="text-gray-400 hover:text-blue-400 transition text-sm flex items-center gap-2 group">
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  <span>Account Settings</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-base sm:text-lg border-b border-blue-400 pb-3">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-blue-400 hover:bg-opacity-10 transition group">
                <Mail size={20} className="text-blue-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Email</p>
                  <a href="mailto:Capstonee2@gmail.com" className="text-blue-400 hover:text-blue-300 transition text-sm font-medium break-all">
                    Capstonee2@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-blue-400 hover:bg-opacity-10 transition group">
                <Phone size={20} className="text-blue-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Phone</p>
                  <p className="text-blue-400 text-sm font-medium">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-blue-400 hover:bg-opacity-10 transition group">
                <MapPin size={20} className="text-blue-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Location</p>
                  <p className="text-blue-400 text-sm font-medium">Thailand</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Map */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-base sm:text-lg border-b border-blue-400 pb-3">Our Location</h3>
            <div className="rounded-xl overflow-hidden shadow-2xl h-40 sm:h-48 border border-blue-400 border-opacity-30 hover:border-opacity-50 transition">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.0921221097786!2d100.49855!3d13.7563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ef5a9ce5555%3A0x46ee617f35421c0!2sThailand!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="RefletiCSS Location - Thailand"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 border-opacity-50 my-12"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-gray-400">
          <p className="flex items-center gap-2">
            &copy; 2024 RefletiCSS. Made with <Heart size={16} className="text-red-500 fill-red-500" /> for learners.
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            <a href="#" className="hover:text-blue-400 transition hover:underline">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition hover:underline">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition hover:underline">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
