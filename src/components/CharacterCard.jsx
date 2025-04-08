import { useState } from 'react';

export default function CharacterCard({ character }) {
  const statusColor = {
    'Alive': 'bg-green-500',
    'Dead': 'bg-red-500',
    'unknown': 'bg-gray-400'
  };
  
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-white rounded-lg overflow-hidden shadow-lg border-2 ${isHovered ? 'border-blue-500' : 'border-gray-200'} transition-all duration-300 w-full aspect-square flex flex-col`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-1/2 overflow-hidden relative">
        <img 
          src={character.image || "/api/placeholder/300/300"} 
          alt={character.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex items-center bg-gray-800 bg-opacity-70 px-2 py-1 rounded-full">
          <span className={`inline-block w-2 h-2 rounded-full mr-1 ${statusColor[character.status]}`}></span>
          <span className="text-xs text-white">{character.status}</span>
        </div>
      </div>
      
      <div className="p-3 flex flex-col flex-grow">
        <h2 className="text-lg font-bold text-gray-800 truncate mb-2">{character.name}</h2>
        
        <div className="mb-2 text-xs flex-grow">
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Species:</span>
            <span className="font-medium">{character.species}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Gender:</span>
            <span className="font-medium">{character.gender}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Origin:</span>
            <span className="font-medium truncate" title={character.origin.name}>{character.origin.name}</span>
          </div>
        </div>
        
        <div className="mt-auto border-t border-gray-200 pt-1 text-xs text-center">
          <div className="font-medium text-gray-600">
            Episodes: {character.episode.length}
          </div>
        </div>
      </div>
    </div>
  );
}