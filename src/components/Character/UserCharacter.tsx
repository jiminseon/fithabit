
import { useState } from 'react';

interface UserCharacterProps {
  size?: 'sm' | 'md' | 'lg';
  animation?: boolean;
  outfit?: string;
  accessories?: string[];
  background?: string;
  expression?: 'happy' | 'sad' | 'neutral';
}

export const UserCharacter = ({
  size = 'md',
  animation = true,
  outfit = 'default',
  accessories = [],
  background = 'default',
  expression = 'happy',
}: UserCharacterProps) => {
  // Size classes based on prop
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  };
  
  // Animation class based on prop
  const animationClass = animation ? 'animate-bounce-slight' : '';
  
  // Expression classes
  const expressionEmoji = {
    happy: '😊',
    sad: '😔',
    neutral: '😐',
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${animationClass}`}>
      {/* Background */}
      <div className="absolute inset-0 bg-fithabit-gray-light rounded-full overflow-hidden">
        {/* This would be replaced with actual background images when available */}
        {background !== 'default' && (
          <div className="absolute inset-0 bg-cover bg-center" 
               style={{ backgroundImage: `url(${background})` }} />
        )}
      </div>
      
      {/* Rabbit Character */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-4xl">🐰</div>
      </div>
      
      {/* Outfit Layer (would be actual images in production) */}
      {outfit !== 'default' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xs bg-fithabit-red text-white px-1 rounded">
            {outfit}
          </div>
        </div>
      )}
      
      {/* Accessories */}
      {accessories.length > 0 && (
        <div className="absolute top-0 right-0">
          <div className="text-xs bg-yellow-500 text-white px-1 rounded">
            {accessories.length}
          </div>
        </div>
      )}
      
      {/* Expression */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-2">
        <div className="text-lg">{expressionEmoji[expression]}</div>
      </div>
    </div>
  );
};
