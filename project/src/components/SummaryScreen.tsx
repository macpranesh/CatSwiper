import React from 'react';
import { Heart, RotateCcw, ChevronLeft } from 'lucide-react';
import { Cat } from '../types/Cat';

interface SummaryScreenProps {
  likedCats: Cat[];
  totalCats: number;
  onRestart: () => void;
  onBack: () => void;
}

const SummaryScreen: React.FC<SummaryScreenProps> = ({
  likedCats,
  totalCats,
  onRestart,
  onBack
}) => {
  const likePercentage = Math.round((likedCats.length / totalCats) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex flex-col">
      {/* Header */}
      <div className="pt-8 pb-4 px-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="mb-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              Your Cat Preferences
            </h1>
            <p className="text-white/80 text-lg">
              Here's what you loved! 😻
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {likedCats.length}
              </div>
              <div className="text-white/80 text-sm">
                Cats Liked
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {totalCats - likedCats.length}
              </div>
              <div className="text-white/80 text-sm">
                Cats Passed
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {likePercentage}%
              </div>
              <div className="text-white/80 text-sm">
                Like Rate
              </div>
            </div>
          </div>

          {/* Liked Cats Grid */}
          {likedCats.length > 0 ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-400" />
                Your Favorite Cats
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {likedCats.map((cat, index) => (
                  <div
                    key={cat.id}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200"
                  >
                    <div className="aspect-square">
                      <img
                        src={cat.url}
                        alt={`Liked cat ${cat.id}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-gray-800">
                        Cat #{cat.id + 1}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 text-center mb-8">
              <div className="text-6xl mb-4">🙀</div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                No Matches Found
              </h2>
              <p className="text-white/80">
                Looks like you're pretty picky! Try again?
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={onRestart}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full px-8 py-4 text-white font-medium transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryScreen;