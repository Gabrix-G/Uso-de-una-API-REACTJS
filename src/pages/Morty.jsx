import { useState, useEffect } from 'react';
import CardMorty from '../components/CardMorty.jsx'; // Importa el componente CardMorty

export default function Morty() {
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
        <div className="card-container">
          {characters.map((character) => (
            <CardMorty key={character.id} character={character} />
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

