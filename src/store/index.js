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
  ui
} from '../reducers'

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
  account,
  users,
  ui
})

const persistedReducer = persistReducer(persistConfig, reducers)

let store = createStore(
  persistedReducer,
  applyMiddleware(thunk, logger)
)

let persistor = persistStore(store)

export default { store, persistor }