import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { pokemonService } from '../services/pokemon'

export function usePokemonsInfinite({ filterBy }) {
  return useInfiniteQuery({
    queryKey: ['pokemons', filterBy],
    queryFn: ({ pageParam = 0 }) => {
      const currFilterBy = { ...filterBy, pageIdx: pageParam, limit: filterBy.limit }
      return pokemonService.query(currFilterBy)
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length > 0 ? pages.length : undefined
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60 * 24
  })
}

export function usePokemon({ pokemonId }) {
  return useQuery({
    queryKey: ['pokemon', pokemonId],
    queryFn: () => pokemonService.getById(pokemonId),
    enabled: !!pokemonId
  })
}
