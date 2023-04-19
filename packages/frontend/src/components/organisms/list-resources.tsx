import React from 'react';
import styled from 'styled-components';
import { useResources } from '../../api/resources';
import { ApiAction } from '../../api/common';
import { Spinner } from '../atoms/spinner';
import { ItemList } from '../molecules/item-list';
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
  width: 60%;
`;

const Title = styled.h2`
    color: black;
    margin-bottom: 0.5em;
`;

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: "blue";
  color: "white";

  font-size: 1em;
  margin: 1em;white
  padding: 0.25em 1em;
  border-radius: 3px;
`;

export interface Props {
    entityId: string;
}

export function ListResources({ entityId }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/resource/' + entityId + '/create');
  };

  const [{ data, loading, error }, refetch] = useResources(ApiAction.List, entityId);

  if (loading) return <Spinner />;
  if (error) return <Container>Error! {error.message}</Container>;

  const items = data.resources.map((item: any) => {
    const url = '/resource/' + entityId + '/read/' + item.id;
    return {
        ...item,
        url
    }
  })

  return (
    <Container>
      <Title>{data.entity_name} Resources:</Title>
      <ItemList items={items} />
      <Button onClick={handleClick}>Add {data.entity_name}</Button>
    </Container>
  );
}