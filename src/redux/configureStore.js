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


// const dev = process.env.NODE_ENV === 'development';

const enhancer = compose(...[
  // Middleware you want to use in development:
  applyMiddleware(
    // routerMiddleware(history),
    // thunk,
    logger,
  ),
  // Required! Enable Redux DevTools with the monitors you chose
  // dev ? DevTools.instrument() : null,
].filter(p => p));

export const configureStore = (initialState = {}) => {
  const store = createStore(persistedReducer, initialState, enhancer);
  const persistor = persistStore(store);
  return {
    store,
    persistor,
  };
};
