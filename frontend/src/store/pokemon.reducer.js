import { pokemonService } from '../services/pokemon'

export const SET_POKEMONS = 'SET_POKEMONS'
export const SET_POKEMON = 'SET_POKEMON'
export const REMOVE_POKEMON = 'REMOVE_POKEMON'
export const ADD_POKEMON = 'ADD_POKEMON'
export const UPDATE_POKEMON = 'UPDATE_POKEMON'
export const ADD_POKEMON_MSG = 'ADD_POKEMON_MSG'
export const SET_FILTER_BY = 'SET_FILTER_BY'

const initialState = {
  pokemons: [],
  pokemon: null,
  filterBy: pokemonService.getDefaultFilter()
}

export function pokemonReducer(state = initialState, action) {
  var newState = state
  var pokemons
  switch (action.type) {
    case SET_POKEMONS:
      newState = { ...state, pokemons: action.pokemons }
      break
    case SET_POKEMON:
      newState = { ...state, pokemon: action.pokemon }
      break
    case REMOVE_POKEMON:
      const lastRemovedPokemon = state.pokemons.find((pokemon) => pokemon._id === action.pokemonId)
      pokemons = state.pokemons.filter((pokemon) => pokemon._id !== action.pokemonId)
      newState = { ...state, pokemons, lastRemovedPokemon }
      break
    case ADD_POKEMON:
      newState = { ...state, pokemons: [...state.pokemons, action.pokemon] }
      break
    case UPDATE_POKEMON:
      pokemons = state.pokemons.map((pokemon) => (pokemon._id === action.pokemon._id ? action.pokemon : pokemon))
      newState = { ...state, pokemons }
      break
    case ADD_POKEMON_MSG:
      newState = { ...state, pokemon: { ...state.pokemon, msgs: [...(state.pokemon.msgs || []), action.msg] } }
      break
    case SET_FILTER_BY:
      newState = { ...state, filterBy: action.filterBy }
      break
    default:
  }
  return newState
}

// unitTestReducer()

function unitTestReducer() {
  var state = initialState
  const pokemon1 = { _id: 'b101', name: 'Pokemon ' + parseInt(Math.random() * 10), msgs: [] }
  const pokemon2 = { _id: 'b102', name: 'Pokemon ' + parseInt(Math.random() * 10), msgs: [] }

  state = pokemonReducer(state, { type: SET_POKEMONS, pokemons: [pokemon1] })
  console.log('After SET_POKEMONS:', state)

  state = pokemonReducer(state, { type: ADD_POKEMON, pokemon: pokemon2 })
  console.log('After ADD_POKEMON:', state)

  state = pokemonReducer(state, { type: UPDATE_POKEMON, pokemon: { ...pokemon2, name: 'Pikachu' } })
  console.log('After UPDATE_POKEMON:', state)

  state = pokemonReducer(state, { type: REMOVE_POKEMON, pokemonId: pokemon2._id })
  console.log('After REMOVE_POKEMON:', state)

  const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
  state = pokemonReducer(state, { type: ADD_POKEMON_MSG, pokemonId: pokemon1._id, msg })
  console.log('After ADD_POKEMON_MSG:', state)

  state = pokemonReducer(state, { type: REMOVE_POKEMON, pokemonId: pokemon1._id })
  console.log('After REMOVE_POKEMON:', state)
}
