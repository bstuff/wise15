// @flow
import React from 'react';

import styles from './FullForm.styl';

export default ({ onRequestClose }: {
  onRequestClose: (*) => *,
}) => (
  <div className={styles.ff}>
    <div className={styles.center}>
      <div className={styles.successMark} />
      <div className={styles.title}>
        Спасибо за заявку!
      </div>
      <div className={styles.subtitle}>
        Наш менеджер свяжется с Вами
        <br />
        в ближайшее время!
      </div>
      <div className={styles.btnWrapper}>
        <button type="button" className={styles.btn} onClick={onRequestClose}>
          Хорошо
        </button>
      </div>
    </div>
  </div>
);
