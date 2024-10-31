import React from 'react';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import Home from '../src/pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: Infinity, refetchOnWindowFocus: false, retry: false },
  },
});

test('renders name', async () => {
  const { getByText } = render(
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>,
  );

  await expect.element(getByText('code')).not.toBeInTheDocument()
  // await expect.element(getByText('code')).not.toBeInTheDocument();
  // await getByRole('button', { name: 'Increment ' }).click();

  // await expect.element(getByText('Hello Vitest x2!')).toBeInTheDocument();
});
