// eslint-disable-next-line import/no-extraneous-dependencies
import { http, HttpResponse } from 'msw';
import mockedAllCoins from './__mock_data__.json';

const handlers = [
  http.get('/api/tickers/', () => HttpResponse.json(mockedAllCoins)),
];

export default handlers;
