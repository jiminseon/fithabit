
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

  // Character body colors
  const characterBodyColor = 'bg-yellow-100';
  const characterHeadColor = 'bg-yellow-100';
  
  // Expression styles
  const expressionStyles = {
    happy: {
      mouth: 'border-b-2 border-fithabit-red w-6 h-3 rounded-b-full',
      eyes: 'bg-fithabit-red rounded-full w-2 h-2'
    },
    sad: {
      mouth: 'border-t-2 border-fithabit-red w-6 h-3 rounded-t-full',
      eyes: 'bg-fithabit-red rounded-full w-2 h-2'
    },
    neutral: {
      mouth: 'border-t-0 border-b-2 border-fithabit-red w-6 h-1',
      eyes: 'bg-fithabit-red rounded-full w-2 h-2'
    }
  };
  
  // Outfit styles
  const outfitStyles: Record<string, { color: string, name: string }> = {
    default: { color: 'bg-transparent', name: '기본' },
    summer: { color: 'bg-blue-300', name: '여름 옷' },
    workout: { color: 'bg-gray-300', name: '운동복' },
    formal: { color: 'bg-gray-700', name: '정장' }
  };
  
  // Background styles
  const backgroundStyles: Record<string, { color: string, name: string }> = {
    default: { color: 'bg-fithabit-gray-light', name: '기본' },
    beach: { color: 'bg-blue-200', name: '해변' },
    park: { color: 'bg-green-200', name: '공원' }
  };
  
  // Accessory styles
  const accessoryStyles: Record<string, { style: string, position: string, name: string }> = {
    hat: { 
      style: 'bg-red-400 w-10 h-5 rounded-t-full', 
      position: 'absolute -top-4 left-1/2 transform -translate-x-1/2',
      name: '모자'
    },
    glasses: { 
      style: 'bg-gray-800 w-10 h-2 rounded', 
      position: 'absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2',
      name: '안경'
    }
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${animationClass}`}>
      {/* Background */}
      <div className={`absolute inset-0 ${backgroundStyles[background || 'default'].color} rounded-full overflow-hidden`}>
        {/* Background styling */}
      </div>
      
      {/* Character Body */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`${characterBodyColor} rounded-full w-3/4 h-3/4 relative flex flex-col items-center justify-center`}>
          {/* Head */}
          <div className={`${characterHeadColor} rounded-full w-5/6 h-5/6 relative flex items-center justify-center`}>
            {/* Eyes */}
            <div className="absolute flex w-full justify-center space-x-4" style={{ top: '40%' }}>
              <div className={expressionStyles[expression].eyes}></div>
              <div className={expressionStyles[expression].eyes}></div>
            </div>
            
            {/* Mouth */}
            <div className="absolute" style={{ top: '60%' }}>
              <div className={expressionStyles[expression].mouth}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Outfit Layer */}
      {outfit !== 'default' && (
        <div className="absolute inset-0 flex items-center justify-center opacity-70">
          <div className={`${outfitStyles[outfit]?.color || outfitStyles.default.color} rounded-full w-3/4 h-3/4`}>
          </div>
        </div>
      )}
      
      {/* Accessories */}
      {accessories && accessories.map((acc, index) => {
        const accessory = accessoryStyles[acc];
        if (accessory) {
          return (
            <div key={index} className={accessory.position}>
              <div className={accessory.style}></div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
