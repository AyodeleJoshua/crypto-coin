import Pagination from '../Pagination';
import styles from './table.module.css';

type TableColumnType = {
  key: string;
  title: string;
};

interface TableProps {
  columns: TableColumnType[];
  dataSource: Record<string, string | number>[];
  showPagination?: boolean;
  pageSize?: number;
  currentPage?: number;
  onPaginationChange?: (pageSize: number, newPage: number) => void;
  testId?: string;
}

function Table({
  columns,
  dataSource,
  showPagination = true,
  pageSize,
  currentPage,
  onPaginationChange,
  testId,
}: TableProps) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table} data-testid={testId}>
        <thead className={styles.tableHead}>
          <tr className={styles.headerRow}>
            {columns.map((column) => (
              <th scope="col" key={column.key} className={styles.tableCell}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {dataSource.map((data, index) => (
            <tr key={index} className={styles.tableRow}>
              {columns.map((column) => (
                <td key={column.key} className={styles.tableCell}>
                  <span className={styles.mobileCellTitle}>{column.title}</span>
                  <span>{data[column.key]}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {showPagination && (
        <Pagination
          pageSize={pageSize as number}
          currentPage={currentPage as number}
          onPaginationChange={
            onPaginationChange as (ps: number, np: number) => void
          }
        />
      )}
    </div>
  );
}

export default Table;
