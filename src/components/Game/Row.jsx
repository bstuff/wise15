// @flow
import React from 'react';

import styles from './Game.styl';

import { Cell } from './Cell';

export const Row = ({
  cells,
}: {
  cells: Array<number>,
}) => (
  <div className={styles.row}>
    {cells.map(c => <Cell number={c} key={c} />)}
  </div>
);
