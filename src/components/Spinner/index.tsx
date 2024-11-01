import { ImSpinner2 } from 'react-icons/im';
import styles from './spinner.module.css';

function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <ImSpinner2 className={styles.spinnerIcon} />
    </div>
  );
}

export default Spinner;
