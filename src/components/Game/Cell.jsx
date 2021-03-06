// @flow
import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

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
    <div className={styles.cellWrapper}>
      <button
        type="button"
        className={cn(styles.cellItem, {
          [styles.cellZero]: number === 16,
        })}
        onClick={handleClick}
      >
        {number}
      </button>
    </div>
  </div>
);

export const Cell = connect(
  null,
  (dispatch, ownProps) => ({
    handleClick: () => dispatch(moveTo(ownProps.number))
  })
)(DCell);
