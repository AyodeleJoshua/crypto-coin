import { useState } from 'react';
import { Spinner, Table } from '../../components';
import styles from './home.module.css';
import useCoins from '../../customHooks/useCoins';

const columns = [
  { key: 'name', title: '💰 Coin' },
  { key: 'symbol', title: '📄 Code' },
  { key: 'price_usd', title: '🤑 Price' },
  { key: 'tsupply', title: '📈 Total Supply' },
];

function Home() {
  const [queryParams, setQueryParams] = useState({
    page: 0,
    pageSize: 10,
  });

  const {
    isLoadingAllCoinsData,
    allCoinsData,
    isAllCoinsFetchError,
    allCoinsError,
  } = useCoins(queryParams);

  return (
    <>
      {isLoadingAllCoinsData && !allCoinsData && <Spinner />}

      {!isLoadingAllCoinsData && allCoinsData && (
        <Table
          columns={columns}
          dataSource={allCoinsData}
          showPagination
          currentPage={queryParams.page}
          pageSize={queryParams.pageSize}
          onPaginationChange={(_, newPage) => setQueryParams({ ...queryParams, page: newPage })}
          testId="all-coins-table"
        />
      )}

      {!isLoadingAllCoinsData && isAllCoinsFetchError && (
        <div className={styles.errorContainer}>
          <div>
            <p>{allCoinsError?.message}</p>
            <p>Try again later</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
