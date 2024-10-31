// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';
import environmentVariables from '../src/utils/environmentVariables';
import mockedAllCoins from '../mocks/__mock_data__.json';

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get(`${environmentVariables.baseURL}/api/tickers/`, () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json(mockedAllCoins);
  }),
];
