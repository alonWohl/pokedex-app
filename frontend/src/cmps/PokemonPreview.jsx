export function PokemonPreview({ pokemon }) {
  return (
    <article className="relative  w-full">
      <img src={pokemon.imageUrl} alt={pokemon.name} className="w-full h-full object-cover rounded-lg" />
      {/* <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white px-2 py-1 rounded-bl-lg">{pokemon.types.join(', ')}</div> */}
      <h2 className="text-lg font-bold mt-2">{pokemon.name}</h2>
    </article>
  )
}
