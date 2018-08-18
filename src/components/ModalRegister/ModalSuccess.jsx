// @flow
import React from 'react';
import Modal from 'react-modal';

import styles from './ModalRegister.styl';

import Success from './Success';

const Modal1 = ({ onRequestClose, ...otherProps }) => (
  <Modal
    isOpen
    className={styles.modalScroll}
    overlayClassName={styles.modal}
    onRequestClose={onRequestClose}
    {...otherProps}
  >
    <div className={styles.modalCenter}>
      <div className={styles.modalCenterRow}>
        <div className={styles.modalCenterCell}>
          <div className={styles.modalContent}>
            <div className={styles.popup}>
              <div className={styles.popupBg}>
                <div className={styles.popupCloseWrapper}>
                  <button
                    className={styles.popupClose}
                    onClick={onRequestClose}
                    type="button"
                  >
                    &times;
                  </button>
                </div>
                <Success onRequestClose={onRequestClose} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
);
export default Modal1;
