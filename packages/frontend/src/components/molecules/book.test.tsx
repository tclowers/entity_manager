import React from 'react';
import { render } from '@testing-library/react';
import { Book } from './book';

test('renders author and title correctly', async () => {
    const { getByText } = render(<Book author={'William Gibson'} title={'Neuromancer'} />);

  // renders the correct title value
  const correctTitle = getByText(/Neuromancer/i);
  expect(correctTitle).toBeInTheDocument();

  const attribution = getByText(/by William Gibson/i);
  expect(attribution).toBeInTheDocument();
});