import { NavLink, Outlet, useParams } from 'react-router-dom'
import { usePokemon, usePokemonEvolution } from '../customHooks/UsePokemonHooks'
import { svgs } from '../services/Svgs.service'
import { useNavigate } from 'react-router-dom'
import { typeColours } from '../services/util.service'
import { useEffect } from 'react'

export function PokemonDetails() {
  const { id } = useParams()
  const { data: pokemon } = usePokemon({ pokemonId: id })

  const nextPokemonId = parseInt(id) + 1
  const prevPokemonId = parseInt(id) > 1 ? parseInt(id) - 1 : undefined

  const { data: nextPokemon } = usePokemon({ pokemonId: nextPokemonId.toString() })
  const { data: prevPokemon } = usePokemon({ pokemonId: prevPokemonId?.toString() })

  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/')
  }

  useEffect(() => {
    navigate(`/pokemon/${id}/evolution`)
  }, [pokemon])

  const goToNextPokemon = () => {
    if (nextPokemon) {
      navigate(`/pokemon/${nextPokemonId}`)
    }
  }

  const goToPrevPokemon = () => {
    if (prevPokemon) {
      navigate(`/pokemon/${prevPokemonId}`)
    }
  }

  const handleLike = () => {
    console.log('like')
  }

  if (!pokemon) return <div>Loading...</div>

  const bgColor = typeColours[pokemon.types[0]]

  return (
    <div
      className={`${bgColor} text-neutral-50 flex flex-col mx-auto items-center h-screen w-screen lg:max-w-screen-lg  xl:max-w-screen-xl 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl`}>
      {/* header */}
      <header className={` w-full p-4 relative z-20 flex flex-col items-center h-[40%]`}>
        {/* button-group */}
        <div className="flex items-center justify-between w-full mt-4">
          <button onClick={handleBack} className="flex items-center justify-center cursor-pointer">
            {svgs.back({ className: 'w-6 h-6' })}
          </button>
          <button onClick={handleLike} className="flex items-center justify-center cursor-pointer">
            {svgs.heart({ className: 'w-6 h-6' })}
          </button>
        </div>

        {/* name and types */}
        <div className="mt-8 w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
            <span className="text-md font-bold">#{pokemon.id.toString().padStart(3, '0')}</span>
          </div>

          {/* types */}
          <div className="flex items-center mt-4 justify-between">
            <div className="flex items-center gap-2">
              {pokemon.types.map((type) => (
                <div key={type} className="flex items-center bg-white/30 dark:bg-zinc-800/30 rounded-2xl px-4 py-2 text-sm">
                  <span className="text-xs">{type}</span>
                </div>
              ))}
            </div>

            <p className="text-sm">Weight: {pokemon.weight}</p>
          </div>
        </div>

        {prevPokemon && (
          <div
            className="absolute -left-10 bottom-10 max-w-30 md:max-w-40 opacity-90 contrast-20  cursor-pointer transition-transform hover:translate-x-2"
            onClick={goToPrevPokemon}>
            <img src={prevPokemon.imageUrl} alt={prevPokemon.name} className="w-full h-full object-contain" />
          </div>
        )}

        <div className="flex items-center justify-center max-w-50 md:max-w-60 absolute -bottom-20">
          <img src={pokemon.imageUrl} alt={pokemon.name} className="w-full h-full object-contain" />
        </div>

        {nextPokemon && (
          <div
            className="absolute -right-10 bottom-10 max-w-30 md:max-w-40 opacity-90 contrast-20  cursor-pointer transition-transform hover:translate-x-2"
            onClick={goToNextPokemon}>
            <img src={nextPokemon.imageUrl} alt={nextPokemon.name} className="w-full h-full object-contain" />
          </div>
        )}
      </header>

      <section className="flex flex-col items-center gap-4 bg-white dark:bg-zinc-800 p-4 w-full h-[60%] rounded-t-3xl relative z-10 text-zinc-400">
        <nav className="w-full mt-16 flex items-center justify-center">
          <ul className="flex items-center justify-between w-full md:max-w-[500px] text-md md:text-lg lg:text-xl xl:text-2xl">
            {['About', 'Base Stats', 'Evolution', 'Moves'].map((tab) => (
              <li key={tab} className="relative pb-2">
                <NavLink
                  to={`/pokemon/${id}/${tab.toLowerCase().replace(' ', '-')}`}
                  className={({ isActive }) =>
                    `px-3 py-1 ${
                      isActive
                        ? "font-medium text-zinc-800 dark:text-zinc-50 after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-blue-600 after:bottom-0 after:left-0"
                        : ''
                    }`
                  }>
                  {tab}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        {/* content */}

        <Outlet />
      </section>
    </div>
  )
}

export function PokemonAbout() {
  return <div>PokemonAbout</div>
}

export function PokemonBaseStats() {
  return <div>PokemonBaseStats</div>
}

export function PokemonEvolution() {
  const { id } = useParams()
  const { data: evolutionChain } = usePokemonEvolution({ pokemonId: id })

  if (!evolutionChain) return <EvolutionChainSkeleton />

  return (
    <div className="w-full h-full p-3 mt-4 text-zinc-900 dark:text-zinc-50">
      <h2 className="text-lg md:text-xl font-semibold">Evolution Chain</h2>
      <div className="flex flex-col gap-4 mt-4">
        {/* First Evolution Block */}
        <div className="flex items-center justify-center space-x-10 ">
          <div className="flex flex-col items-center">
            <img src={evolutionChain[0]?.imageUrl} alt={evolutionChain[0]?.name} className="w-32 h-32 object-contain" />
            <p className="text-sm md:text-md lg:text-lg xl:text-xl capitalize mt-2">{evolutionChain[0]?.name}</p>
          </div>
          {evolutionChain[1] && (
            <>
              <div className="text-center">
                <div className="w-10 h-10">{svgs.arrowRight()}</div>
                <p className="text-sm">Lvl {evolutionChain[1]?.atLevel}</p>
              </div>
              <div className="flex flex-col items-center">
                <img src={evolutionChain[1]?.imageUrl} alt={evolutionChain[1]?.name} className="w-32 h-32 object-contain" />
                <p className="text-sm md:text-md lg:text-lg xl:text-xl capitalize mt-2">{evolutionChain[1]?.name}</p>
              </div>
            </>
          )}
        </div>

        {/* Second Evolution Block */}
        {evolutionChain[2] && (
          <div className="flex items-center justify-center space-x-10">
            <div className="flex flex-col items-center">
              <img src={evolutionChain[1]?.imageUrl} alt={evolutionChain[1]?.name} className="w-32 h-32 object-contain" />
              <p className="text-sm md:text-md lg:text-lg xl:text-xl capitalize mt-2">{evolutionChain[1]?.name}</p>
            </div>

            <div className="text-center">
              <div className="w-10 h-10">{svgs.arrowRight()}</div>
              <p className="text-sm">Lvl {evolutionChain[2]?.atLevel}</p>
            </div>

            <div className="flex flex-col items-center">
              <img src={evolutionChain[2]?.imageUrl} alt={evolutionChain[2]?.name} className="w-32 h-32 object-contain" />
              <p className="text-sm md:text-md lg:text-lg xl:text-xl capitalize mt-2">{evolutionChain[2]?.name}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function EvolutionChainSkeleton() {
  return (
    <div className="w-full h-full p-3 mt-4 text-zinc-900 dark:text-zinc-50">
      <h2 className="text-lg md:text-xl font-semibold">Evolution Chain</h2>
      <div className="flex flex-col gap-8 mt-10">
        {/* First Evolution Block */}
        <div className="flex items-center justify-center space-x-10 ">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-50 rounded-full animate-pulse"></div>
          </div>

          <div className="text-center">{svgs.arrowRight({ className: 'w-8 h-8 fill-zinc-200 dark:fill-zinc-50 animate-pulse' })}</div>

          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-50 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Second Evolution Block */}
        <div className="flex items-center justify-center space-x-10">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-50 rounded-full animate-pulse"></div>
          </div>

          <div className="text-center">{svgs.arrowRight({ className: 'w-8 h-8 fill-zinc-200 dark:fill-zinc-50' })}</div>

          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PokemonMoves() {
  return <div>PokemonMoves</div>
}
