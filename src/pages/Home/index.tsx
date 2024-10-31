import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Spinner, Table } from '../../components';
import { getAllCoinsData } from '../../services/crypto.services';
import styles from './home.module.scss';

const columns = [
  { key: 'name', title: '💰 Coin' },
  { key: 'symbol', title: '📄 Code' },
  { key: 'price_usd', title: '🤑 Price' },
  { key: 'tsupply', title: '📈 Total Supply' },
];

interface AllCoinsData {
  data: {
    symbol: string;
    name: string;
    price_usd: string;
    tsupply: string;
  }[];
}

const Home = () => {
  const [queryParams, setQueryParams] = useState({
    page: 0,
    pageSize: 10,
  });

  const {
    isLoading: isLoadingAllCoinsData,
    data: allCoinsData,
    isError: isAllCoinsFetchError,
    error: allCoinsError,
  } = useQuery<AllCoinsData>({
    queryFn: () =>
      getAllCoinsData(
        queryParams.page * queryParams.pageSize,
        queryParams.pageSize,
      ),
    queryKey: ['all-coins', queryParams.page, queryParams.pageSize],
  });

  return (
    <>
      {isLoadingAllCoinsData && !allCoinsData && <Spinner />}

      {!isLoadingAllCoinsData && allCoinsData && (
        <Table
          columns={columns}
          dataSource={allCoinsData.data.map((coinData) => ({
            ...coinData,
            tsupply: `${Number(coinData.tsupply).toLocaleString()} ${
              coinData.symbol
            }`,
            price_usd: `$${Number(coinData.price_usd)?.toLocaleString()}`,
          }))}
          showPagination={true}
          total={allCoinsData.data.length}
          currentPage={queryParams.page + 1}
          pageSize={queryParams.pageSize}
          onPaginationChange={(_, newPage) =>
            setQueryParams({ ...queryParams, page: newPage })
          }
        />
      )}

      {!isLoadingAllCoinsData && isAllCoinsFetchError && (
        <div className={styles.errorContainer}>
          <div>
            <p>{allCoinsError.message}</p>
            <p>Try again later</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
