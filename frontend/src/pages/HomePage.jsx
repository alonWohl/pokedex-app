import { Link } from 'react-router-dom'
import { svgs } from '../services/Svgs.service'

export function HomePage() {
  const navItems = [
    {
      label: 'Pokedex',
      to: '/pokemon',
      bg: 'bg-emerald-400'
    },
    {
      label: 'Moves',
      to: '/moves',
      bg: 'bg-red-400'
    },
    {
      label: 'Abilities',
      to: '/abilities',
      bg: 'bg-blue-400'
    },
    {
      label: 'Items',
      to: '/items',
      bg: 'bg-amber-300'
    },
    {
      label: 'Locations',
      to: '/locations',
      bg: 'bg-[#7C528E]'
    },
    {
      label: 'Type Charts',
      to: '/type-charts',
      bg: 'bg-[#855651]'
    }
  ]

  return (
    <div className="flex flex-col items-center h-screen ">
      <header className="font-sans text-left  bg-white  p-6 py-15 relative rounded-3xl">
        <div className="absolute -top-32 -right-15 flex items-center justify-center z-10">
          {svgs.pokeball({ className: 'fill-neutral-100', width: 250, height: 250 })}
        </div>
        <h1 className="text-4xl font-semibold tracking-wide text-zinc-800 relative z-20">Waht Pokemon are you looking for?</h1>
        <div className="relative flex items-center mt-8">
          <input
            type="text"
            placeholder="Search Pokemon, Move, Ability, etc."
            className="px-4 py-2 w-full text-gray-500 text-center bg-neutral-100 rounded-2xl focous:outline-none "
          />
          <span className="absolute inset-y-0 left-3 flex items-center stroke-zinc-900 stroke-5">{svgs.search()}</span>
        </div>

        <section className="w-full grid grid-cols-2 gap-4 px-2 py-2 mt-10">
          {navItems.map((item) => (
            <Link
              to={item.to}
              key={item.label}
              className={`${item.bg} flex items-center  relative overflow-hidden shadow-xl shadow-${item.bg}/50 text-white px-4 py-6 rounded-2xl`}>
              {item.label}
              <div className="absolute  -right-12 flex items-center justify-center w-30">{svgs.pokeball({ className: 'fill-white/50' })}</div>
              <div className="absolute  -top-15 -left-15 flex items-center justify-center w-30">{svgs.pokeball({ className: 'fill-white/50' })}</div>
            </Link>
          ))}
        </section>
      </header>
    </div>
  )
}
