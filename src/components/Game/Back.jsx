// @flow
import React from 'react';
import { connect } from 'react-redux';

import styles from './Game.styl';

import { stepBack } from './redux/game.actions';

export const BButton = ({
  handleClick,
}: {
  handleClick: () => void,
}) => (
  <div className={styles.back}>
    <button
      type="button"
      onClick={handleClick}
    >
      Шаг назад
    </button>
  </div>
);

export const Back = connect(
  null,
  (dispatch, ownProps) => ({
    handleClick: () => dispatch(stepBack)
  })
)(BButton);
