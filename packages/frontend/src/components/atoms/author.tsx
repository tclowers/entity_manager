import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  font-size: 0.9em;
`;

interface Props {
  value: string;
}

export function Author({ value }: Props) {
  return <Container>by {value}</Container>;
}
