import { useNavigate } from 'react-router-dom'
import { svgs } from '../services/Svgs.service'
import { useSelector, useDispatch } from 'react-redux'
import { setFilterBy } from '../store/pokemon.actions'

export function PokemonFilter() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const filterBy = useSelector((store) => store.pokemonModule.filterBy)

  const generations = [
    { id: 'generation-i', name: 'Generation I', img: '../../src/assets/1.jpeg' },
    { id: 'generation-ii', name: 'Generation II', img: '../../src/assets/2.jpeg' },
    { id: 'generation-iii', name: 'Generation III', img: '../../src/assets/3.jpeg' },
    { id: 'generation-iv', name: 'Generation IV', img: '../../src/assets/4.jpeg' },
    { id: 'generation-v', name: 'Generation V', img: '../../src/assets/5.jpeg' },
    { id: 'generation-vi', name: 'Generation VI', img: '../../src/assets/6.jpeg' },
    { id: 'generation-vii', name: 'Generation VII', img: '../../src/assets/7.jpeg' },
    { id: 'generation-viii', name: 'Generation VIII', img: '../../src/assets/8.jpeg' }
    //   { id: 'generation-ix', name: 'Generation IX', img: '../../src/assets/gen-ix-min.jpeg' }
  ]

  function handleFilterBy(generationId) {
    if (filterBy.generation !== generationId) {
      const newFilterBy = {
        ...filterBy,
        generation: generationId,
        pageIdx: 0
      }
      setFilterBy(newFilterBy)
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
            className={`flex flex-col items-center justify-center cursor-pointer gap-2 rounded-md shadow-md border border-gray-200 md:flex-row ${
              filterBy.generation === generation.id ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleFilterBy(generation.id)}>
            <h1 className="text-sm font-bold">{generation.name}</h1>
            <div className="flex items-center justify-center w-40">
              <img src={generation.img} alt={generation.name} className="mix-blend-multiply w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
