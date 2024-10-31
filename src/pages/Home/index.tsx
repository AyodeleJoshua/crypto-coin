import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useState({
    page: 0,
    pageSize: 10,
  });

  // This useeffect prefetches the next data so that users do not see loading state when they go to next page.
  // User only see loading state once when the page is newly loaded
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['all-coins', queryParams.page + 1, queryParams.pageSize],
      queryFn: () =>
        getAllCoinsData(
          (queryParams.page + 1) * queryParams.pageSize,
          queryParams.pageSize,
        ),
      staleTime: Infinity,
    });
  }, [queryParams]);

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
          currentPage={queryParams.page}
          pageSize={queryParams.pageSize}
          onPaginationChange={(_, newPage) =>
            setQueryParams({ ...queryParams, page: newPage })
          }
          testId="all-coins-table"
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
