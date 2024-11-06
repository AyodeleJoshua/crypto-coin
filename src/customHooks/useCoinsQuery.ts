import { useEffect, useState } from 'react';
import getAllCoinsData from '../services/coinlore.services';
import { AllCoinsData } from '../utils/types';

// Map to cache fetch result.
// The app only show loading state on reload and before first data returns
// Result can be cached to local storage but tend to reduce get and set time
const resultCache: Record<string, string> = {};

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

        resultCache[key] = JSON.stringify(response);

        if (onSuccessfulFetch) {
          onSuccessfulFetch(response);
        }
      } catch (err) {
        setError({ isError: true, message: err as string });
      }
      setIsLoading(false);
    };

    const key = `allCoinsData-${queryParams.page}`;

    // Optimistically fetch next data
    // to avoid user waiting for data loading on next button click
    // if data is not in cache
    if (!resultCache[`allCoinsData-${queryParams.page + 1}`]) {
      runQuery(
        `allCoinsData-${queryParams.page + 1}`,
        (queryParams.page + 1) * queryParams.pageSize,
        false,
      );
    }

    if (resultCache[key]) {
      setData(JSON.parse(resultCache[key]));
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
      tsupply: `${Number(coinData.tsupply).toLocaleString('en', {
        notation: 'compact',
        maximumFractionDigits: 3,
      })} ${coinData.symbol}`,
      price_usd: `$${Number(coinData.price_usd)?.toLocaleString()}`,
    })),
    isLoadingAllCoinsData: isLoading,
    isAllCoinsFetchError: error.isError,
    allCoinsError: error,
  };
};

export default useCoins;
