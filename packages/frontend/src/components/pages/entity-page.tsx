import React from 'react';
import { Entity } from '../organisms/entity';
import styled from 'styled-components';
import EntityProvider from '../../contexts/entity-context';


const Container = styled.div`
  text-align: left;
  background-color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

export function EntityPage() {
  return (
    <EntityProvider>
      <Container>
        <Entity />
      </Container>
    </EntityProvider>
  );
}
