// @flow
import React from 'react';
import { connect } from 'react-redux';
import { chunk, shuffle } from 'lodash-es';
import { mapProps, compose } from 'recompose';

import styles from './Game.styl';

import { Row } from './Row';

export const GameRows = ({
  rows,
}: {
  rows: Array<Array<number>>
}) => (
  <div className={styles.game}>
    {rows.map(row => <Row key={row[0]} cells={row} />)}
  </div>
);


const convertArrToRows: number[] => number[][] = arr => chunk(arr, 4);

const enhance = compose(
  connect(
    state => ({
      arrayOfNumbers: state.game.rows,
    }),
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
