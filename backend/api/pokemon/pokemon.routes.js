import express from 'express'

import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/logger.middleware.js'

import { getPokemons, getPokemonById, addPokemon, updatePokemon, removePokemon, addPokemonMsg, removePokemonMsg } from './pokemon.controller.js'

const router = express.Router()

// We can add a middleware for the entire router:
// router.use(requireAuth)

router.get('/', log, getPokemons)
router.get('/:id', log, getPokemonById)
router.post('/', log, requireAuth, addPokemon)
router.put('/:id', requireAuth, updatePokemon)
router.delete('/:id', requireAuth, removePokemon)
// router.delete('/:id', requireAuth, requireAdmin, removePokemon)

router.post('/:id/msg', requireAuth, addPokemonMsg)
router.delete('/:id/msg/:msgId', requireAuth, removePokemonMsg)

export const pokemonRoutes = router
