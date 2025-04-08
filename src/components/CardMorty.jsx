import React from 'react';
import './CardStyle.css';

function CardMorty({ character }) {
  const statusColor = {
    'Alive': 'bg-green-500',
    'Dead': 'bg-red-500',
    'unknown': 'bg-gray-500'
  };

  return (
    <div className="card">
      <img
        src={character.image || "/api/placeholder/300/300"}
        alt={character.name}
        className="card-img"
      />
      <div className="card-body">
        <h2 className="card-title">{character.name}</h2>
        <div className="card-status">
          <span
            className="status-indicator"
            style={{ backgroundColor: statusColor[character.status] }}
          ></span>
          <span>{character.status}</span>
        </div>
        <p className="card-text">Species: {character.species}</p>
        <p className="card-text">Gender: {character.gender}</p>
        <p className="card-text">Origin: {character.origin.name}</p>
        <p className="card-text">Location: {character.location.name}</p>
        <p className="card-text">Episodes: {character.episode.length}</p>
      </div>
    </div>
  );
}

export default CardMorty;