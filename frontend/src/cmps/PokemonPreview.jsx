import { svgs } from '../services/Svgs.service'
import { typeColours } from '../services/util.service'
export function PokemonPreview({ pokemon }) {
  const bgColor = typeColours[pokemon?.types[0]]

  // const colorMap = {
  //   normal: 'bg-gray-300',
  //   fire: 'bg-red-400',
  //   water: 'bg-blue-300',
  //   electric: 'bg-amber-300',
  //   grass: 'bg-emerald-400',
  //   ice: 'bg-[#96D9D6]',
  //   fighting: 'bg-red-700',
  //   poison: 'bg-fuchsia-600',
  //   ground: 'bg-orange-300',
  //   flying: 'bg-[#A98FF3]',
  //   psychic: 'bg-[#F95587]',
  //   bug: 'bg-lime-500',
  //   rock: 'bg-[#B6A136]',
  //   ghost: 'bg-[#735797]',
  //   dragon: 'bg-[#6F35FC]',
  //   dark: 'bg-[#705746]',
  //   steel: 'bg-[#B7B7CE]',
  //   fairy: 'bg-pink-300'
  // }

  return (
    <article className={`relative h-full flex w-full ${bgColor} rounded-2xl py-4 px-3 shadow-md text-neutral-50  capitalize overflow-hidden`}>
      <div className="flex flex-col items-start gap-2 flex-1">
        <h2 className="text-md md:text-lg font-bold">{pokemon.name}</h2>
        {pokemon.types.map((type) => (
          <div key={type} className={`text-xs md:text-sm px-3 py-1 rounded-full bg-white/20 text-center font-medium text-white`}>
            {type}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center relative w-28 self-end md:h-32 md:w-32">
        <img src={pokemon.imageUrl} alt={pokemon.name} className="object-cover w-full h-full rounded-lg relative z-20" />
        <div className="absolute -bottom-10 -right-10 z-10">{svgs.pokeball({ className: 'fill-white/40' })}</div>
      </div>
    </article>
  )
}
