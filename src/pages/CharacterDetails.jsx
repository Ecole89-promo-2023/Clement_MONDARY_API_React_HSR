import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    async function fetchCharacter() {
      const response = await fetch(`http://localhost:3005/api/character/${id}`);
      const data = await response.json();
      setCharacter(data);
    }
    fetchCharacter();
  }, [id]);

  if (!character) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{character.name}</h1>
      {/* Ajoutez ici les détails du personnage */}
    </div>
  );
}

export default CharacterDetails;