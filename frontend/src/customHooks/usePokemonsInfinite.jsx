import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { pokemonService } from '../services/pokemon'

export function usePokemonsInfinite({ filterBy }) {
  return useInfiniteQuery({
    queryKey: ['pokemons', filterBy.generation],
    queryFn: ({ pageParam = 0 }) => {
      if (filterBy.generation) {
        return pokemonService.query({
          generation: filterBy.generation,
          pageIdx: 0,
          limit: undefined
        })
      }

      return pokemonService.query({
        generation: '',
        pageIdx: pageParam,
        limit: filterBy.limit
      })
    },
    getNextPageParam: (lastPage, pages) => {
      if (filterBy.generation) return undefined

      return lastPage.length > 0 ? pages.length : undefined
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60 * 24,
    keepPreviousData: true
  })
}

export function usePokemon({ pokemonId }) {
  return useQuery({
    queryKey: ['pokemon', pokemonId],
    queryFn: () => pokemonService.getById(pokemonId),
    enabled: !!pokemonId
  })
}
