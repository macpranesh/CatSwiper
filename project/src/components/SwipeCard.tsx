import React, { useState, useRef, useEffect } from 'react';
import { Cat } from '../types/Cat';

interface SwipeCardProps {
  cat: Cat;
  index: number;
  onSwipe: (direction: 'left' | 'right') => void;
  isActive: boolean;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ cat, index, onSwipe, isActive }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isRemoving, setIsRemoving] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const handleStart = (clientX: number, clientY: number) => {
    if (!isActive) return;
    
    setIsDragging(true);
    startPos.current = { x: clientX, y: clientY };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !isActive) return;

    const deltaX = clientX - startPos.current.x;
    const deltaY = clientY - startPos.current.y;
    
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleEnd = () => {
    if (!isDragging || !isActive) return;

    setIsDragging(false);
    
    const threshold = 100;
    const absX = Math.abs(dragOffset.x);
    
    if (absX > threshold) {
      const direction = dragOffset.x > 0 ? 'right' : 'left';
      setIsRemoving(true);
      
      setTimeout(() => {
        onSwipe(direction);
      }, 200);
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Global mouse events
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        handleMove(e.clientX, e.clientY);
      };

      const handleGlobalMouseUp = () => {
        handleEnd();
      };

      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging]);

  const rotation = dragOffset.x * 0.1;
  const opacity = Math.max(0, 1 - Math.abs(dragOffset.x) / 200);
  const scale = 1 - (index * 0.05);
  const yOffset = index * 4;

  const likeOpacity = Math.max(0, Math.min(1, dragOffset.x / 100));
  const dislikeOpacity = Math.max(0, Math.min(1, -dragOffset.x / 100));

  return (
    <div
      ref={cardRef}
      className={`absolute inset-0 cursor-grab active:cursor-grabbing select-none ${
        isRemoving ? 'transition-all duration-200' : ''
      }`}
      style={{
        transform: `
          translateX(${isRemoving ? dragOffset.x * 3 : dragOffset.x}px)
          translateY(${isRemoving ? dragOffset.y * 0.5 : dragOffset.y * 0.3 + yOffset}px)
          rotate(${isRemoving ? rotation * 2 : rotation}deg)
          scale(${scale})
        `,
        opacity: isRemoving ? 0 : opacity,
        zIndex: 10 - index,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden h-full relative">
        {/* Like/Dislike Overlays */}
        {isActive && (
          <>
            <div
              className="absolute top-8 right-8 z-20 px-4 py-2 bg-green-500 text-white font-bold text-xl rounded-lg transform rotate-12 border-4 border-green-500"
              style={{ opacity: likeOpacity }}
            >
              LIKE
            </div>
            <div
              className="absolute top-8 left-8 z-20 px-4 py-2 bg-red-500 text-white font-bold text-xl rounded-lg transform -rotate-12 border-4 border-red-500"
              style={{ opacity: dislikeOpacity }}
            >
              NOPE
            </div>
          </>
        )}

        {/* Cat Image */}
        <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
          <img
            src={cat.url}
            alt={`Cat ${cat.id}`}
            className="w-full h-full object-cover"
            draggable={false}
            onLoad={(e) => {
              const img = e.target as HTMLImageElement;
              img.style.opacity = '1';
            }}
            style={{ opacity: 0, transition: 'opacity 0.3s' }}
          />
        </div>

        {/* Card Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
          <h3 className="text-lg font-semibold">Adorable Cat #{cat.id + 1}</h3>
          <p className="text-sm opacity-90">Ready to steal your heart</p>
        </div>
      </div>
    </div>
  );
};

export default SwipeCard;