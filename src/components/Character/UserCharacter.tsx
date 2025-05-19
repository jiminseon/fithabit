
import { useState } from 'react';

interface UserCharacterProps {
  size?: 'sm' | 'md' | 'lg';
  animation?: boolean;
  outfit?: string;
  accessories?: string[];
  background?: string;
  expression?: 'happy' | 'sad' | 'neutral';
  innerCircleColor?: string; // New prop for inner circle color
  premium?: boolean; // New prop for premium items
}

export const UserCharacter = ({
  size = 'md',
  animation = true,
  outfit = 'default',
  accessories = [],
  background = 'default',
  expression = 'happy',
  innerCircleColor = 'bg-yellow-100', // Default inner circle color
  premium = false, // Default not premium
}: UserCharacterProps) => {
  // Size classes based on prop
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  };
  
  // Animation class based on prop
  const animationClass = animation ? 'animate-bounce-slight' : '';
  
  // Premium animation and style
  const premiumClass = premium ? 'premium-item animate-pulse' : '';
  const premiumStyle = premium ? { 
    boxShadow: '0 0 15px 2px gold, 0 0 20px 5px rgba(255,215,0,0.5)',
    filter: 'drop-shadow(0 0 3px gold)' 
  } : {};

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
  const outfitStyles: Record<string, { color: string, name: string, premium?: boolean }> = {
    default: { color: 'bg-transparent', name: '기본' },
    summer: { color: 'bg-blue-300', name: '여름 옷' },
    workout: { color: 'bg-gray-300', name: '운동복' },
    formal: { color: 'bg-gray-700', name: '정장' },
    // New premium outfits
    designer: { color: 'bg-purple-400', name: '디자이너 의상', premium: true },
    spacesuit: { color: 'bg-blue-600', name: '우주복', premium: true },
    royal: { color: 'bg-red-600', name: '로얄 로브', premium: true }
  };
  
  // Background styles
  const backgroundStyles: Record<string, { color: string, name: string, premium?: boolean }> = {
    default: { color: 'bg-fithabit-gray-light', name: '기본' },
    beach: { color: 'bg-blue-200', name: '해변' },
    park: { color: 'bg-green-200', name: '공원' },
    // New premium backgrounds
    space: { color: 'bg-blue-900', name: '우주', premium: true },
    castle: { color: 'bg-amber-200', name: '성', premium: true },
    aurora: { color: 'bg-purple-300', name: '오로라', premium: true }
  };
  
  // Accessory styles
  const accessoryStyles: Record<string, { style: string, position: string, name: string, premium?: boolean }> = {
    hat: { 
      style: 'bg-red-400 w-10 h-5 rounded-t-full', 
      position: 'absolute -top-4 left-1/2 transform -translate-x-1/2',
      name: '모자'
    },
    glasses: { 
      style: 'bg-gray-800 w-10 h-2 rounded', 
      position: 'absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2',
      name: '안경'
    },
    // New accessories
    scarf: {
      style: 'bg-red-300 w-14 h-4 rounded',
      position: 'absolute top-[75%] left-1/2 transform -translate-x-1/2',
      name: '스카프'
    },
    bowtie: {
      style: 'bg-pink-500 w-8 h-4 rotate-45 transform',
      position: 'absolute top-[65%] left-1/2 transform -translate-x-1/2',
      name: '나비넥타이'
    },
    // New premium accessories
    crown: {
      style: 'bg-yellow-400 w-8 h-6 rounded-t-lg flex justify-center items-end', 
      position: 'absolute -top-6 left-1/2 transform -translate-x-1/2',
      name: '왕관',
      premium: true
    },
    wings: {
      style: 'bg-white w-16 h-10 rounded-full',
      position: 'absolute top-1/2 -left-12 transform -translate-y-1/2',
      name: '날개',
      premium: true
    }
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${animationClass} ${premiumClass}`} style={premiumStyle}>
      {/* Background */}
      <div className={`absolute inset-0 ${backgroundStyles[background || 'default'].color} rounded-full overflow-hidden`}>
        {/* Background styling */}
      </div>
      
      {/* Character Body */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`${innerCircleColor} rounded-full w-3/4 h-3/4 relative flex flex-col items-center justify-center`}>
          {/* Head */}
          <div className={`${innerCircleColor} rounded-full w-5/6 h-5/6 relative flex items-center justify-center`}>
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
          <div className={`${outfitStyles[outfit]?.color || outfitStyles.default.color} rounded-full w-3/4 h-3/4 ${outfitStyles[outfit]?.premium ? 'animate-pulse' : ''}`}>
          </div>
        </div>
      )}
      
      {/* Accessories */}
      {accessories && accessories.map((acc, index) => {
        const accessory = accessoryStyles[acc];
        if (accessory) {
          return (
            <div key={index} className={`${accessory.position} ${accessory.premium ? 'animate-pulse' : ''}`}>
              <div className={accessory.style}></div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
