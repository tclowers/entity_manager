import React from 'react';
import styled from 'styled-components';
import EntityProvider from '../../contexts/entity-context';
import { EntityList } from '../organisms/entity-list';
import { useParams } from 'react-router-dom';


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
  const { action, entityId } = useParams();

  return (
    <EntityProvider>
      <Container>
        {typeof action === "undefined" && <EntityList />}
      </Container>
    </EntityProvider>
  );
}
