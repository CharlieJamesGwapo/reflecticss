import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Loader, Upload, X, CheckCircle, AlertCircle, Sparkles, Zap, Shield } from 'lucide-react';
import Swal from 'sweetalert2';

function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [successAnimation, setSuccessAnimation] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleFieldFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleFieldBlur = () => {
    setFocusedField('');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Photo size must be less than 5MB');
        return;
      }
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleToggleMode = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setFormData({ email: '', password: '', name: '', confirmPassword: '' });
      setError('');
      setPhotoFile(null);
      setPhotoPreview(null);
      setIsAnimating(false);
    }, 300);
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (!isLogin) {
      if (!formData.name) {
        setError('Name is required');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: error,
        confirmButtonColor: '#2563eb',
        customClass: {
          container: 'swal-container'
        }
      });
      return;
    }

    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      
      if (isLogin) {
        // Login - simple JSON request
        const response = await fetch(`${apiUrl}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          const errorMsg = data.error || 'Authentication failed';
          setError(errorMsg);
          
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: errorMsg,
            confirmButtonColor: '#2563eb',
            customClass: {
              container: 'swal-container'
            }
          });
          return;
        }

        // Store token and user with remember me preference
        if (rememberMe) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('rememberMe', 'true');
        } else {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('rememberMe', 'false');
        }
        setUser(data.user);

        // Success alert
        await Swal.fire({
          icon: 'success',
          title: 'Welcome Back!',
          text: `Hello ${data.user.name}! You're logged in successfully.`,
          confirmButtonColor: '#2563eb',
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            container: 'swal-container'
          }
        });

        navigate('/');
      } else {
        // Registration - FormData for file upload
        const formDataToSend = new FormData();
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('name', formData.name);
        if (photoFile) {
          formDataToSend.append('profilePhoto', photoFile);
        }

        const response = await fetch(`${apiUrl}${endpoint}`, {
          method: 'POST',
          body: formDataToSend
        });

        const data = await response.json();

        if (!response.ok) {
          const errorMsg = data.error || 'Registration failed';
          setError(errorMsg);
          
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: errorMsg,
            confirmButtonColor: '#2563eb',
            customClass: {
              container: 'swal-container'
            }
          });
          return;
        }

        // Store token and user
        localStorage.setItem('token', data.token);
        setUser(data.user);

        // Success alert
        await Swal.fire({
          icon: 'success',
          title: 'Account Created!',
          text: `Welcome ${data.user.name}! Your account has been created successfully.`,
          confirmButtonColor: '#2563eb',
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            container: 'swal-container'
          }
        });

        navigate('/');
      }
    } catch (err) {
      const errorMsg = 'Connection error. Please check your internet and try again.';
      setError(errorMsg);
      
      Swal.fire({
        icon: 'error',
        title: 'Connection Error',
        text: errorMsg,
        confirmButtonColor: '#2563eb',
        customClass: {
          container: 'swal-container'
        }
      });
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 flex items-center justify-center p-3 sm:p-4 py-8 sm:py-0 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-64 sm:w-96 h-64 sm:h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full opacity-10 animate-pulse-glow"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <div className={`relative w-full max-w-md transition-all duration-500 ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100 animate-bounce-in'}`}>
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden backdrop-blur-lg bg-opacity-95 transform hover:scale-105 transition-transform duration-300">
          {/* Header with Logo */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-size-200 animate-gradient-shift px-4 sm:px-6 py-8 sm:py-10 text-center flex flex-col items-center justify-center relative overflow-hidden">
            {/* Animated sparkles */}
            <div className="absolute inset-0">
              {[...Array(3)].map((_, i) => (
                <Sparkles
                  key={i}
                  className="absolute text-white opacity-60 animate-pulse"
                  size={16}
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${30 + i * 20}%`,
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}
            </div>
            
            <div className="relative flex items-center justify-center mb-4 z-10">
              <div className="absolute inset-0 bg-white rounded-full opacity-20 blur-lg animate-pulse"></div>
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="RefletiCSS Logo" 
                  className="h-24 sm:h-32 w-24 sm:w-32 object-cover rounded-full border-4 border-white shadow-xl animate-float hover:animate-bounce transition-all duration-300"
                  title="RefletiCSS - A reflective learning tool in enhancing Technical vocabulary learning"
                />
                <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1 animate-bounce">
                  <Zap size={16} className="text-yellow-800" />
                </div>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 animate-slide-in-left">
              {isLogin ? 'Welcome Back!' : 'Join Us Today!'}
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 mt-2 animate-slide-in-right">
              {isLogin ? 'Sign in to continue your learning journey' : 'Start your CSS mastery journey today'}
            </p>
          </div>

          {/* Form container */}
          <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
            {/* Error message with animation */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-error-shake flex items-center gap-3">
                <AlertCircle className="text-red-500" size={20} />
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Name field (Register only) */}
              {!isLogin && (
                <>
                  <div className="animate-slide-in-left">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <User size={16} className="text-blue-500" />
                      Full Name
                    </label>
                    <div className="relative">
                      <User className={`absolute left-3 top-2.5 sm:top-3 transition-colors duration-300 ${focusedField === 'name' ? 'text-blue-600 scale-110' : 'text-blue-500'}`} size={18} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => handleFieldFocus('name')}
                        onBlur={handleFieldBlur}
                        placeholder="John Doe"
                        className={`w-full pl-10 pr-4 py-2 sm:py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 text-sm sm:text-base ${focusedField === 'name' ? 'border-blue-500 shadow-lg shadow-blue-200 scale-105' : 'border-gray-200 hover:border-gray-300'}`}
                      />
                      {formData.name && (
                        <CheckCircle className="absolute right-3 top-2.5 sm:top-3 text-green-500 animate-success-bounce" size={18} />
                      )}
                    </div>
                  </div>

                  {/* Profile Photo Upload (Register only) */}
                  <div className="animate-slide-in-right">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Upload size={16} className="text-blue-500" />
                      Profile Photo (Optional)
                    </label>
                    {photoPreview ? (
                      <div className="relative w-full group">
                        <img src={photoPreview} alt="Preview" className="w-full h-32 sm:h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300" />
                        <button
                          type="button"
                          onClick={removePhoto}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-300 hover:scale-110 shadow-lg"
                        >
                          <X size={18} />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                          <CheckCircle size={12} />
                          Photo Added
                        </div>
                      </div>
                    ) : (
                      <label className="w-full flex items-center justify-center px-3 sm:px-4 py-4 sm:py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 hover:scale-105 group">
                        <div className="flex flex-col items-center">
                          <Upload className="text-gray-400 mb-2 group-hover:text-blue-500 transition-colors group-hover:animate-bounce" size={20} />
                          <span className="text-xs sm:text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Click to upload photo</span>
                          <span className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </>
              )}

              {/* Email field */}
              <div className="animate-slide-in-left">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Mail size={16} className="text-blue-500" />
                  Email Address
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-2.5 sm:top-3 transition-colors duration-300 ${focusedField === 'email' ? 'text-blue-600 scale-110' : 'text-blue-500'}`} size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFieldFocus('email')}
                    onBlur={handleFieldBlur}
                    placeholder="you@example.com"
                    className={`w-full pl-10 pr-4 py-2 sm:py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 text-sm sm:text-base ${focusedField === 'email' ? 'border-blue-500 shadow-lg shadow-blue-200 scale-105' : 'border-gray-200 hover:border-gray-300'}`}
                  />
                  {formData.email && formData.email.includes('@') && (
                    <CheckCircle className="absolute right-3 top-2.5 sm:top-3 text-green-500 animate-success-bounce" size={18} />
                  )}
                </div>
              </div>

              {/* Password field */}
              <div className="animate-slide-in-right">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Lock size={16} className="text-blue-500" />
                  Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-2.5 sm:top-3 transition-colors duration-300 ${focusedField === 'password' ? 'text-blue-600 scale-110' : 'text-blue-500'}`} size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => handleFieldFocus('password')}
                    onBlur={handleFieldBlur}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-12 py-2 sm:py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 text-sm sm:text-base ${focusedField === 'password' ? 'border-blue-500 shadow-lg shadow-blue-200 scale-105' : 'border-gray-200 hover:border-gray-300'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 sm:top-3 text-gray-400 hover:text-blue-500 transition-all duration-300 hover:scale-110"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {formData.password && formData.password.length >= 6 && (
                    <CheckCircle className="absolute right-12 top-2.5 sm:top-3 text-green-500 animate-success-bounce" size={18} />
                  )}
                </div>
              </div>

              {/* Remember Me checkbox (Login only) */}
              {isLogin && (
                <div className="animate-slide-in-left">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-all duration-300 group-hover:border-blue-400"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                      Remember me for 30 days
                    </span>
                  </label>
                </div>
              )}

              {/* Confirm password field (Register only) */}
              {!isLogin && (
                <div className="animate-slide-in-left">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Lock size={16} className="text-blue-500" />
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-2.5 sm:top-3 transition-colors duration-300 ${focusedField === 'confirmPassword' ? 'text-blue-600 scale-110' : 'text-blue-500'}`} size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onFocus={() => handleFieldFocus('confirmPassword')}
                      onBlur={handleFieldBlur}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-4 py-2 sm:py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 text-sm sm:text-base ${focusedField === 'confirmPassword' ? 'border-blue-500 shadow-lg shadow-blue-200 scale-105' : 'border-gray-200 hover:border-gray-300'}`}
                    />
                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                      <CheckCircle className="absolute right-3 top-2.5 sm:top-3 text-green-500 animate-success-bounce" size={18} />
                    )}
                  </div>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-4 sm:mt-6 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-size-200 animate-gradient-shift text-white font-bold py-2.5 sm:py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base relative overflow-hidden group ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:scale-105 hover:shadow-purple-200'}`}
              >
                <span className="relative z-10">
                  {loading ? (
                    <>
                      <Loader size={18} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {isLogin ? (
                        <>
                          <Shield size={18} />
                          Sign In Securely
                        </>
                      ) : (
                        <>
                          <Sparkles size={18} />
                          Create Account
                        </>
                      )}
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </form>

            {/* Divider with animation */}
            <div className="my-4 sm:my-6 flex items-center animate-fade-in">
              <div className="flex-1 border-t-2 border-gray-200"></div>
              <span className="px-3 text-gray-500 text-xs sm:text-sm animate-pulse">or</span>
              <div className="flex-1 border-t-2 border-gray-200"></div>
            </div>

            {/* Toggle button */}
            <div className="text-center animate-slide-up">
              <p className="text-gray-600 mb-2 sm:mb-3 text-sm sm:text-base">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
              </p>
              <button
                type="button"
                onClick={handleToggleMode}
                className="text-blue-600 font-semibold hover:text-purple-600 transition-all duration-300 text-sm sm:text-base hover:scale-105 inline-flex items-center gap-2 group"
              >
                {isLogin ? (
                  <>
                    <Sparkles size={16} className="group-hover:animate-bounce" />
                    Create Account
                  </>
                ) : (
                  <>
                    <Shield size={16} className="group-hover:animate-bounce" />
                    Sign In
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Footer with security badge */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-4 sm:px-6 py-3 sm:py-4 text-center border-t border-gray-200 animate-fade-in">
            <div className="flex items-center justify-center gap-2">
              <Shield size={16} className="text-green-500" />
              <p className="text-gray-600 text-xs sm:text-xs">
                Your data is securely stored in our Neon PostgreSQL database
              </p>
              <Shield size={16} className="text-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
