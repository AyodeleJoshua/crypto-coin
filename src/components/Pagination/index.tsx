import { useState } from 'react';
import styles from './pagination.module.css';
import GoArrowLeft from '../../assets/arrowLeft.svg';
import GoArrowRight from '../../assets/arrowRight.svg';

interface PaginationProps {
  pageSize: number;
  currentPage: number;
  onPaginationChange: (pageSize: number, newPage: number) => void;
}

function Pagination({
  pageSize,
  currentPage,
  onPaginationChange,
}: PaginationProps) {
  const [page, setPage] = useState(currentPage);

  const handlePaginationChange = (actionType: 'increment' | 'decrement') => {
    let newPageNumber = page;

    if (actionType === 'increment') {
      newPageNumber += 1;
    } else {
      newPageNumber -= 1;
    }

    setPage(newPageNumber);
    onPaginationChange(pageSize, newPageNumber);
  };

  return (
    <div className={styles.paginationContainer}>
      {page >= 1 && (
        <button
          className={styles.actionButton}
          onClick={() => handlePaginationChange('decrement')}
          aria-disabled={page < 1}
          disabled={page < 1}
          data-testid="previous-button"
          type="button"
        >
          <img
            src={GoArrowLeft}
            alt=""
            aria-hidden="true"
            className={styles.icon}
          />
          Previous
        </button>
      )}

      <button
        className={`${styles.actionButton} ${styles.incrementButton}`}
        onClick={() => handlePaginationChange('increment')}
        data-testid="next-button"
        type="button"
      >
        Next
        <img
          src={GoArrowRight}
          className={styles.icon}
          aria-hidden="true"
          alt=""
        />
      </button>
    </div>
  );
}

export default Pagination;
