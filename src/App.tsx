import { useEffect, useState } from "react"
import { PokemonCard } from "./components/PokemonCard";

export interface PokemonInfo {
  id: number
  name: string
  image: string
  types: string[]
}

export function App() {
  const [pokemons, setPokemons] = useState<PokemonInfo[]>();
  const [fetchPokemon, setFetchPokemon] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      if (fetchPokemon) {
        const pokeIds = Array.from({ length: 150 }, (_, i) => i + 1);
        const pokes: PokemonInfo[] = [];
        for (let i = 1; i <= pokeIds.length; i++) {
          await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(res => res.json())
            .then(data => {
              const { name, sprites, types } = data;
              const typesText = types.map(t => t.type.name)
              pokes.push({ id: i, name, image: sprites.front_default, types: typesText });
            })
        }
        setPokemons([...pokes]);
        setFetchPokemon(false);
      }
    })()

  }, [pokemons, fetchPokemon])
  if (!pokemons) return <h1>Loading... </h1>
  return (
    <main className="flex flex-wrap gap-4 p-2 mx-auto items-center justify-center">
      {pokemons.map(pokemon => (
        <PokemonCard key={pokemon.id} id={pokemon.id} image={pokemon.image} name={pokemon.name} types={pokemon.types} />
      ))}
    </main>
  )
}