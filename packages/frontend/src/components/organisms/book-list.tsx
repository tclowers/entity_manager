import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { query } from '../../graphql/books';
import { Book, Props as BookProps } from '../molecules/book';
import { Spinner } from '../atoms/spinner';

const Container = styled.div`
  width: 60%;
`;

const Title = styled.h2`
  margin-bottom: 0.5em;
`;

const List = styled.ul`
  list-style: none;
`;

export function BookList() {
  const { loading, error, data } = useQuery(query);

  if (loading) return <Spinner />;
  if (error) return <Container>Error! {error.message}</Container>;

  const listItems: React.FC[] = data.books.map(
    ({ author, title }: BookProps, i: number) => {
      return (
        <li key={i}>
          <Book author={author} title={title} key={i} />
        </li>
      );
    }
  );

  return (
    <Container>
      <Title>Books:</Title>
      <List>{listItems}</List>
    </Container>
  );
}
