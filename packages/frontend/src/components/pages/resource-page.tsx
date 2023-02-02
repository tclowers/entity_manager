import React from 'react';
import { useParams } from 'react-router-dom';
import { CreateResource } from '../organisms/create-resource';
import { EntityList } from '../organisms/entity-list';
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
    const { action } = useParams();    

    return (
        <ResourceProvider>
            <Container>
                {(typeof action === "undefined" || action === 'create') && <CreateResource />}
                {action === 'list' && <EntityList />}
            </Container>
        </ResourceProvider>
    );
}
