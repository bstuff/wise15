// @flow
import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import { logger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import { reducers } from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers(reducers));


const dev = process.env.NODE_ENV === 'development';

// Middleware you want to use in development:
const enhancer = applyMiddleware(...[
  // routerMiddleware(history),
  // thunk,
  dev && logger,
].filter(p => p));

export const configureStore = (initialState = {}) => {
  const store = createStore(persistedReducer, initialState, enhancer);
  const persistor = persistStore(store);
  return {
    store,
    persistor,
  };
};
