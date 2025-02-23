const { DEV, VITE_LOCAL } = import.meta.env

import { pokemonService as local } from './pokemon.service.local'
import { pokemonService as remote } from './pokemon.service.remote'

function getEmptyPokemon() {
  return {}
}

function getDefaultFilter() {
  return {
    txt: '',
    maxPrice: '',
    minSpeed: '',
    sortField: '',
    sortDir: ''
    // pageIdx: 0
  }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const pokemonService = { getEmptyPokemon, getDefaultFilter, ...service }

//* Easy access to this service from the dev tools console
//* when using script - dev / dev:local

if (DEV) window.pokemonService = pokemonService
