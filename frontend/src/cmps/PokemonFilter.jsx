import { useNavigate } from 'react-router-dom'
import { svgs } from '../services/Svgs.service'
import { useSelector, useDispatch } from 'react-redux'
import { setFilterBy } from '../store/pokemon.actions'

export function PokemonFilter() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const filterBy = useSelector((store) => store.pokemonModule.filterBy)

  const generations = [
    { id: 'generation-i', name: 'Generation I', img: '' },
    { id: 'generation-ii', name: 'Generation II', img: '' },
    { id: 'generation-iii', name: 'Generation III', img: '' },
    { id: 'generation-iv', name: 'Generation IV', img: '' },
    { id: 'generation-v', name: 'Generation V', img: '' },
    { id: 'generation-vi', name: 'Generation VI', img: '' },
    { id: 'generation-vii', name: 'Generation VII', img: '' },
    { id: 'generation-viii', name: 'Generation VIII', img: '' },
    { id: 'generation-ix', name: 'Generation IX', img: '' }
  ]

  function handleFilterBy(generationId) {
    if (filterBy.generation !== generationId) {
      const newFilterBy = {
        ...filterBy,
        generation: generationId,
        pageIdx: 0
      }
      dispatch(setFilterBy(newFilterBy))
    }
    navigate('/pokemon')
  }

  function handleBack() {
    const newFilterBy = {
      ...filterBy,
      generation: '',
      pageIdx: 0
    }
    setFilterBy(newFilterBy)
    navigate('/pokemon')
  }

  return (
    <div className="flex flex-col h-screen bg-white p-4">
      <div className="flex justify-between items-center w-full">
        <button className="flex items-center justify-start" onClick={handleBack}>
          {svgs.back()}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {generations.map((generation) => (
          <div
            key={generation.id}
            className={`flex items-center justify-center cursor-pointer ${filterBy.generation === generation.id ? 'bg-gray-200' : ''}`}
            onClick={() => handleFilterBy(generation.id)}>
            <h1>{generation.name}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}
