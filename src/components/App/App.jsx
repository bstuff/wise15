// @flow
import React from 'react';
import { hot, setConfig } from 'react-hot-loader';
import { Provider } from 'react-redux';

import styles from './App.styl';

import { Game } from '../Game';
import { configureStore } from '../../redux/configureStore';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <div className={styles.app}>
      <Game />
    </div>
  </Provider>

);

setConfig({ logLevel:process.env.NODE_ENV === 'development' ? 'info' : 'error' });

export default hot(module)(App);
