import { ObjectId } from 'mongodb'

import { logger } from '../../services/logger.service.js'
import { makeId } from '../../services/util.service.js'
import { dbService } from '../../services/db.service.js'
import { asyncLocalStorage } from '../../services/als.service.js'

import Pokedex from 'pokedex-promise-v2'
const P = new Pokedex()
const generationCache = new Map()

const PAGE_SIZE = 10

export const pokemonService = {
  remove,
  query,
  getById,
  add,
  update,
  addPokemonMsg,
  removePokemonMsg
}

async function query(filterBy = { region: '', pageIdx: 0, limit: PAGE_SIZE }) {
  try {
    let pokemons = []

    if (filterBy.generation) {
      // try {
      //   let generationData = generationCache.get(filterBy.generation)
      //   if (!generationData) {
      //     generationData = await P.getGenerationByName(filterBy.generation)
      //     generationCache.set(filterBy.generation, generationData)
      //   }
      //   const uniqueSpecies = Array.from(new Set(allSpecies.map((s) => s.name))).map((name) => allSpecies.find((s) => s.name === name))
      //   // Apply pagination
      //   const startIdx = filterBy.pageIdx * filterBy.limit
      //   const endIdx = Math.min(startIdx + filterBy.limit, uniqueSpecies.length)
      //   if (startIdx >= uniqueSpecies.length) {
      //     return [] // No more data
      //   }
      //   const pageSpecies = uniqueSpecies.slice(startIdx, endIdx)
      //   // Get Pokemon details in parallel
      //   const pokemonPromises = pageSpecies.map(async (species) => {
      //     try {
      //       // Get the default Pokemon form for this species
      //       const speciesDetail = await P.resource(species.url)
      //       const defaultVariety = speciesDetail.varieties.find((v) => v.is_default) || speciesDetail.varieties[0]
      //       const pokemon = await P.resource(defaultVariety.pokemon.url)
      //       return {
      //         name: pokemon.name,
      //         id: pokemon.id,
      //         imageUrl: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default,
      //         types: pokemon.types.map((type) => type.type.name) || []
      //       }
      //     } catch (err) {
      //       logger.error(`Error fetching details for ${species.name}`, err)
      //       return null
      //     }
      //   })
      //   // Wait for all promises to resolve
      //   const results = await Promise.all(pokemonPromises)
      //   // Filter out any null results from errors
      //   pokemons = results.filter((pokemon) => pokemon !== null)
      // } catch (err) {
      //   logger.error(`Error in generation filter`, err)
      //   return []
      // }
    } else {
      try {
        const pokemonsList = await P.getPokemonsList({ offset: filterBy.pageIdx * filterBy.limit, limit: filterBy.limit })
        let pokemonsNames = pokemonsList.results.map((pokemon) => pokemon.name)
        let pokemonsIds = await P.getPokemonByName(pokemonsNames)
        pokemonsIds = pokemonsIds.map((pokemon) => pokemon.id)

        pokemons = await P.getPokemonByName(pokemonsIds)
        pokemons = pokemons.map((pokemon) => {
          return {
            name: pokemon.name,
            id: pokemon.id,
            imageUrl: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default,
            types: pokemon.types.map((type) => type.type.name) || []
          }
        })
      } catch (err) {
        logger.error('cannot find pokemons', err)
        throw err
      }
    }
    return pokemons
  } catch (err) {
    logger.error('cannot find pokemons', err)
    throw err
  }
}
// async function query(filterBy = { region: '' }) {
//   try {
//     let regionalPokedex = await P.getPokedexByName(filterBy.region)
//     let pokemonsNames = regionalPokedex.pokemon_entries.map((pokemon) => {
//       return pokemon.pokemon_species.name
//     })

//     const startIdx = filterBy.pageIdx ? filterBy.pageIdx * PAGE_SIZE : 0
//     pokemonsNames = pokemonsNames.slice(startIdx, startIdx + PAGE_SIZE)

//     const pokemon_species = await P.getPokemonSpeciesByName(pokemonsNames)
//     const pokemonEntries = pokemon_species.map((pokemon) => pokemon.pokedex_numbers[0].entry_number)

//     let pokemons = await P.getPokemonByName(pokemonEntries)
//     pokemons = pokemons.map((pokemon) => {
//       return {
//         name: pokemon.name,
//         id: pokemon.id,
//         imageUrl: pokemon.sprites.other['official-artwork'].front_default,
//         types: pokemon.types.map((type) => type.type.name)
//       }
//     })

//     return pokemons
//   } catch (err) {
//     logger.error('cannot find pokemons', err)
//     throw err
//   }
// }

async function getById(pokemonId) {
  try {
    let pokemon = await P.getPokemonByName(pokemonId)
    pokemon = pokemon.map((pokemon) => {
      return {
        name: pokemon.name,
        id: pokemon.id,
        imageUrl: pokemon.sprites.other['official-artwork'].front_default || '',
        types: pokemon.types.map((type) => type.type.name) || []
      }
    })
    return pokemon
  } catch (err) {
    logger.error(`while finding pokemon ${pokemonId}`, err)
    throw err
  }
}

async function remove(pokemonId) {
  const { loggedinUser } = asyncLocalStorage.getStore()
  const { _id: ownerId, isAdmin } = loggedinUser

  try {
    const criteria = {
      _id: ObjectId.createFromHexString(pokemonId)
    }

    if (!isAdmin) criteria['owner._id'] = ownerId

    const collection = await dbService.getCollection('pokemon')
    const res = await collection.deleteOne(criteria)

    if (res.deletedCount === 0) throw 'Not your pokemon'
    return pokemonId
  } catch (err) {
    logger.error(`cannot remove pokemon ${pokemonId}`, err)
    throw err
  }
}

async function add(pokemon) {
  try {
    const collection = await dbService.getCollection('pokemon')
    await collection.insertOne(pokemon)

    return pokemon
  } catch (err) {
    logger.error('cannot insert pokemon', err)
    throw err
  }
}

async function update(pokemon) {
  const pokemonToSave = { vendor: pokemon.vendor, speed: pokemon.speed }

  try {
    const criteria = { _id: ObjectId.createFromHexString(pokemon._id) }
    const collection = await dbService.getCollection('pokemon')
    await collection.updateOne(criteria, { $set: pokemonToSave })

    return pokemon
  } catch (err) {
    logger.error(`cannot update pokemon ${pokemon._id}`, err)
    throw err
  }
}

async function addPokemonMsg(pokemonId, msg) {
  try {
    const criteria = { _id: ObjectId.createFromHexString(pokemonId) }
    msg.id = makeId()

    const collection = await dbService.getCollection('pokemon')
    await collection.updateOne(criteria, { $push: { msgs: msg } })

    return msg
  } catch (err) {
    logger.error(`cannot add pokemon msg ${pokemonId}`, err)
    throw err
  }
}

async function removePokemonMsg(pokemonId, msgId) {
  try {
    const criteria = { _id: ObjectId.createFromHexString(pokemonId) }

    const collection = await dbService.getCollection('pokemon')
    await collection.updateOne(criteria, { $pull: { msgs: { id: msgId } } })

    return msgId
  } catch (err) {
    logger.error(`cannot remove pokemon msg ${pokemonId}`, err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  const criteria = {
    vendor: { $regex: filterBy.txt, $options: 'i' },
    speed: { $gte: filterBy.minSpeed }
  }

  return criteria
}

function _buildSort(filterBy) {
  if (!filterBy.sortField) return {}
  return { [filterBy.sortField]: filterBy.sortDir }
}
