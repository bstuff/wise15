// @flow
import React from 'react';
import { connect } from 'react-redux';

import styles from './Game.styl';

import { moveTo } from './redux/game.actions';

export const DCell = ({
  number,
  handleClick,
}: {
  number: number,
  handleClick: () => void,
}) => (
  <div className={styles.cell}>
    <button
      type="button"
      className={styles.cellItem}
      onClick={handleClick}
    >
      {number}
    </button>
  </div>
);

export const Cell = connect(
  null,
  (dispatch, ownProps) => ({
    handleClick: () => dispatch(moveTo(ownProps.number))
  })
)(DCell);
