import { useEffect, useState, useRef } from 'react'
import { pokemonService } from '../services/pokemon'
import { PokemonList } from '../cmps/PokemonList'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { svgs } from '../services/Svgs.service'
import { useSelector } from 'react-redux'
import { setFilterBy } from '../store/pokemon.actions'
export function PokemonIndex() {
  const [pokemons, setPokemons] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const filterBy = useSelector((storeState) => storeState.pokemonModule.filterBy)

  const [hasMore, setHasMore] = useState(true)
  const elementRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, {
      rootMargin: '5px',
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
  }, [filterBy])

  useEffect(() => {
    setPokemons([])
  }, [filterBy.region])

  function onIntersection(entries) {
    const firstEntry = entries[0]
    if (firstEntry.isIntersecting && hasMore) {
      loadPokemons(filterBy)
    }
  }

  async function loadPokemons(filterBy) {
    try {
      const pokemons = await pokemonService.query(filterBy)
      if (pokemons.length === 0) {
        setHasMore(false)
      } else {
        setPokemons((prevPokemons) => [...prevPokemons, ...pokemons])
        setFilterBy({ ...filterBy, pageIdx: filterBy.pageIdx + 1 })
        setSearchParams(filterBy)
      }
    } catch (err) {
      console.log('Error loading pokemons:', err)
    }
  }

  // function handleChangeRegion({ target }) {
  //   const field = target.name
  //   const value = target.value

  //   setFilterBy((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
  // }

  if (!pokemons) return <div>Loading...</div>

  return (
    <div className="flex flex-col justify-center items-center">
      {/* <select name="region" onChange={handleChangeRegion} value={filterBy.region}>
        <option value="kanto">Kanto</option>
        <option value="original-johto">Johto</option>
        <option value="hoenn">Hoenn</option>
      </select> */}
      <div className="flex justify-between items-center w-full">
        <button className="w-20 h-20 flex items-center justify-center" onClick={() => navigate('/')}>
          {svgs.back()}
        </button>
        <button className="w-20 h-20 flex items-center justify-center" onClick={() => navigate('/')}>
          {svgs.more()}
        </button>
      </div>
      <PokemonList pokemons={pokemons} hasMore={hasMore} elementRef={elementRef} />
    </div>
  )
}
