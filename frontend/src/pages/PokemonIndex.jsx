import { useEffect, useState, useRef } from 'react'

import { PokemonList } from '../cmps/PokemonList'
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom'
import { svgs } from '../services/Svgs.service'
import { useSelector } from 'react-redux'
import { setFilterBy } from '../store/pokemon.actions'
import { usePokemonsInfinite } from '../customHooks/usePokemonsInfinite'

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

  // function handleChangeRegion({ target }) {
  //   const field = target.name
  //   const value = target.value

  //   setFilterBy({ ...filterBy, [field]: value })
  // }

  if (isLoading && !pokemons.length) return <div>Loading...</div>
  if (isError) return <div>Error loading Pokémon. Please try again.</div>
  return (
    <div className="flex h-screen flex-col items-center relative bg-white p-2 overflow-hidden text-zinc-800">
      <div className="absolute -top-22 -right-17 flex items-center justify-center z-10">
        {svgs.pokeball({ className: 'fill-neutral-100', width: 250, height: 250 })}
      </div>

      <div className="flex justify-between items-center w-full relative z-20 mt-4">
        <button className="flex items-center justify-center " onClick={() => navigate('/')}>
          {svgs.back()}
        </button>
        <button className="flex items-center justify-center cursor-pointer" onClick={() => navigate('/pokemon/filter')}>
          {svgs.more()}
        </button>
      </div>

      <h1 className="text-4xl self-start mt-4 ml-4 font-semibold tracking-wide text-zinc-800 relative z-20">Pokedex</h1>

      <PokemonList pokemons={pokemons} hasMore={hasNextPage} elementRef={elementRef} isLoading={isFetchingNextPage} />
    </div>
  )
}
