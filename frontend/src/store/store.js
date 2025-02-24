import { legacy_createStore as createStore, combineReducers } from 'redux'

import { pokemonReducer } from './pokemon.reducer'
import { userReducer } from './user.reducer'

import { systemReducer } from './system.reducer'

const rootReducer = combineReducers({
  pokemonModule: pokemonReducer,
  userModule: userReducer,
  systemModule: systemReducer
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)

// For debug:
// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })
