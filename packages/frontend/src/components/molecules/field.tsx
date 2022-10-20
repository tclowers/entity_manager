import React from 'react';
import styled from 'styled-components';
import { FieldName } from '../atoms/field-name';
// import { Author } from '../atoms/author';

const Container = styled.div`
  width: 100%;
  padding: 0.5em 0;
  margin: 0.8em 0;
  border: solid 1px #ffffff;
`;

export interface Props {
  name: string;
}

export function Field({ name }: Props) {
  return (
    <Container>
      <FieldName name={name} />
    </Container>
  );
}
