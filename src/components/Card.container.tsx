import { useState, useEffect } from 'react';
import Card from './Card';
import Cards from './globalIterfaces';

export default function CardContainer() {
  const [pokemon, setPokemon] = useState<Cards[]>([]);
  const [clickedCards, setClickedCards] = useState<string[]>([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);
  

  const fetchData = async () => {
    try {
      const response = await fetch('https://vwalln99.github.io/jsonData/data.json'); 
      const data = await response.json();
      const slicedData = data.splice(550, 12);
      setPokemon(slicedData);
    } catch (error) {
      console.error(error);
    }
  };

  const shuffleCards = () => {
    setPokemon(prevPokemon => {
      const shuffledPokemon = [...prevPokemon];
      for (let i = shuffledPokemon.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPokemon[i], shuffledPokemon[j]] = [shuffledPokemon[j], shuffledPokemon[i]];
      }
      return shuffledPokemon;
    });
  };
  

  const handleClick = (pokemon: Cards) => {
console.log(pokemon)
    shuffleCards();
    if (clickedCards.includes(pokemon.name)) {
      setCurrentScore(0);
      setClickedCards([]);
    } else {
      setCurrentScore(currentScore + 1);
      setClickedCards([...clickedCards, pokemon.name]);
      if (currentScore + 1 > bestScore) {
        setBestScore(currentScore + 1);
      }
    }
  };

  return (
    <>
      <div>
        <h1>Memory Game</h1>
        <h2>Test your memory</h2>
        <p>Click on the pictures, without clicking them twice</p>
        <div className='score'>
        <p>Score: {currentScore}</p>
        <p>Best Score: {bestScore}</p>
        </div>
      </div>
      <div className='cardcontainer'>
        <Card data={pokemon} onClick={handleClick} />
      </div>
    </>
  );
}
