import { useEffect, useState } from 'react';
import getAllCoinsData from '../services/crypto.services';
import { AllCoinsData } from '../utils/types';

const cache: Record<string, string> = {};

export const useCoins = (queryParams: { page: number; pageSize: number }) => {
  const [data, setData] = useState<AllCoinsData | null>(null);
  const [error, setError] = useState({ isError: false, message: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const runQuery = async (
      key: string,
      start: number,
      activateLoading: boolean,
      onSuccessfulFetch?: <T>(fetchedData: T) => void,
    ) => {
      if (activateLoading) {
        setIsLoading(true);
      }

      try {
        const response = await getAllCoinsData(start, queryParams.pageSize);

        cache[key] = JSON.stringify(response);

        if (onSuccessfulFetch) {
          onSuccessfulFetch(response);
        }
        setIsLoading(false);
      } catch (err) {
        setError({ isError: true, message: err as string });
      }
    };
    const key = `allCoinsData-${queryParams.page}`;

    // Optimistically fetch next data to avoid user waiting for on next button click
    runQuery(
      `allCoinsData-${queryParams.page + 1}`,
      (queryParams.page + 1) * queryParams.pageSize,
      false,
    );

    if (cache[key]) {
      setData(JSON.parse(cache[key]));
    } else {
      runQuery(
        key,
        queryParams.page * queryParams.pageSize,
        true,
        (result) => setData(result as AllCoinsData),
      );
    }
  }, [queryParams]);

  return {
    allCoinsData: data?.data.map((coinData) => ({
      ...coinData,
      tsupply: `${Number(coinData.tsupply).toLocaleString()} ${
        coinData.symbol
      }`,
      price_usd: `$${Number(coinData.price_usd)?.toLocaleString()}`,
    })),
    isLoadingAllCoinsData: isLoading,
    isAllCoinsFetchError: error.isError,
    allCoinsError: error,
  };
};

export default useCoins;