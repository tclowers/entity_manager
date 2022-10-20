import React from 'react';
import styled from 'styled-components';
import { useBooks } from '../../api/books';
import { ApiAction } from '../../api/common';
import { Field, Props as FieldProps } from '../molecules/field';
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

export function FieldList() {
//   const { loading, error, data = [] } = useBooks(ApiAction.List);
  const data = [ {"name": "item"}, {"name": "value"}, {"name": "weight"}]

//   if (loading) return <Spinner />;
//   if (error) return <Container>Error! {error.message}</Container>;

  return (
    <Container>
      <Title>Fields:</Title>
      <List>
        {data.map(({ name }: FieldProps, i: number) => {
          return (
            <li key={i}>
              <Field name={name} key={i} />
            </li>
          );
        })}
      </List>
    </Container>
  );
}
