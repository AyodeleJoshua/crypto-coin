import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import styles from './pagination.module.css';
import { useState } from 'react';

interface PaginationProps {
  pageSize: number;
  currentPage: number;
  onPaginationChange: (pageSize: number, newPage: number) => void;
}

const Pagination = ({
  pageSize,
  currentPage,
  onPaginationChange,
}: PaginationProps) => {
  const [page, setPage] = useState(currentPage);

  const handlePaginationChange = (actionType: 'increment' | 'decrement') => {
    let newPageNumber = page;

    if (actionType === 'increment') {
      newPageNumber++;
    } else {
      newPageNumber--;
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
        >
          <GoArrowLeft className={styles.icon} aria-hidden="true" />
          Previous
        </button>
      )}

      <button
        className={`${styles.actionButton} ${styles.incrementButton}`}
        onClick={() => handlePaginationChange('increment')}
        data-testid="next-button"
      >
        Next
        <GoArrowRight className={styles.icon} aria-hidden="true" />
      </button>
    </div>
  );
};

export default Pagination;
