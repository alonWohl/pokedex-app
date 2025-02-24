import { pokemonService } from '../services/pokemon'
import { store } from './store'
import { ADD_POKEMON, REMOVE_POKEMON, SET_POKEMONS, SET_POKEMON, UPDATE_POKEMON, ADD_POKEMON_MSG, SET_FILTER_BY } from './pokemon.reducer'

export async function loadPokemons(filterBy) {
  try {
    const pokemons = await pokemonService.query(filterBy)
    store.dispatch(getCmdSetPokemons(pokemons))
  } catch (err) {
    console.log('Cannot load pokemons', err)
    throw err
  }
}

export async function loadPokemon(pokemonId) {
  try {
    const pokemon = await pokemonService.getById(pokemonId)
    store.dispatch(getCmdSetPokemon(pokemon))
  } catch (err) {
    console.log('Cannot load pokemon', err)
    throw err
  }
}

export async function removePokemon(pokemonId) {
  try {
    await pokemonService.remove(pokemonId)
    store.dispatch(getCmdRemovePokemon(pokemonId))
  } catch (err) {
    console.log('Cannot remove pokemon', err)
    throw err
  }
}

export async function addPokemon(pokemon) {
  try {
    const savedPokemon = await pokemonService.save(pokemon)
    store.dispatch(getCmdAddPokemon(savedPokemon))
    return savedPokemon
  } catch (err) {
    console.log('Cannot add pokemon', err)
    throw err
  }
}

export async function updatePokemon(pokemon) {
  try {
    const savedPokemon = await pokemonService.save(pokemon)
    store.dispatch(getCmdUpdatePokemon(savedPokemon))
    return savedPokemon
  } catch (err) {
    console.log('Cannot save pokemon', err)
    throw err
  }
}

export async function addPokemonMsg(pokemonId, txt) {
  try {
    const msg = await pokemonService.addPokemonMsg(pokemonId, txt)
    store.dispatch(getCmdAddPokemonMsg(msg))
    return msg
  } catch (err) {
    console.log('Cannot add pokemon msg', err)
    throw err
  }
}

export function setFilterBy(filterBy) {
  store.dispatch({
    type: SET_FILTER_BY,
    filterBy
  })
}

// Command Creators:
function getCmdSetPokemons(pokemons) {
  return {
    type: SET_POKEMONS,
    pokemons
  }
}
function getCmdSetPokemon(pokemon) {
  return {
    type: SET_POKEMON,
    pokemon
  }
}
function getCmdRemovePokemon(pokemonId) {
  return {
    type: REMOVE_POKEMON,
    pokemonId
  }
}
function getCmdAddPokemon(pokemon) {
  return {
    type: ADD_POKEMON,
    pokemon
  }
}
function getCmdUpdatePokemon(pokemon) {
  return {
    type: UPDATE_POKEMON,
    pokemon
  }
}
function getCmdAddPokemonMsg(msg) {
  return {
    type: ADD_POKEMON_MSG,
    msg
  }
}

// unitTestActions()
async function unitTestActions() {
  await loadPokemons()
  await addPokemon(pokemonService.getEmptyPokemon())
  await updatePokemon({
    _id: 'm1oC7',
    title: 'Pokemon-Good'
  })
  await removePokemon('m1oC7')
  // TODO unit test addPokemonMsg
}
