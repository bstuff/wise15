// @flow
import React from 'react';
import { chunk, shuffle } from 'lodash-es';
import { mapProps } from 'recompose';

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

const enhance = mapProps(
  ({
    arrayOfNumbers = shuffle(Array.from(Array(16)).map((e, i) => +i)),
  }: {
    arrayOfNumbers: number[],
  }) => ({
    rows: convertArrToRows(arrayOfNumbers),
  }),
);

export const Game = enhance(GameRows);
