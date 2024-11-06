import getRequest from '../api/apiCallMethods';

const tickersEndpointUrl = '/api/tickers/';

const getAllCoinsData = <T>(
  start: string = '1',
  limit: string = '10',
): Promise<T> => getRequest(tickersEndpointUrl, { start, limit });

export default getAllCoinsData;
