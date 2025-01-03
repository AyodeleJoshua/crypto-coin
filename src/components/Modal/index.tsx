import { createPortal } from 'react-dom';
import { ReactNode, useEffect } from 'react';
import styles from './modal.module.css';

interface ModalProps {
  show: boolean;
  cancelModal: () => void;
  children: ReactNode;
}

const Modal = ({ show, cancelModal, children }: ModalProps) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    }
    window.scrollTo(0, 0);
  }, [show]);

  return (
    show
    && createPortal(
      <div
        className={show ? styles.modalShow : styles.modalHidden}
        tabIndex={-1}
        role="dialog"
      >
        <div className={styles.innerContainer}>
          <button
            type="button"
            onClick={() => {
              document.body.style.overflow = 'scroll';
              cancelModal();
            }}
            className={styles.canelButton}
            aria-label="Close modal"
          >
            X
          </button>
          {children}
        </div>
      </div>,
      document.body,
    )
  );
};

export default Modal;
