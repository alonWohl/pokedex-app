import { Link } from 'react-router-dom'
import { PokemonPreview } from './PokemonPreview.jsx'

export function PokemonList({ pokemons, hasMore, elementRef, isLoading }) {
  return (
    <>
      <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 w-full mt-8 md:p-0 lg:grid-cols-4 relative z-20 overflow-y-auto no-scrollbar">
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <Link to={`/pokemon/${pokemon.id}`}>
              <PokemonPreview pokemon={pokemon} />
            </Link>
          </li>
        ))}
        {isLoading && (
          <div className="flex justify-center w-full py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}
      </ul>

      {/* Loading indicator */}

      {hasMore && <div ref={elementRef} className="h-10"></div>}
    </>
  )
}
