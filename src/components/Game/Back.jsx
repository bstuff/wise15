// @flow
import React from 'react';
import { connect } from 'react-redux';

import styles from './Game.styl';

import { stepBack, testWin } from './redux/game.actions';

export const BButton = ({
  handleClick,
  handleTest,
}: {
  handleClick: () => void,
  handleTest: () => void,
}) => (
  <div className={styles.back}>
    <button
      type="button"
      onClick={handleClick}
    >
      Шаг назад
    </button>
    <button
      type="button"
      onClick={handleTest}
    >
      Показать выигрыш
    </button>
  </div>
);

export const Back = connect(
  null,
  (dispatch, ownProps) => ({
    handleClick: () => dispatch(stepBack),
    handleTest: () => dispatch(testWin),
  })
)(BButton);
