import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders book list', () => {
  const { getByText } = render(<App />);
  const listElement = getByText(/Books:/i);
  expect(listElement).toBeInTheDocument();
});
