import { useNavigate } from 'react-router-dom'
import { svgs } from '../services/Svgs.service'
import { useSelector, useDispatch } from 'react-redux'
import { setFilterBy } from '../store/pokemon.actions'
import { usePrefetchGeneration } from '../customHooks/UsePokemonHooks'

export function PokemonFilter() {
  const navigate = useNavigate()

  const filterBy = useSelector((store) => store.pokemonModule.filterBy)
  const prefetchGeneration = usePrefetchGeneration()

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

  function clearFilter() {
    const newFilterBy = {
      ...filterBy,
      generation: '',
      pageIdx: 0
    }
    setFilterBy(newFilterBy)
    navigate('/pokemon')
  }

  return (
    <div className="flex flex-col h-screen bg-white p-4 text-zinc-800">
      <div className="flex justify-between items-center w-full text-zinc-700  ">
        <button className="flex items-center justify-center cursor-pointer" onClick={handleBack}>
          {svgs.back({ className: 'w-8 h-8' })}
        </button>

        <button className="flex items-center justify-center cursor-pointer" onClick={() => clearFilter()}>
          {svgs.clear({ className: 'w-8 h-8' })}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 m-auto mt-32 w-full h-[60%]">
        {generations.map((generation) => (
          <div
            key={generation.id}
            className={`flex flex-col items-center justify-center cursor-pointer p-2 gap-2 rounded-lg shadow-md border border-gray-200 md:flex-row ${
              filterBy.generation === generation.id ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleFilterBy(generation.id)}
            onMouseEnter={() => prefetchGeneration(generation.id)}
            onTouchStart={() => prefetchGeneration(generation.id)}>
            <h1 className="text-sm font-bold  text-center md:flex-none md:text-left">{generation.name}</h1>
            <div className="flex items-center justify-center w-40">
              <img src={generation.img} alt={generation.name} className="mix-blend-multiply max-w-30 max-h-30 object-cover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
