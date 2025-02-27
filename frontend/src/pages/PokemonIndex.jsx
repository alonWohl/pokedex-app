import { useEffect, useRef } from 'react'

import { PokemonList } from '../cmps/PokemonList'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { svgs } from '../services/Svgs.service'
import { useSelector } from 'react-redux'
import { usePokemonsInfinite } from '../customHooks/UsePokemonHooks'

export function PokemonIndex() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filterBy = useSelector((storeState) => storeState.pokemonModule.filterBy)

  const elementRef = useRef(null)
  const navigate = useNavigate()

  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = usePokemonsInfinite({ filterBy })

  const pokemons = data?.pages.flat() || []

  useEffect(() => {
    setSearchParams(filterBy)
  }, [filterBy])

  useEffect(() => {
    if (filterBy.generation) return

    const observer = new IntersectionObserver(onIntersection, {
      rootMargin: '200px',
      threshold: 1
    })
    if (observer && elementRef.current) {
      observer.observe(elementRef.current)
    }
    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [pokemons, filterBy.generation])

  function onIntersection(entries) {
    const firstEntry = entries[0]
    if (firstEntry.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  // if (isLoading && !pokemons.length)
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <div className="">{svgs.pokeball({ className: 'fill-zinc-800 animate-spin' })}</div>
  //     </div>
  //   )
  if (isError) return <div>Error loading Pokémon. Please try again.</div>
  return (
    <div className="flex h-screen flex-col lg:max-w-screen-lg mx-auto items-center relative bg-neutral-100 dark:bg-zinc-800 p-2  overflow-hidden text-zinc-800 dark:text-zinc-50">
      <div className="absolute -top-22 -right-17 flex items-center justify-center z-10">
        {svgs.pokeball({ className: 'fill-neutral-100 dark:fill-zinc-700', width: 250, height: 250 })}
      </div>

      <div className="flex justify-between items-center w-full relative z-20 my-8 px-4">
        <button className="flex items-center justify-center cursor-pointer" onClick={() => navigate('/')}>
          {svgs.back({ className: 'w-8 h-8 dark:stroke-zinc-50' })}
        </button>
        <button className="flex items-center justify-center cursor-pointer" onClick={() => navigate('/pokemon/filter')}>
          {svgs.more({ className: 'w-8 h-8 dark:stroke-fill-50' })}
        </button>
      </div>

      <h1 className="text-4xl self-start  ml-4 font-semibold tracking-wide text-zinc-800 relative z-20">Pokedex</h1>

      <PokemonList pokemons={pokemons} hasMore={hasNextPage} elementRef={elementRef} isLoading={isLoading} isFetchingNextPage={isFetchingNextPage} />
    </div>
  )
}
