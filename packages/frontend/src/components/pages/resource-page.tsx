import React from 'react';
import { CreateResource } from '../organisms/create-resource';
import styled from 'styled-components';
import ResourceProvider from '../../contexts/resource-context';


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

export function ResourcePage() {
  return (
    <ResourceProvider>
      <Container>
        <CreateResource />
      </Container>
    </ResourceProvider>
  );
}
