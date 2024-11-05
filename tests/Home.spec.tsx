import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { it, expect } from 'vitest';
import Home from '../src/pages/Home';

it('should render table in dom', async () => {
  const { getByTestId } = render(<Home />);
  const allCoinsTable = await waitFor(() => getByTestId('all-coins-table'));
  await expect(allCoinsTable).toBeInTheDocument();
});

it('previous button should not be visible when page is first loaded', async () => {
  const { queryByTestId, getByTestId } = render(<Home />);
  await waitFor(() => getByTestId('all-coins-table'));

  await expect(queryByTestId('previous-button')).not.toBeInTheDocument();
});

it('next button should be visible when page is first loaded', async () => {
  const { getByTestId } = render(<Home />);
  await waitFor(() => getByTestId('all-coins-table'));

  await expect(getByTestId('next-button')).toBeInTheDocument();
});

it('previous button should be visible when next button is clicked', async () => {
  const { getByTestId } = render(<Home />);
  await waitFor(() => getByTestId('all-coins-table'));

  await getByTestId('next-button').click();
  await expect(getByTestId('previous-button')).toBeInTheDocument();
});
