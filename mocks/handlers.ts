// eslint-disable-next-line import/no-extraneous-dependencies
import { http, HttpResponse } from 'msw';
import mockedAllCoins from './__mock_data__.json';
import environmentVariables from '../src/utils/environmentVariables';

const handlers = [
  http.get(`${environmentVariables.baseURL}/api/tickers/`, () => HttpResponse.json(mockedAllCoins)),
];

export default handlers;
