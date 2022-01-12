import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import {
  persistStore,
  persistReducer
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'

import {
  account,
  users,
  ui,
  dogs,
  walkers,
  schedules
} from '../reducers'

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
  account,
  users,
  ui,
  dogs,
  walkers,
  schedules
})

const persistedReducer = persistReducer(persistConfig, reducers)

let store = createStore(
  persistedReducer,
  applyMiddleware(thunk, logger)
)

let persistor = persistStore(store)

// persistor.purge()

export default { store, persistor }