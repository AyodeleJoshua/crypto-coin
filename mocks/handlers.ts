// src/mocks/handlers.js
// eslint-disable-next-line import/no-extraneous-dependencies
import { http, HttpResponse } from 'msw';
import environmentVariables from '../src/utils/environmentVariables';
import mockedAllCoins from './__mock_data__.json';

const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get(`${environmentVariables.baseURL}/api/tickers/`, () => HttpResponse.json(mockedAllCoins)),
];

export default handlers;
