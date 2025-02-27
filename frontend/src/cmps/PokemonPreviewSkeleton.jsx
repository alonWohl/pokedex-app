// PokemonPreviewSkeleton.jsx
export function PokemonPreviewSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex  items-center">
      <div className="flex flex-col flex-1">
        <div className="text-lg h-5 w-22 font-bold bg-gray-200 rounded animate-pulse mt-3"></div>
        <div className="h-5 w-16 bg-gray-200 rounded-xl p-1 animate-pulse mt-3"></div>
        <div className="h-5 w-16 bg-gray-200 rounded-xl p-1 animate-pulse mt-2"></div>
      </div>
      <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse"></div>
    </div>
  )
}
