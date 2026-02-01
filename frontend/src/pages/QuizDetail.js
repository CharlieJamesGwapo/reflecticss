import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle } from 'lucide-react';

function QuizDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/quizzes/${id}`);
        if (response.ok) {
          const data = await response.json();
          
          // Randomize questions order
          if (data.questions && data.questions.length > 0) {
            const shuffledQuestions = [...data.questions].sort(() => Math.random() - 0.5);
            
            // Also randomize choices within each question
            const randomizedQuestions = shuffledQuestions.map(question => ({
              ...question,
              choices: [...question.choices].sort(() => Math.random() - 0.5)
            }));
            
            setQuiz({
              ...data,
              questions: randomizedQuestions
            });
          } else {
            setQuiz(data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch quiz:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleAnswerSelect = (questionId, choiceId) => {
    setAnswers({
      ...answers,
      [questionId]: choiceId
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/quizzes/${id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ answers })
      });

      if (response.ok) {
        const data = await response.json();
        setScore(data.score);
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white"></div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="text-center py-20">
        <p className="text-white text-xl">Quiz not found</p>
      </div>
    );
  }

  const questions = quiz.questions || [];
  const currentQ = questions[currentQuestion];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl border border-white border-opacity-20 p-8 md:p-12 text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={60} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">Quiz Complete!</h1>
              <p className="text-blue-100 text-xl mb-8">Great job! Here's how you did:</p>
            </div>

            <div className="bg-white bg-opacity-10 rounded-xl p-8 mb-8">
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                {score}%
              </div>
              <p className="text-blue-200 text-lg">
                You answered {Math.round((score / 100) * questions.length)} out of {questions.length} questions correctly
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/quizzes')}
                className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Back to Quizzes
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate('/quizzes')}
          className="flex items-center text-white hover:text-blue-200 mb-6 transition"
        >
          <ChevronLeft size={24} />
          <span>Back to Quizzes</span>
        </button>

        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl border border-white border-opacity-20 overflow-hidden">
          {/* Progress Bar */}
          <div className="h-2 bg-white bg-opacity-10">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <div className="mb-8">
              <p className="text-blue-200 text-sm font-semibold mb-2">
                Question {currentQuestion + 1} of {questions.length}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">{currentQ.question}</h2>
            </div>

            {/* Choices */}
            <div className="space-y-3 mb-8">
              {currentQ.choices.map(choice => (
                <button
                  key={choice.id}
                  onClick={() => handleAnswerSelect(currentQ.id, choice.id)}
                  className={`w-full p-4 rounded-lg text-left font-semibold transition ${
                    answers[currentQ.id] === choice.id
                      ? 'bg-blue-500 text-white border-2 border-blue-300'
                      : 'bg-white bg-opacity-10 text-white border-2 border-white border-opacity-20 hover:bg-opacity-20'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                        answers[currentQ.id] === choice.id
                          ? 'bg-white border-white'
                          : 'border-white border-opacity-50'
                      }`}
                    >
                      {answers[currentQ.id] === choice.id && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <span>{choice.text}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-8 border-t border-white border-opacity-20">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition"
              >
                Previous
              </button>

              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={Object.keys(answers).length !== questions.length}
                  className="px-8 py-3 bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition"
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizDetail;
