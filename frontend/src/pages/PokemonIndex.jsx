import { useEffect, useState, useRef } from 'react'
import { pokemonService } from '../services/pokemon'

export function PokemonIndex() {
  const [pokemons, setPokemons] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const elementRef = useRef(null)

  const [filterBy, setFilterBy] = useState({
    interval: {
      limit: 10,
      offset: 0
    },
    region: 'kanto'
  })

  useEffect(() => {
    loadPokemons(filterBy)
  }, [filterBy])

  // useEffect(() => {
  //   const observer = new IntersectionObserver(onIntersection)
  //   if (observer && elementRef.current) {
  //     observer.observe(elementRef.current)
  //   }
  //   return () => {
  //     observer.disconnect()
  //   }
  // }, [filterBy])

  // function onIntersection(entries) {
  //   const firstEntry = entries[0]
  //   if (firstEntry.isIntersecting && hasMore) {
  //     loadPokemons(filterBy)
  //   }
  // }

  async function loadPokemons(filterBy) {
    const pokemons = await pokemonService.query(filterBy)
    // if (pokemons.length === 0) {
    //   setHasMore(false)
    // }

    setPokemons(pokemons)
    // setFilterBy((prevFilterBy) => ({ ...prevFilterBy, pageIdx: prevFilterBy.pageIdx + 1 }))
  }

  function handleChangeRegion({ target }) {
    const field = target.name
    const value = target.value
    console.log('field', field)
    console.log('value', value)
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
  }

  if (!pokemons) return <div>Loading...</div>

  return (
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4  mx-auto">
      <select name="region" onChange={handleChangeRegion} value={filterBy.region}>
        <option value="kanto">Kanto</option>
        <option value="original-johto">Johto</option>
        <option value="hoenn">Hoenn</option>
        <option value="original-sinnoh">Sinnoh</option>
        <option value="original-unova">Unova</option>
      </select>

      {pokemons.map((pokemon, idx) => (
        <div key={idx} className="bg-white rounded-lg p-4 shadow-md max-w-48">
          <div className="relative  w-full">
            <img src={pokemon.imageUrl} alt={pokemon.name} className="w-full h-full object-cover rounded-lg" />
            {/* <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white px-2 py-1 rounded-bl-lg">{pokemon.types.join(', ')}</div> */}
          </div>
          <h2 className="text-lg font-bold mt-2">{pokemon.name}</h2>
        </div>
      ))}

      {hasMore && (
        <div ref={elementRef} className="text-center text-gray-500">
          Loading...
        </div>
      )}
    </div>
  )
}
