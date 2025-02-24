const { DEV, VITE_LOCAL } = import.meta.env

import { pokemonService as local } from './pokemon.service.local'
import { pokemonService as remote } from './pokemon.service.remote'

function getEmptyPokemon() {
  return {}
}

function getDefaultFilter() {
  return {
    region: 'kanto',
    pageIdx: 0
  }
}
function getFilterFromSearchParams(searchParams) {
  const region = searchParams.get('region') || ''
  const type = searchParams.get('type') || ''
  const generation = searchParams.get('generation') || ''
  const legendary = searchParams.get('legendary') || ''
  return {
    region,
    type,
    generation,
    legendary
  }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const pokemonService = { getEmptyPokemon, getDefaultFilter, getFilterFromSearchParams, ...service }

//* Easy access to this service from the dev tools console
//* when using script - dev / dev:local

if (DEV) window.pokemonService = pokemonService
