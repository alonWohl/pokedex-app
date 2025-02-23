import { logger } from '../../services/logger.service.js'
import { pokemonService } from './pokemon.service.js'

export async function getPokemons(req, res) {
  try {
    // const filterBy = {
    //   txt: req.query.txt || '',
    //   minSpeed: +req.query.minSpeed || 0,
    //   sortField: req.query.sortField || '',
    //   sortDir: req.query.sortDir || 1,
    //   pageIdx: req.query.pageIdx
    // }

    const filterBy = {
      region: req.query.region,
      pageIdx: req.query.pageIdx
    }
    console.log('🚀 ~ getPokemons ~ filterBy:', filterBy)

    const pokemons = await pokemonService.query(filterBy)
    res.json(pokemons)
  } catch (err) {
    logger.error('Failed to get pokemons', err)
    res.status(400).send({ err: 'Failed to get pokemons' })
  }
}

export async function getPokemonById(req, res) {
  try {
    const pokemonId = req.params.id
    const pokemon = await pokemonService.getById(pokemonId)
    res.json(pokemon)
  } catch (err) {
    logger.error('Failed to get pokemon', err)
    res.status(400).send({ err: 'Failed to get pokemon' })
  }
}

export async function addPokemon(req, res) {
  const { loggedinUser, body: pokemon } = req

  try {
    pokemon.owner = loggedinUser
    const addedPokemon = await pokemonService.add(pokemon)
    res.json(addedPokemon)
  } catch (err) {
    logger.error('Failed to add pokemon', err)
    res.status(400).send({ err: 'Failed to add pokemon' })
  }
}

export async function updatePokemon(req, res) {
  const { loggedinUser, body: pokemon } = req
  const { _id: userId, isAdmin } = loggedinUser

  if (!isAdmin && pokemon.owner._id !== userId) {
    res.status(403).send('Not your pokemon...')
    return
  }

  try {
    const updatedPokemon = await pokemonService.update(pokemon)
    res.json(updatedPokemon)
  } catch (err) {
    logger.error('Failed to update pokemon', err)
    res.status(400).send({ err: 'Failed to update pokemon' })
  }
}

export async function removePokemon(req, res) {
  try {
    const pokemonId = req.params.id
    const removedId = await pokemonService.remove(pokemonId)

    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove pokemon', err)
    res.status(400).send({ err: 'Failed to remove pokemon' })
  }
}

export async function addPokemonMsg(req, res) {
  const { loggedinUser } = req

  try {
    const pokemonId = req.params.id
    const msg = {
      txt: req.body.txt,
      by: loggedinUser
    }
    const savedMsg = await pokemonService.addPokemonMsg(pokemonId, msg)
    res.json(savedMsg)
  } catch (err) {
    logger.error('Failed to add pokemon msg', err)
    res.status(400).send({ err: 'Failed to add pokemon msg' })
  }
}

export async function removePokemonMsg(req, res) {
  try {
    const { id: pokemonId, msgId } = req.params

    const removedId = await pokemonService.removePokemonMsg(pokemonId, msgId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove pokemon msg', err)
    res.status(400).send({ err: 'Failed to remove pokemon msg' })
  }
}
