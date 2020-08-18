import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { query } from '../../graphql/books';
import { BookList } from './book-list';

const mocks = [
  {
    request: {
      query: query,
    },
    result: {
      data: {
        books: [
          {
            title: 'Harry Potter and the Chamber of Secrets',
            author: 'J.K. Rowling',
          },
          { title: 'Dune', author: 'Frank Herbert' },
        ],
      },
    },
  },
];

test('renders book list', async () => {
  const { getByText, getAllByRole } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BookList />
    </MockedProvider>
  );

  let promise = new Promise((resolve) => setTimeout(resolve, 0)); // wait for response
  await act(() => promise);

  // renders the title for "Books:" list
  const listElement = getByText(/Books:/i);
  expect(listElement).toBeInTheDocument();

  // renders the correct number of items
  const items = getAllByRole('listitem');
  expect(items.length).toEqual(2);
});
