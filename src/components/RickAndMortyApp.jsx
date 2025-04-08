import { useState, useEffect } from 'react';

export default function RickAndMortyApp() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch (error) {
        setError('Error fetching characters: ' + error.message);
        console.error('Error fetching characters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  const handlePrevPage = () => {
    setPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setPage(prev => Math.min(totalPages, prev + 1));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-bold text-blue-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-bold text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Rick and Morty Characters</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
        
        <div className="flex justify-center mt-8 gap-4">
          <button 
            onClick={handlePrevPage} 
            disabled={page === 1}
            className={`px-4 py-2 rounded font-medium ${page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            Previous
          </button>
          <div className="flex items-center px-4">
            Page {page} of {totalPages}
          </div>
          <button 
            onClick={handleNextPage} 
            disabled={page === totalPages}
            className={`px-4 py-2 rounded font-medium ${page === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function CharacterCard({ character }) {
  const statusColor = {
    'Alive': 'bg-green-500',
    'Dead': 'bg-red-500',
    'unknown': 'bg-gray-500'
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 aspect-square flex flex-col">
      <div className="w-full h-1/2 overflow-hidden">
        <img 
          src={character.image || "/api/placeholder/300/300"} 
          alt={character.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-3 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h2 className="text-lg font-bold text-gray-800 truncate">{character.name}</h2>
          <div className="flex items-center">
            <span className={`inline-block w-2 h-2 rounded-full mr-1 ${statusColor[character.status]}`}></span>
            <span className="text-xs text-gray-600">{character.status}</span>
          </div>
        </div>
        
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
        
        <div className="text-xs text-gray-600 mt-auto">
          <div className="font-medium border-t border-gray-200 pt-1">
            Episodes: {character.episode.length}
          </div>
        </div>
      </div>
    </div>
  );
}