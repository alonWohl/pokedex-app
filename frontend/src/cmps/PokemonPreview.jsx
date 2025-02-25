import { svgs } from '../services/Svgs.service'

export function PokemonPreview({ pokemon }) {
  const colorMap = {
    normal: 'bg-gray-300',
    fire: 'bg-red-400',
    water: 'bg-blue-300',
    electric: 'bg-amber-300',
    grass: 'bg-emerald-400',
    ice: 'bg-[#96D9D6]',
    fighting: 'bg-red-700',
    poison: 'bg-fuchsia-600',
    ground: 'bg-orange-300',
    flying: 'bg-[#A98FF3]',
    psychic: 'bg-[#F95587]',
    bug: 'bg-lime-500',
    rock: 'bg-[#B6A136]',
    ghost: 'bg-[#735797]',
    dragon: 'bg-[#6F35FC]',
    dark: 'bg-[#705746]',
    steel: 'bg-[#B7B7CE]',
    fairy: 'bg-pink-300'
  }

  const colours = {
    normal: 'bg-[#A8A77A]',
    fire: 'bg-[#EE8130]',
    water: 'bg-[#6390F0]',
    electric: 'bg-[#F7D02C]',
    grass: 'bg-[#7AC74C]',
    ice: 'bg-[#96D9D6]',
    fighting: 'bg-[#C22E28]',
    poison: 'bg-[#A33EA1]',
    ground: 'bg-[#E2BF65]',
    flying: 'bg-[#A98FF3]',
    psychic: 'bg-[#F95587]',
    bug: 'bg-[#A6B91A]',
    rock: 'bg-[#B6A136]',
    ghost: 'bg-[#735797]',
    dragon: 'bg-[#6F35FC]',
    dark: 'bg-[#705746]',
    steel: 'bg-[#B7B7CE]',
    fairy: 'bg-[#D685AD]'
  }

  // const color = async (type) => {
  //   try {
  //     if (type.length === 1) return colours[type[0]]
  //     return colours[type[0]] + ',' + colours[type[1]]
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const gradient = (type) => {
    const start = colours[type[0]]
    const end = colours[type[1]] ?? colours[type[0]]
    return `linear-gradient(to right, ${start}, ${end})`
  }

  return (
    <article
      className={`relative h-full flex 
        ${colours[pokemon?.types[0]]}
      ] rounded-lg p-3 pr-0 pb-2 shadow-md text-neutral-50 capitalize w-full overflow-hidden`}
      // style={{ background: gradient(pokemon.types) }}
    >
      <div className="flex flex-col items-start gap-2 flex-1">
        <h2 className="text-lg font-bold">{pokemon.name}</h2>
        {pokemon.types.map((type) => (
          <div key={type} className={`text-xs px-3 py-1 rounded-full bg-white/20 text-center font-medium text-white`}>
            {type}
          </div>
        ))}
      </div>

      <div className="flex items-end justify-end relative">
        <img src={pokemon.imageUrl} alt={pokemon.name} className="object-cover w-full  rounded-lg relative z-20" />
        <div className="absolute -bottom-10 -right-10 z-10">{svgs.pokeball({ className: 'fill-white/40' })}</div>
      </div>
    </article>
  )
}
