// @flow
import React from 'react';
import { hot, setConfig } from 'react-hot-loader';
import MediaQuery from 'react-responsive';

import styles from './App.styl';

import { ModalProvider, ModalRoot } from '../ModalProvider';

const App = () => (
  <ModalProvider>
    <div className={styles.app}>
      Првет!
    </div>
    <ModalRoot />
  </ModalProvider>
);

setConfig({ logLevel:process.env.NODE_ENV === 'development' ? 'info' : 'error' });

export default hot(module)(App);
