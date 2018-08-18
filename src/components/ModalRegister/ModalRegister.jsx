// @flow
import React from 'react';
import Modal from 'react-modal';

import styles from './ModalRegister.styl';

import FullForm from './FullForm';
import ModalSuccess from './ModalSuccess';
import { ModalConsumer } from '../ModalProvider';

const Modal1 = ({
  onRequestClose, city, apiUrl, ...otherProps
}) => (
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
                <ModalConsumer>
                  {({ showModal }) => <FullForm city={city} apiUrl={apiUrl} onSubmitSuccess={() => showModal(ModalSuccess, { isOpen:true })} />}
                </ModalConsumer>
              </div>
              <div className={styles.popupFootnote}>
                Нажимая кнопку «Отправить» Вы свободно, своей волей и в своем интересе даете согласие
                на обработку своих персональных данных в соответствии с
                <a href="https://gett.com/ru/legal/personalpolicy/" target="_blank" rel="noopener noreferrer">
                  Политикой в отношении обработки персональных данных в ООО «ГетТакси Рус»»
                </a>
                и соглашаетесь с
                <a href="https://gett.com/ru/legal/privacy/" target="_blank" rel="noopener noreferrer">
                  «Политикой конфиденциальности ООО «ГетТакси Рус»»
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
);
export default Modal1;
