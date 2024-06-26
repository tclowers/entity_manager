import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 1.1em;
`;

interface Props {
  value: string;
}

export function Title({ value }: Props) {
  return <Container>{value}</Container>;
}
