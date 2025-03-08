import { svgs } from '../services/Svgs.service'
import { PrefetchingLink } from '../cmps/PrefetchingLink'

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
		<div className="flex flex-col items-center w-full h-full lg:max-w-screen-lg mx-auto xl:max-w-screen-xl 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl overflow-hidden bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-50">
			<header className="font-sans text-left p-6 py-15 relative rounded-3xl w-full lg:w-1/2">
				<div className="w-full flex justify-end">
					<div className="w-20 h-20 bg-zinc-50 rounded-full relative z-30">
						<img src="" alt="" />
					</div>
				</div>
				<div className="absolute -top-34 -right-15 flex items-center justify-center z-10">
					{svgs.pokeball({ className: 'fill-neutral-100 dark:fill-zinc-700', width: 250, height: 250 })}
				</div>
				<h1 className="text-4xl font-semibold tracking-wide text-zinc-800 dark:text-zinc-50 relative z-20">
					Waht Pokemon <br /> are you looking for?
				</h1>

				<div className="relative flex items-center mt-8">
					<input
						type="text"
						placeholder="Search Pokemon, Move, Ability, etc."
						className="px-4 py-2 w-full text-zinc-900 placeholder:text-zinc-900/40 text-center bg-zinc-100 dark:bg-zinc-600 dark:text-zinc-50 dark:placeholder:text-zinc-50 rounded-2xl focous:outline-none "
					/>
					<span className="absolute inset-y-0 left-3 flex items-center stroke-zinc-900 stroke-5">{svgs.search({ className: 'dark:stroke-zinc-50' })}</span>
				</div>

				<section className="w-full grid grid-cols-2 gap-4 px-2 py-2 mt-10">
					{navItems.map(item => (
						<PrefetchingLink
							to={item.to}
							key={item.label}
							className={`${item.bg} flex items-center  relative overflow-hidden shadow-xl shadow-${item.bg}/50 text-white px-4 py-6 rounded-2xl`}
						>
							{item.label}
							<div className="absolute  -right-12 flex items-center justify-center w-30">{svgs.pokeball({ className: 'fill-white/50' })}</div>
							<div className="absolute  -top-15 -left-15 flex items-center justify-center w-30">{svgs.pokeball({ className: 'fill-white/50' })}</div>
						</PrefetchingLink>
					))}
				</section>
			</header>
		</div>
	)
}
