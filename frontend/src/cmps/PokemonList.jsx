import { PokemonPreview } from './PokemonPreview.jsx'
import { PokemonPreviewSkeleton } from './PokemonPreviewSkeleton.jsx'
import { LoadingSpinner } from './LoadingSpinner.jsx'

import { PrefetchingLink } from './PrefetchingLink.jsx'

export function PokemonList({ pokemons, hasMore, elementRef, isLoading, isFetchingNextPage }) {
	return (
		<ul className="grid grid-cols-2 gap-2 md:grid-cols-3 w-full p-4 mt-8 md:p-4  lg:grid-cols-3 lg:gap-4 relative z-20 overflow-y-auto no-scrollbar ">
			{pokemons.map(pokemon => (
				<li key={pokemon.id}>
					<PrefetchingLink to={`/pokemon/${pokemon.id}`} pokemonId={pokemon.id}>
						<PokemonPreview pokemon={pokemon} />
					</PrefetchingLink>
				</li>
			))}

			{isLoading && Array.from({ length: 12 }).map((_, index) => <PokemonPreviewSkeleton key={`skeleton-${index}`} />)}
			{isFetchingNextPage && <LoadingSpinner />}
			{hasMore && <div ref={elementRef} className="h-10"></div>}
		</ul>
	)
}
