import React from 'react';
import { render } from '@testing-library/react';
import { Title } from './title';

test('renders correct title', async () => {
    const { getByText } = render(<Title value={'Dune'} />);

  // renders the correct title value
  const correctTitle = getByText(/Dune/i);
  expect(correctTitle).toBeInTheDocument();
});