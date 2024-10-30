import { getRequest } from '../api/apiCallMethods';

const tickersEndpointUrl = '/api/tickers';

export const getAllCoinsData = <T>(
  start: number = 1,
  limit: number = 10,
): Promise<T> => getRequest(tickersEndpointUrl, { start, limit });
