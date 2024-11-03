import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import getAllCoinsData from '../services/crypto.services';

interface AllCoinsData {
  data: {
    symbol: string;
    name: string;
    price_usd: string;
    tsupply: string;
  }[];
}

const useCoins = () => {
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useState({
    page: 0,
    pageSize: 10,
  });

  // This useeffect prefetches the next data so that users do not
  // see loading state when they go to next page.
  // User only see loading state once when the page is newly loaded
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['all-coins', queryParams.page + 1, queryParams.pageSize],
      queryFn: () => getAllCoinsData(
        (queryParams.page + 1) * queryParams.pageSize,
        queryParams.pageSize,
      ),
      staleTime: Infinity,
    });
  }, [queryParams, queryClient]);

  const {
    isLoading: isLoadingAllCoinsData,
    data: allCoinsData,
    isError: isAllCoinsFetchError,
    error: allCoinsError,
  } = useQuery<AllCoinsData>({
    queryFn: () => getAllCoinsData(
      queryParams.page * queryParams.pageSize,
      queryParams.pageSize,
    ),
    queryKey: ['all-coins', queryParams.page, queryParams.pageSize],
  });

  return {
    isLoadingAllCoinsData,
    allCoinsData: allCoinsData?.data,
    isAllCoinsFetchError,
    allCoinsError,
    setQueryParams,
    queryParams,
  };
};

export default useCoins;