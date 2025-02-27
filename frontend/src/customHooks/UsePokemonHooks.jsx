import { useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { pokemonService } from '../services/pokemon'

export function usePrefetchPokemon(pokemonId) {
  const queryClient = useQueryClient()

  const prefetchPokemon = async () => {
    if (!pokemonId) return

    await queryClient.prefetchQuery({
      queryKey: ['pokemon', pokemonId],
      queryFn: () => pokemonService.getById(pokemonId),
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30 // 30 minutes
    })

    await queryClient.prefetchQuery({
      queryKey: ['pokemonEvolution', pokemonId],
      queryFn: () => pokemonService.getEvolutionChain(pokemonId),
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30 // 30 minutes
    })
  }

  return prefetchPokemon
}

export function usePrefetchGeneration(generation) {
  const queryClient = useQueryClient()

  const prefetchGeneration = async () => {
    if (!generation) return

    await queryClient.prefetchInfiniteQuery({
      queryKey: ['pokemons', generation],
      queryFn: () =>
        pokemonService.query({
          generation,
          pageIdx: 0,
          limit: undefined
        }),
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30 // 30 minutes
    })
  }

  return prefetchGeneration
}

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
    keepPreviousData: true,
    initialPageParam: 0
  })
}

export function usePrefetchEvolution(pokemonId) {
  const queryClient = useQueryClient()

  const prefetchEvolution = async () => {
    if (!pokemonId) return

    await queryClient.prefetchQuery({
      queryKey: ['pokemonEvolution', pokemonId],
      queryFn: () => pokemonService.getEvolutionChain(pokemonId),
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30 // 30 minutes
    })
  }
  return prefetchEvolution
}

export function usePokemon({ pokemonId }) {
  return useQuery({
    queryKey: ['pokemon', pokemonId],
    queryFn: () => pokemonService.getById(pokemonId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30 // 30 minutes
  })
}

export function usePokemonEvolution({ pokemonId }) {
  return useQuery({
    queryKey: ['pokemonEvolution', pokemonId],
    queryFn: () => pokemonService.getEvolutionChain(pokemonId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30 // 30 minutes
  })
}
