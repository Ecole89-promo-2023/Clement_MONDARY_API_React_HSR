import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CharacterDetails from './pages/CharacterDetails';
import './App.css'

function App() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    async function fetchCharacters() {
      const response = await fetch('http://localhost:3005/api/characters');
      const data = await response.json();
      setCharacters(data);
    }
    fetchCharacters();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home characters={characters} />} />
      <Route path="/character/:id" element={<CharacterDetails />} />
    </Routes>
  )
}

export default App
