import { useNavigate } from 'react-router-dom'
import { svgs } from '../services/Svgs.service'
import { useSelector } from 'react-redux'
import { setFilterBy } from '../store/pokemon.actions'

export function PokemonFilter() {
  const navigate = useNavigate()
  const filterBy = useSelector((store) => store.pokemonModule.filterBy)

  const generations = [
    { id: 'kanto', name: 'Generation I', img: '' },
    { id: 'original-johto', name: 'Generation II', img: '' },
    { id: 'hoenn', name: 'Generation III', img: '' },
    { id: 'original-sinnoh', name: 'Generation IV', img: '' },
    { id: 'original-unova', name: 'Generation V', img: '' },
    { id: 'original-alola', name: 'Generation VI', img: '' },
    { id: 'generation-vii', name: 'Generation VII', img: '' },
    { id: 'generation-viii', name: 'Generation VIII', img: '' },
    { id: 'generation-ix', name: 'Generation IX', img: '' }
  ]

  function handleFilterBy(regionId) {
    console.log(regionId)
    setFilterBy({ ...filterBy, region: regionId })
    navigate(`/pokemon`)
  }

  return (
    <div className="flex flex-col h-screen bg-white p-4">
      <div className="flex justify-between items-center w-full">
        <button className="flex items-center justify-start" onClick={() => navigate('/pokemon')}>
          {svgs.back()}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {generations.map((generation) => (
          <div key={generation.id} className="flex items-center justify-center" onClick={() => handleFilterBy(generation.id)}>
            <h1>{generation.name}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}
