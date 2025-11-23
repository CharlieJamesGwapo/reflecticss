import React, { useState, useEffect } from 'react';
import { RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';

function Flashcards() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/flashcards`);
        if (response.ok) {
          const data = await response.json();
          setFlashcards(data);
        }
      } catch (error) {
        console.error('Failed to fetch flashcards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, []);

  const filteredCards = category === 'all' ? flashcards : flashcards.filter(c => c.category === category);
  const currentCard = filteredCards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleShuffle = () => {
    const shuffled = [...filteredCards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">CSS Flashcards</h1>
          <p className="text-xl text-blue-100">Master CSS concepts with interactive flashcards</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {['all', 'selectors', 'properties', 'values', 'concepts'].map(cat => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                category === cat
                  ? 'bg-white text-purple-600'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {filteredCards.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white text-xl">No flashcards found</p>
          </div>
        ) : (
          <>
            {/* Flashcard */}
            <div className="mb-8">
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="h-96 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl cursor-pointer perspective"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.6s'
                }}
              >
                <div className="w-full h-full flex items-center justify-center p-8 text-center" style={{
                  backfaceVisibility: 'hidden'
                }}>
                  <div>
                    <p className="text-blue-200 text-sm mb-4">QUESTION</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                      {currentCard?.question}
                    </h2>
                    <p className="text-blue-200 text-sm mt-8">Click to reveal answer</p>
                  </div>
                </div>
              </div>

              {/* Flipped Card (hidden by default) */}
              <div
                className="h-96 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl shadow-2xl absolute inset-0 flex items-center justify-center p-8 text-center"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  display: isFlipped ? 'flex' : 'none'
                }}
              >
                <div>
                  <p className="text-green-200 text-sm mb-4">ANSWER</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    {currentCard?.answer}
                  </h2>
                  <p className="text-green-200 text-sm mt-8">Click to see question</p>
                </div>
              </div>
            </div>

            {/* Card Info */}
            <div className="text-center mb-8">
              <p className="text-white text-lg font-semibold">
                Card {currentIndex + 1} of {filteredCards.length}
              </p>
              <div className="w-full bg-white bg-opacity-10 rounded-full h-2 mt-4">
                <div
                  className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all"
                  style={{ width: `${((currentIndex + 1) / filteredCards.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button
                onClick={handlePrev}
                className="flex items-center space-x-2 px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition"
              >
                <ChevronLeft size={20} />
                <span>Previous</span>
              </button>

              <button
                onClick={handleShuffle}
                className="flex items-center space-x-2 px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition"
              >
                <RotateCw size={20} />
                <span>Shuffle</span>
              </button>

              <button
                onClick={handleNext}
                className="flex items-center space-x-2 px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition"
              >
                <span>Next</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Flashcards;
