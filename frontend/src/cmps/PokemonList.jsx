import { Link } from 'react-router-dom'
import { PokemonPreview } from './PokemonPreview.jsx'

export function PokemonList({ pokemons, hasMore, elementRef }) {
  return (
    <ul className="grid grid-cols-2 gap-2 p-4 md:grid-cols-3 lg:grid-cols-4  max-w-4xl">
      {pokemons.map((pokemon) => (
        <li key={pokemon.id} className="bg-white rounded-lg p-4 shadow-md w-full">
          <Link to={`/pokemon/${pokemon.id}`}>
            <PokemonPreview pokemon={pokemon} />
          </Link>
        </li>
      ))}

      {hasMore && (
        <div ref={elementRef} className="text-center text-gray-500">
          Loading...
        </div>
      )}
    </ul>
  )
}
