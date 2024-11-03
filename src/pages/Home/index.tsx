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
  const {
    isLoadingAllCoinsData,
    allCoinsData,
    queryParams,
    setQueryParams,
    isAllCoinsFetchError,
    allCoinsError,
  } = useCoins();

  return (
    <>
      {isLoadingAllCoinsData && !allCoinsData && <Spinner />}

      {!isLoadingAllCoinsData && allCoinsData && (
        <Table
          columns={columns}
          dataSource={allCoinsData.map((coinData) => ({
            ...coinData,
            tsupply: `${Number(coinData.tsupply).toLocaleString()} ${
              coinData.symbol
            }`,
            price_usd: `$${Number(coinData.price_usd)?.toLocaleString()}`,
          }))}
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
