import React from 'react';
import styled from 'styled-components';
import { ApiAction } from '../../api/common';
import { Spinner } from '../atoms/spinner';
import { SimpleList } from '../molecules/simple-list';
import { useResources } from '../../api/resources';


const Container = styled.div`
  width: 60%;
`;

const Title = styled.h2`
    color: black;
    margin-bottom: 0.5em;
`;

export interface Props {
  entityId: string;
  resourceId: string;
}

export function ReadResource({ entityId, resourceId }: Props) {
    const [{ data, loading, error }, refetch] = useResources(ApiAction.Read, entityId, resourceId);
  
    if (loading) return <Spinner />;
    if (error) return <Container>Error! {error.message}</Container>;

    const {resource} = data;
  
    // const items = Object.entries(resource).forEach(([key, value]) => {
    //   const url = '/resource/' + item.id + '/create';
    //   return {
    //       ...item,
    //       url
    //   }
    // })


    const itemName = resource.name !== '' ? resource.name : resource.id;
  
    return (
      <Container>
        <Title>{itemName}</Title>
        <SimpleList elements={resource} />
      </Container>
    );
  }