import { PokemonInfo } from
  '../App';

export function PokemonCard({ id, name, image, types }: PokemonInfo) {
  return (
    <div className="rounded border-black border-2 mx-2 p-2">
      <img src={image} alt={name} />
      <p>#{id} {name}</p>
      <span className='flex justify-center gap-1'>
        {types.map(type => (
          <span>{type}</span>
        ))}</span>
    </div>

  )
}
