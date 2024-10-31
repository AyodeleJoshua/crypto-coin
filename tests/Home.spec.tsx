import React from 'react';
import { expect, it, describe } from 'vitest';
import { render } from 'vitest-browser-react';
import Home from '../src/pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: Infinity, refetchOnWindowFocus: false, retry: false },
  },
});

const HomepageWithQueryClientProvider = () => (
  <QueryClientProvider client={queryClient}>
    <Home />
  </QueryClientProvider>
);

describe('Home', () => {
  it('should render table in dom', async () => {
    const { getByTestId } = render(<HomepageWithQueryClientProvider />);

    await expect.element(getByTestId('all-coins-table')).toBeInTheDocument();
  });

  it('previous button should not be visible when page is first loaded', async () => {
    const { getByTestId } = render(<HomepageWithQueryClientProvider />);

    await expect
      .element(getByTestId('previous-button'))
      .not.toBeInTheDocument();
  });

  it('next button should be visible when page is first loaded', async () => {
    const { getByTestId } = render(<HomepageWithQueryClientProvider />);

    await expect.element(getByTestId('next-button')).toBeInTheDocument();
  });

  it('previous button should be visible when next button is clicked', async () => {
    const { getByTestId } = render(<HomepageWithQueryClientProvider />);

    await getByTestId('next-button').click();
    await expect.element(getByTestId('previous-button')).toBeInTheDocument();
  });
});
