import styles from './spinner.module.css';

function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.loader} />
    </div>
  );
}

export default Spinner;
