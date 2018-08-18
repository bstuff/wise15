// @flow
import React from 'react';

import styles from './Game.styl';

export const Cell = ({ number }: {
  number: number,
}) => (
  <div className={styles.cell}>
    <div className={styles.cellItem}>
      {number}
    </div>
  </div>
);
