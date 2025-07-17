import React, { useState, useEffect } from 'react';
import { Heart, X, RotateCcw, ChevronLeft } from 'lucide-react';
import SwipeCard from './components/SwipeCard';
import SummaryScreen from './components/SummaryScreen';
import LoadingScreen from './components/LoadingScreen';
import { Cat } from './types/Cat';

function App() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCats, setLikedCats] = useState<Cat[]>([]);
  const [dislikedCats, setDislikedCats] = useState<Cat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSummary, setShowSummary] = useState(false);

  const CAT_COUNT = 15;

  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = async () => {
    setIsLoading(true);
    try {
      const catPromises = Array.from({ length: CAT_COUNT }, (_, i) => 
        fetch(`https://cataas.com/cat?${i}&width=400&height=500`)
          .then(response => ({
            id: i,
            url: response.url,
            liked: false
          }))
      );
      
      const fetchedCats = await Promise.all(catPromises);
      setCats(fetchedCats);
    } catch (error) {
      console.error('Error fetching cats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentIndex >= cats.length) return;

    const currentCat = cats[currentIndex];
    
    if (direction === 'right') {
      setLikedCats(prev => [...prev, currentCat]);
    } else {
      setDislikedCats(prev => [...prev, currentCat]);
    }

    if (currentIndex === cats.length - 1) {
      setTimeout(() => setShowSummary(true), 300);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setLikedCats([]);
    setDislikedCats([]);
    setShowSummary(false);
  };

  const handleBackToSwiping = () => {
    setShowSummary(false);
  };

  const progress = ((currentIndex + 1) / cats.length) * 100;

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (showSummary) {
    return (
      <SummaryScreen
        likedCats={likedCats}
        totalCats={cats.length}
        onRestart={handleRestart}
        onBack={handleBackToSwiping}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex flex-col">
      {/* Header */}
      <div className="pt-8 pb-4 px-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            Cat Matcher
          </h1>
          <p className="text-white/80 text-center text-sm">
            Swipe right to like, left to pass
          </p>
          
          {/* Progress Bar */}
          <div className="mt-4 bg-white/20 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Counter */}
          <div className="text-center mt-2 text-white/90 text-sm">
            {currentIndex + 1} / {cats.length}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 pb-8">
        <div className="max-w-md w-full">
          {/* Card Stack */}
          <div className="relative h-96 mb-8">
            {cats.slice(currentIndex, currentIndex + 3).map((cat, index) => (
              <SwipeCard
                key={cat.id}
                cat={cat}
                index={index}
                onSwipe={handleSwipe}
                isActive={index === 0}
              />
            ))}
            
            {currentIndex >= cats.length && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-3xl">
                <p className="text-white text-xl font-semibold">All done! 🎉</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-6">
            <button
              onClick={() => handleSwipe('left')}
              disabled={currentIndex >= cats.length}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm rounded-full p-4 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <X className="w-8 h-8 text-red-400" />
            </button>
            
            <button
              onClick={() => handleSwipe('right')}
              disabled={currentIndex >= cats.length}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm rounded-full p-4 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Heart className="w-8 h-8 text-pink-400" />
            </button>
          </div>

          {/* Restart Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleRestart}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full px-6 py-3 text-white font-medium transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Restart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;