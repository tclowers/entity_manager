import React from 'react';
import styled from 'styled-components';
import { useEntities } from '../../api/entities';
import { ApiAction } from '../../api/common';
import { Spinner } from '../atoms/spinner';
import { ItemList } from '../molecules/item-list';


const Container = styled.div`
  width: 60%;
`;

const Title = styled.h2`
    color: black;
    margin-bottom: 0.5em;
`;

export function EntityList() {
  const [{ data, loading, error }, refetch] = useEntities(ApiAction.List);

  if (loading) return <Spinner />;
  if (error) return <Container>Error! {error.message}</Container>;

  const items = data.map((item: any) => {
    const url = '/entity/' + item.id;
    return {
        ...item,
        url
    }
  })

  return (
    <Container>
      <Title>Entities:</Title>
      <ItemList items={items} />
    </Container>
  );
}