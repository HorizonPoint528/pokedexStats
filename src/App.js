import './App.css';
import { useState } from "react";
import Axios from "axios";

function App() {

  const [pokemonName, setPokemonName] = useState("");
  const[pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
            name: "", 
            species: "", 
            img: "",
            type: "",
            hp: "",
            attack: "",
            defense: "",
            specialAttack: "",
            specialDefense: "",
            speed: "",
  });

  const searchPokemon = () => {
      Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
        (response) => {
          setPokemon({
            name: pokemonName, 
            img: response.data.sprites.front_default,
            type: response.data.types[0].type.name,
            hp: response.data.stats[0].base_stat,
            attack: response.data.stats[1].base_stat,
            defense: response.data.stats[2].base_stat,
            specialAttack: response.data.stats[3].base_stat,
            specialDefense: response.data.stats[4].base_stat,
            speed: response.data.stats[5].base_stat,
          });
          setPokemonChosen(true);
      }
    );
  };

  return (
    <div className="App">
      <div className = "TitleSection">
      <h1>Pokemon Stats</h1>
      <input type="text" autoCapitalize='words' onChange={(event)=> {setPokemonName(event.target.value)}}/>
      <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className="DisplaySection">{!pokemonChosen ? (<h1>Select a pokemon</h1>) : 
      (
        <>
      <h1>{pokemon.name}</h1>
      <img src= {pokemon.img}></img>
      <h3>Type: {pokemon.type}</h3>
      <h4>HP: {pokemon.hp}</h4>
      <h4>Attack: {pokemon.attack}</h4>
      <h4>Defense: {pokemon.defense}</h4>
      <h4>Special Attack: {pokemon.specialAttack}</h4>
      <h4>Special Defense: {pokemon.specialDefense}</h4>
      <h4>Speed: {pokemon.speed}</h4>
        </>
      )}
      </div>
    </div>
  );
}

export default App;
