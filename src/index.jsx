// @flow
import React from 'react';
import { render } from 'react-dom';
import 'reset.css';
import 'normalize.css';
import Modal from 'react-modal';

import './style.styl';

import { App } from './components/App';

const container = document.getElementById('app');

if (container) {
  Modal.setAppElement(container);
  render(<App
    // showTable={abParam === 'a'}
    // showFormula={abParam === 'b'}
  />, container);
}

console.log('it Works');
