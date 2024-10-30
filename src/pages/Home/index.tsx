import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Spinner, Table } from '../../components';
import config from '../../../__mock__.json';
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
    csupply: string;
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
          dataSource={allCoinsData.data}
          showPagination={true}
          total={config.data.length}
          currentPage={1}
          pageSize={10}
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
