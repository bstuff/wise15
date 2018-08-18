// @flow
import React from 'react';
import { connect } from 'react-redux';
import { chunk } from 'lodash-es';
import { mapProps, compose } from 'recompose';

import styles from './Game.styl';

import { move } from './redux/game.actions';
import { Row } from './Row';
import { Back } from './Back';

export const GameRows = ({
  rows,
}: {
  rows: Array<Array<number>>
}) => (
  <div className={styles.game}>
    <Back />
    {rows.map(row => <Row key={row[0]} cells={row} />)}
  </div>
);


const convertArrToRows: number[] => number[][] = arr => chunk(arr, 4);

const enhance = compose(
  connect(
    state => ({
      arrayOfNumbers: state.game.rows,
    }),
    dispatch => {
      window.addEventListener('keyup', (e) => {
        if (/^Arrow/.test(e.key)) {
          dispatch(move(e.key.replace('Arrow', '').toLowerCase()));
        }
      });
      return {};
    }
  ),
  mapProps(
    ({
      arrayOfNumbers,
    }: {
      arrayOfNumbers: number[],
    }) => ({
      rows: convertArrToRows(arrayOfNumbers),
    }),
  ),
);

export const Game = enhance(GameRows);
