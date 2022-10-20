export{}
// import React from 'react';
// import { act } from 'react-dom/test-utils';
// import { render } from '@testing-library/react';
// import { BookList } from './book-list';

// const mockData = [
//   {
//     title: 'Harry Potter and the Chamber of Secrets',
//     author: 'J.K. Rowling',
//   },
//   { title: 'Dune', author: 'Frank Herbert' },
// ];

// describe('testing book api', () => {
//   beforeEach(() => {
//     global.fetch.resetMocks();
//   })

//   test('renders book list', async () => {
//     global.fetch.mockResponseOnce(JSON.stringify(mockData));

//     const { getByText, getAllByRole } = render(<BookList />);

//     let promise = new Promise((resolve) => setTimeout(resolve, 0)); // wait for response
//     await act(() => promise);

//     // renders the title for "Books:" list
//     const listElement = getByText(/Books:/i);
//     expect(listElement).toBeInTheDocument();

//     // renders one of the book titles
//     const bookTitle = getByText(/Dune/i);
//     expect(bookTitle).toBeInTheDocument();

//     // renders the correct number of items
//     const items = getAllByRole('listitem');
//     expect(items.length).toEqual(2);
//   });
// });