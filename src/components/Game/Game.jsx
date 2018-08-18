// @flow
import React from 'react';

import styles from './Game.styl';

import { Row } from './Row';

export const Game = ({
  rows = [
    [ 1, 2, 3, 4 ],
    [ 5, 2, 0, 4 ],
    [ 6, 2, 3, 4 ],
    [ 7, 2, 3, 4 ],
  ],
}: {
  rows: Array<Array<number>>
}) => (
  <div className={styles.game}>
    {rows.map(row => <Row key={row[0]} cells={row} />)}
  </div>
);
