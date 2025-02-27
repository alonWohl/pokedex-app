import { Link } from 'react-router-dom'
import { usePrefetchPokemon } from '../customHooks/UsePokemonHooks'

export function PrefetchingLink({ to, pokemonId, children, ...props }) {
  const prefetchPokemon = usePrefetchPokemon(pokemonId)

  return (
    <Link {...props} to={to} onMouseEnter={() => prefetchPokemon()} onTouchStart={() => prefetchPokemon()}>
      {children}
    </Link>
  )
}
