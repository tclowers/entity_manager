import React from 'react';
import { render } from '@testing-library/react';
import { Author } from './author';

test('adds by', async () => {
  const { getByText } = render(<Author value={'Frank Herbert'} />);

  // renders the author's name prepended with 'by'
  const attribution = getByText(/by Frank Herbert/i);
  expect(attribution).toBeInTheDocument();
});
