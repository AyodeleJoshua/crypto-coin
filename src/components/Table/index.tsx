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
        aria-label="Table presenting data"
        aria-rowcount={pageSize}
        className={styles.smTable}
      >
        {dataSource.map((data, index) => (
          <dl
            key={index}
            className={styles.smTableRow}
            aria-rowindex={index + 1}
          >
            {columns.map((column) => (
              <div key={column.key} role="cell">
                <dt className={styles.columnHeader}>{column.title}</dt>
                <dd>{data[column.key]}</dd>
              </div>
            ))}
          </dl>
        ))}
      </div>
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
