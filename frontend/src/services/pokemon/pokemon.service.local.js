import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'pokemon'

export const pokemonService = {
  query,
  getById,
  save,
  remove,
  addPokemonMsg
}
window.cs = pokemonService

async function query(filterBy = { region: '' }) {
  let pokemons = await fetch(`https://pokeapi.co/api/v2/pokedex/original-unova`)
  pokemons = await pokemons.json()

  pokemons = pokemons.pokemon_entries.map((pokemon) => {
    return {
      name: pokemon.pokemon_species.name,
      id: pokemon.entry_number
    }
  })

  pokemons = await Promise.all(
    pokemons.map(async (pokemon) => {
      let pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      pokemonData = await pokemonData.json()
      return {
        name: pokemon.name,
        id: pokemon.id,
        imgUrl: pokemonData.sprites.other['official-artwork'].front_default
      }
    })
  )

  return pokemons
}

function getById(pokemonId) {
  return storageService.get(STORAGE_KEY, pokemonId)
}

async function remove(pokemonId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, pokemonId)
}

async function save(pokemon) {
  var savedPokemon
  if (pokemon._id) {
    const pokemonToSave = {
      _id: pokemon._id,
      price: pokemon.price,
      speed: pokemon.speed
    }
    savedPokemon = await storageService.put(STORAGE_KEY, pokemonToSave)
  } else {
    const pokemonToSave = {
      vendor: pokemon.vendor,
      price: pokemon.price,
      speed: pokemon.speed,
      // Later, owner is set by the backend
      owner: userService.getLoggedinUser(),
      msgs: []
    }
    savedPokemon = await storageService.post(STORAGE_KEY, pokemonToSave)
  }
  return savedPokemon
}

async function addPokemonMsg(pokemonId, txt) {
  // Later, this is all done by the backend
  const pokemon = await getById(pokemonId)

  const msg = {
    id: makeId(),
    by: userService.getLoggedinUser(),
    txt
  }
  pokemon.msgs.push(msg)
  await storageService.put(STORAGE_KEY, pokemon)

  return msg
}
