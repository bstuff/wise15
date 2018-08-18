// @flow
import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import { logger } from 'redux-logger';

import { reducers } from './reducers';

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

export const configureStore = (initialState) => {
  const store = createStore(
    combineReducers({
      ...reducers,
    }),
    initialState,
    enhancer,
  );
  return store;
};
