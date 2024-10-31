import { http, HttpResponse } from 'msw';
import mockedAllCoins from './__mock_data__.json';
import environmentVariables from '../src/utils/environmentVariables';

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get(`${environmentVariables.baseURL}//api/tickers/`, () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json(mockedAllCoins);
  }),
];
