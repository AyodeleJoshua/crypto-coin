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
  total?: number;
  ariaLabel?: string;
  onPaginationChange?: (pageSize: number, newPage: number) => void;
}

const Table = ({
  columns,
  dataSource,
  showPagination = true,
  pageSize,
  currentPage,
  ariaLabel = 'Table presenting data',
  onPaginationChange,
}: TableProps) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            {columns.map((column) => (
              <th scope="col" key={column.key} className={styles.tableCell}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((data, index) => (
            <tr
              key={index}
              className={`${styles.tableRow} ${
                index % 2 === 0 ? styles.greyedTableRow : ''
              }`}
            >
              {columns.map((column) => (
                <td key={column.key} className={styles.tableCell}>
                  {data[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div
        role="table"
        aria-label={ariaLabel}
        aria-rowcount={pageSize}
        className={styles.smTable}
      >
        {dataSource.map((data, index) => (
          <div
            key={index}
            className={styles.smTableRow}
            role="row"
            aria-rowindex={index + 1}
          >
            {columns.map((column) => (
              <div key={column.key} className={styles.smTableCell}>
                <span role="columnheader" className={styles.columnHeader}>
                  {column.title}
                </span>
                <span role="cell">{data[column.key]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      {showPagination && (
        <Pagination
          pageSize={pageSize as number}
          currentPage={currentPage as number}
          onPaginationChange={
            onPaginationChange as (pageSize: number, newPage: number) => void
          }
        />
      )}
    </div>
  );
};

export default Table;
