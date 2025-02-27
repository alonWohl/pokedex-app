import { httpService } from '../http.service'

export const pokemonService = {
  query,
  getById,
  save,
  remove,
  addPokemonMsg,
  getEvolutionChain
}

async function query(filterBy = { region: '' }) {
  return httpService.get(`pokemon`, filterBy)
}

function getById(pokemonId) {
  return httpService.get(`pokemon/${pokemonId}`)
}

async function remove(pokemonId) {
  return httpService.delete(`pokemon/${pokemonId}`)
}

function getEvolutionChain(pokemonId) {
  return httpService.get(`pokemon/${pokemonId}/evolution`)
}

async function save(pokemon) {
  var savedPokemon
  if (pokemon._id) {
    savedPokemon = await httpService.put(`pokemon/${pokemon._id}`, pokemon)
  } else {
    savedPokemon = await httpService.post('pokemon', pokemon)
  }
  return savedPokemon
}

async function addPokemonMsg(pokemonId, txt) {
  const savedMsg = await httpService.post(`pokemon/${pokemonId}/msg`, { txt })
  return savedMsg
}
