import { svgs } from '../services/Svgs.service'

export function LoadingSpinner() {
	return (
		<div className="bottom-10 left-0 translate-x-1/2 flex items-center justify-center">
			<div className="">{svgs.pokeball({ className: 'fill-zinc-800 animate-spin opacity-40 w-10 h-10' })}</div>
		</div>
	)
}
